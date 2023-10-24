Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-957 Crear cita_Pestaña Intervenciones_Añadir nuevas intervenciones_Añadir intervenciones de paquetes de PPSO', () => {

    before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })


    it('Step 1 ', () => {

        cy.visit("/")

    })

    it('Step 2', () => { // Login

       cy.get("#username").type("sergio.garrido@siigroup-spain.com")
    cy.get("#password").type("Godella21!con")
    cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
    // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
    
    // cy.task("generateOTP").then(token => {
    //     cy.get('#otp').type(token);
    //   });

    // cy.get('.btn').click({force:true})


    })

    it('Step 3', () => {

        cy.get('svg.mat-menu-trigger:nth-child(3)').click()


    })

    it('Step 4', () => {

        cy.get('.mat-menu-content > :nth-child(1)').click()
        cy.xpath('//button[@class="btn__secondary ng-star-inserted"][contains(.,"0311X - M. CONDE")]').scrollIntoView().click()
        cy.wait(1000)
        cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().type('9723LMJ{enter}')
        cy.wait(5000)
        cy.contains(' Volkswagen Touran Advance PRO ').click({ force: true })
        cy.get('.customer-card').first().click()
        cy.xpath("//button[contains(.,'Aceptar')]").click()
        cy.wait(2500)
        cy.get('svg.navigation__navs__next').click()
        cy.wait(2500)
        cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
        cy.wait(5000)

        cy.get('input[formcontrolname="createPackage"]').type('test').wait(2000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
  
        cy.get('.mat-select-arrow').click().wait(2000)
        cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
        cy.xpath("//button[contains(.,'Aceptar')]").click()
  
        cy.get('.mat-select-arrow-wrapper').click().wait(3000)
        cy.contains(' Inspección y Mantenimiento ').click()
        cy.xpath("//button[contains(.,'Aceptar')]").click()
        cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
        cy.xpath("//button[contains(.,'Guardar')]").click()
        cy.get(".navigation").click(1075, 75)
        cy.wait(1000)
        cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
        cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
        cy.get('.cdk-column-discount > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('50')
        cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
        // cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
        // cy.get(".navigation").click(1075, 75).wait(2000)
        // cy.get(':nth-child(1) > .col')//.click(630, 15)
        cy.wait(1500)

    })

    it('Step 5',()=>{

        cy.contains('svg.navigation__navs__next').click()
        cy.wait(500)

    })

    it('Step 6',()=>{

        cy.get(':nth-child(2) > .align-items-center > .btn__primary').click()
        cy.wait(2500)
       
    })

    it('Step 7',()=>{

        cy.get('#mat-input-8').type(`motor`).wait(3000)
      
    })

    it('Step 8 ',()=>{

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Transmisión: Ruidos procedentes de la parte delantera del vehículo/vano motor/cambio')]").click()
        cy.get('.mat-select-arrow').click().wait(2000)
           
    })

    it('Step 9',()=>{

        cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
        cy.xpath("//button[contains(.,'Aceptar')]").click()
        cy.get('.mat-select-arrow-wrapper').click().wait(3000)
        cy.contains('Diagnosis').click()

    })

    it('Step 10',()=>{

        cy.xpath("//button[contains(.,'Aceptar')]").click()
        cy.wait(3000)
    })

    
    it("Logout", () => {

        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) 
    
      })//Fin logout

})