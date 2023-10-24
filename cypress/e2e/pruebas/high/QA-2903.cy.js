Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe("Test QA-2903 - ONE - Detalles de la cita", () => {


    before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {

        cy.visit("/",)
        cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
        cy.wait(1000)

    })

    it("Step 2", () => {
        cy.get('.top-navigation-bar__options__navs > :nth-child(4)').click().wait(1000)
    })

    it("Step 3", () => {
        cy.get('mat-icon').eq(0).should('have.text', 'close').click()
        cy.wait(1000)
        cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator > .mat-button-wrapper > .mat-datepicker-toggle-default-icon').click()
        cy.get('.mat-calendar-body-active').click()
        cy.get('.mat-calendar-body-active').click()
        cy.get('one-board-column').eq(3).find('one-board-card').eq(0).click()
        // cy.contains('1111MMM').first().click().wait(5000);
        // cy.xpath("(//p[contains(@class,'board__column__content__card__info')])[1]").click().wait(5000)
    })

    it("Step 4", () => {
        cy.get('.sidebar__option').children('.sidebar__option__text').wait(5000).contains('Intervenciones').click()
        cy.wait(1000)
        cy.contains('Añadir intervención').click()
        cy.wait(1000)
        cy.get(':nth-child(6) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('newIntervention')
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").click()
        cy.get('.mat-select-arrow-wrapper').click().wait(500)
        cy.get('#mat-option-34 > .mat-option-text').click().wait(500)
        cy.get('.btn__primary').click().wait(500)
        cy.get('.mat-select-arrow-wrapper').click()
        cy.get('.mat-option-text').contains('Diagnosis').click().wait(1000)
        cy.get('.btn__primary').click()
        cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('1').wait(1000)
        cy.get('.btn__primary').click()
        cy.wait(1000)
    })
    it("Step 5", () => {
        cy.get('.sidebar__option').children('.sidebar__option__text').wait(5000).contains('Ampliaciones').click()
        cy.contains('Ampliaciones pedido').click().wait(1000)
        cy.contains('Enviar ampliación pedido').click().wait(1000)
        cy.get('.col-12 > .btn__secondary').click().wait(1000)
        cy.wait(1000)
    })
    it("Step 6", () => {
        cy.get('.sidebar__option').children('.sidebar__option__text').wait(5000).contains('Información general').click()
        cy.get(':nth-child(3) > :nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.contains('Entregado').click().wait(1000)
        cy.get('.btn__secondary').click()
    })
    it("Logout", () => {
        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) 
      })//Fin logout
    
})