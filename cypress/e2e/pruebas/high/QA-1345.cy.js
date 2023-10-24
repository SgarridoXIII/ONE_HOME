Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe("Test QA-1345 Recepciones_Detalle del pedido_Diferidos_Añadir", () => {

    after(()=>{
    cy.visit('http://one-pre.kube.vged.es/home')
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000) //Fin logout

    })

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
        cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
        cy.wait(5000)
        cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(5000)
        cy.get(".card-vehicle__content").first().click()
        cy.contains(" Sergio Garrido Benitez ").first().click().wait(5000)


    })


    it('Step 5', () => {

        cy.contains("Diferidos").click()
    })

    it('Step 6', () => {

        cy.get('.btn__secondary').click()
        cy.get(':nth-child(4) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type('test').wait(2000)
        // cy.get('#mat-input-7').type('test').wait(8000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000).wait(1000)

        //

        cy.get('.mat-select-arrow').click().wait(2000)
        // cy.get('#mat-option-28 > .mat-option-text').click().wait(1000)
        cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
        cy.xpath("//button[contains(.,'Aceptar')]").click()


        cy.get('.mat-select-arrow-wrapper').click().wait(3000)
        cy.contains(' Inspección y Mantenimiento ').click()
        cy.xpath("//button[contains(.,'Aceptar')]").click()
        cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
        cy.xpath("//button[contains(.,'Guardar')]").click()
        cy.get('.mat-button-wrapper').click()
        cy.xpath("//div[@class='mat-calendar-body-cell-content mat-focus-indicator mat-calendar-body-today']").click()
        cy.xpath("//div[@class='mat-calendar-body-cell-content mat-focus-indicator mat-calendar-body-today']").click()
        cy.get('.btn__primary').contains(' Diferir ').click()
        
    })

    it('Step 7',()=>{

        cy.get(':nth-child(2) > one-card-package > .package > .package__actions > .mat-icon').click({force:true})

        
    })

})
