Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('QA-1336	Recepciones_Detalle del pedido_Intervenciones_Diferir intervención_Diferir', () => {


    before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {

        cy.visit("/",)
        cy.wait(1000)

    })

    it("Step 2", () => {
        cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
        cy.wait(2000) //Fin login
    })

    it("Step 3", () => {
        cy.get(':nth-child(2) > .shortcut').click()


    })
    it("Step 4", () => {
        cy.get('mat-icon').should('have.text', 'close').click()
        cy.wait(1000)
        cy.get('.mat-form-field-flex').eq(0).click()
        cy.wait(1000)
        // cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
        // cy.wait(5000)
        // cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(5000)
        cy.get(".card-vehicle__content").first().click()
        cy.contains(" Sergio Garrido Benitez ").first().click().wait(8000);


    })

    it("Step 5", () => {
        cy.wait(2000)
        cy.get('.sidebar__option').children('.sidebar__option__text').contains('Intervenciones').click().wait(5000)

        // crear diferido
        cy.contains('Añadir intervención').click()

        cy.get(':nth-child(6) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('testDif').wait(2000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)

        cy.get('.col-12 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').click()
        cy.contains('mat-option', 'Cliente propietario').click().wait(1000)
        cy.xpath("//button[contains(.,'Aceptar')]").click()
        cy.get('.col-12 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').click()
        cy.contains('mat-option', 'Diagnosis').click().wait(1000)
        cy.xpath("//button[contains(.,'Aceptar')]").click().wait(1000)
        cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('1')
        cy.xpath("//button[contains(.,'Guardar')]").click()
    })
    it("Step 6", () => {
        cy.get('svg[matTooltip="Diferir"]:first').click();
    })
    it("Step 7", () => {
        cy.get('.col > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(1000)
    })
    it("Step 8", () => {
        cy.get('.mat-calendar-body-active').click()
    })
    it("Step 9", () => {
        cy.get('.mat-calendar-body-active').click()
    })
    it("Step 10", () => {
        cy.get('.col-12 > .btn__primary').click().wait(2000)
    })
    it("Step 11", () => {
        cy.get('.sidebar__option').children('.sidebar__option__text').contains('Diferidos').click().wait(5000)
    })

    it("Logout", () => {
        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000)
    })//Fin logout

})