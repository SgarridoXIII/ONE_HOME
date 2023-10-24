

Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'


describe(' Test QA-972	Crear cita_Pestaña Intervenciones_Detalle intervenciones_Editar', () => {

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
        cy.get('svg.mat-menu-trigger.top-navigation-bar__actions__icon').click();


        cy.get('.mat-menu-content > :nth-child(1)').click().wait(1000)
    })
    it("Step 4", () => {
        cy.xpath('//button[@class="btn__secondary ng-star-inserted"][contains(.,"0311X - M. CONDE")]').scrollIntoView().click()
        cy.wait(1000)
        cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(5000).type('1111MMM{enter}')
        // cy.get('#mat-input-3').type('1111MMM{enter}')
        cy.wait(5000)
        cy.contains(' Audi A3 ').click({ force: true })
        cy.get('.customer-card').first().click()
        cy.get('.col-12 > .btn__primary').click()
        cy.wait(2500)
        cy.get(".navigation").click(1075, 75)
        cy.wait(2500)
    
        cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
        cy.get(':nth-child(5) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('test').wait(8000)
        // cy.get('#mat-input-7').type('test').wait(8000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
    
        //
    
        cy.get('.mat-select-arrow').click().wait(2000)
        // cy.get('#mat-option-28 > .mat-option-text').click().wait(1000)
        cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
        cy.get('.col-12 > .btn__primary').click()
    
    
        cy.get('.mat-select-arrow-wrapper').click().wait(3000)
        cy.contains(' Inspección y Mantenimiento ').click()
        cy.get('.col-12 > .btn__primary').click()
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
        cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
        cy.wait(2000)
    })
    it("Step 7", () => {
        cy.get('#mat-expansion-panel-header-1 > .mat-expansion-indicator').click()
        cy.get('one-card-package-expansion-v2-content-parts > .mat-table > tfoot > .mat-footer-row > .cdk-column-actions > .mat-tooltip-trigger').click().wait(1000)
    })
 
    it("Step 8", () => {
        cy.get('#mat-input-38').click().type('test{enter}').wait(10000)
        cy.get('#mat-input-39').click().type('test description')
        cy.get('#mat-input-41').click().type('1')
        cy.get('#mat-input-40').click().type('5')
        cy.get('#mat-input-36').click().type('21')
        cy.wait(1000)
        cy.get('one-card-package-expansion-v2-content-parts > .mat-table > tbody > .mat-row > .cdk-column-actions > .d-flex > .mat-icon').click()
        cy.get('.mat-menu-content > :nth-child(1)').click()
    })
    it("Step 9", () => {
        cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click().wait(1000)
        cy.wait(2000)
    })
    it("Step 10", () => {
        cy.get('#mat-input-29').click().clear().type('2')
        cy.get('#mat-input-26').click().clear().type('100')
        cy.get('one-card-package-expansion-v2-content-labours > .mat-table > thead > .mat-header-row > .cdk-column-name').click()
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