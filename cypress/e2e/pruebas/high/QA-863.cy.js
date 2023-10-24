Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'


describe('Test QA-863 Crear vehículo_campos', () => {


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
        cy.wait(1000)
    })

    it("Step 3", () => {
        cy.get('svg.mat-menu-trigger.top-navigation-bar__actions__icon').click();


    })
    it("Step 4", () => {
        cy.contains(' Crear vehículo ').click().wait(1000)
        cy.wait(1000)
        cy.get(':nth-child(1) > :nth-child(3) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').should('be.visible')
        cy.get('#mat-select-0 > .mat-select-trigger > .mat-select-arrow-wrapper').should('be.visible')
        cy.get('#mat-input-10').should('be.visible')
        cy.wait(1500)
        cy.get('#mat-input-11').should('be.visible')
        cy.get('#mat-input-16').should('be.visible')
        cy.wait(1000)
        cy.get('#mat-select-1 > .mat-select-trigger > .mat-select-arrow-wrapper').should('be.visible')
        cy.get('.btn__primary').should('be.disabled')
        cy.wait(3000)
    })



    it("Logout", () => {
        cy.wait(3000)
        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000)
    })//Fin logout
})