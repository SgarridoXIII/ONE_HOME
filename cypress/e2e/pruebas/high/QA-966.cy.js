Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-966	Crear cita_Pestaña Intervenciones_Eliminar intervenciones', () => {

    after(() => {
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
        cy.get('body > app-root > main > one-layout-application > div > div > gopa-home > div > div:nth-child(1) > div').click()
        cy.wait(1000)
    })
    it("Step 4", () => {
        cy.get('.btn__secondary.ng-star-inserted').contains('0311X - M. CONDE').click()
        cy.wait(1000)
        cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(5000).type('1111MMM{enter}')
        cy.wait(5000)
        cy.contains(' Audi A3 ').click({ force: true })
        cy.get('.customer-card').first().click()
        cy.get('.col-12 > .btn__primary').click()
        cy.wait(1000)
        cy.get('.navigation__navs__next.ng-star-inserted').click()
        cy.wait(1000)
        cy.get('svg.navigation__navs__next').click();

        cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
        cy.get(':nth-child(5) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('test').wait(2000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000).wait(1000)
        cy.wait(1000)
        cy.get('.mat-select-arrow').first().click().wait(2000)
        // cy.get('#mat-option-28 > .mat-option-text').click().wait(1000)
        cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
        cy.get('.col-12 > .btn__primary').click()
        cy.get('.mat-select-arrow').click()
        cy.contains('Diagnosis').click()
        cy.get('button.btn__primary.w-100').click();
        cy.wait(1000)

        cy.get('#mat-input-9').type('1')
        cy.get('one-add-parts-fast.ng-star-inserted > one-dialog-structure > .mt-2 > :nth-child(1)').click()
        cy.wait(1000)
        cy.get('.mt-2 > :nth-child(2) > .col-12 > .btn__primary').click()
        cy.wait(1000)



    })

    it("Step 5", () => {
        cy.get('svg.navigation__navs__next').click();
        cy.wait(1000)
    })
    it("Step 6", () => {
        cy.get('.package__actions__icon').eq(1).click();
        cy.get('.col-12 > .btn__primary').click()
        cy.wait(2000)
    })
    it("Step 7", () => {
        cy.get('svg.navigation__navs__next').click();
        cy.get('svg.navigation__navs__back').click();
        cy.wait(2000)
    })

    // it("Logout", () => {
    //     cy.wait(3000)
    //     cy.visit('/')
    //     cy.get('.top-navigation-bar__actions > .userIcon').click()
    //     cy.get('.mat-menu-content > :nth-child(2)').click()
    //     cy.wait(1000) 
    //   })//Fin logout
})