Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'


describe('Test QA-922	Crear cita_Pestaña Vehículo_Crear nuevo', () => {


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
        cy.xpath("//button[@class='btn__secondary ng-star-inserted'][contains(.,'0311X - M. CONDE')]").click().wait(1000)

        cy.wait(3000)
      
    })
    
    it("Step 5", () => {
        cy.get('#mat-input-3')
        cy.wait(1000)
    })
    it("Step 6", () => {
        cy.contains(" Crear nuevo vehículo ").click()
        cy.wait(1000)
    })
    it("Step 7", () => {
        const matricula = generarMatricula()
        cy.get('form.ng-pristine > :nth-child(1) > :nth-child(3) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type(matricula)
        cy.wait(8000)
        cy.get(':nth-child(10) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('100')
        cy.get('#mat-select-0 > .mat-select-trigger > .mat-select-arrow-wrapper').click().wait(1000)
        cy.contains('Audi').click().wait(5000)
        cy.get(':nth-child(2) > :nth-child(3) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(1000)
        cy.get('#mat-option-148 > .mat-option-text').click().wait(4000)
        cy.get(':nth-child(2) > :nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type("Pruebas")
        

        cy.get(':nth-child(2) > one-customer-autocomplete > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().type('Edu{enter}').wait(12000)
        cy.contains('E01').click().wait(3000)

        cy.get('#mat-select-1 > .mat-select-trigger > .mat-select-arrow-wrapper').click({ force: true }).wait(6000)
        cy.get('#mat-select-1-panel .mat-option').eq(0).click();
        cy.get('#mat-select-1-panel .mat-option').eq(1).click();
        cy.get('#mat-select-1-panel .mat-option').eq(2).click();
       

        cy.get('body > div.cdk-overlay-container > div.cdk-overlay-backdrop.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing').click({ force: true })
        cy.get('div.mat-form-field-wrapper svg.mat-tooltip-trigger:first').click();

        cy.wait(1000)
    
        cy.get('.col-12 > .btn__primary').should('be.enabled').click({ force: true })
    
        cy.wait(1000)
    })
 
    it("Logout", () => {
       
        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) 
      })//Fin logout
})


function generarMatricula() {
    const letrasPermitidas = 'BCDFGHJKLMNPRSTVWXYZ'; 
    const numeros = Array.from({length: 4}, () => Math.floor(Math.random() * 10)); 
    const letras = Array.from({length: 3}, () => letrasPermitidas.charAt(Math.floor(Math.random() * letrasPermitidas.length))); 
    return numeros.join('') + letras.join('');
  }