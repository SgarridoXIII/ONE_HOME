Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-2898 Creación de un vehículo', () => {

    before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    after(()=>{
        cy.visit('http://one-pre.kube.vged.es/home')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) //Fin logout
    })

    it('Step 1', () => { //Login

        cy.visit("/")
       cy.get("#username").type("sergio.garrido@siigroup-spain.com")
    cy.get("#password").type("Godella21!con")
    cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
    // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
    
    // cy.task("generateOTP").then(token => {
    //     cy.get('#otp').type(token);
    //   });

    // cy.get('.btn').click({force:true})

    })

    it('Step 2', () => { //boton crear vehiculo        

        cy.get('svg.mat-menu-trigger:nth-child(3)').click()
        cy.wait(1000)
        cy.contains(" Crear vehículo ").click()

    })

    it('Step 3', () => { //creación del vehiculo

        const matricula = generarMatricula()

    //matricula y km
    cy.get(':nth-child(1) > :nth-child(3) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type(matricula)
    cy.get(':nth-child(10) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type('1500')
    // end matricula y km

    //modelo
    cy.get('#mat-select-0 > .mat-select-trigger > .mat-select-arrow-wrapper').click()
    cy.wait(10000)
    cy.xpath("//span[@class='mat-option-text'][contains(.,'Volkswagen')]").should("be.visible").click({ force: true })
    cy.wait(2000)
    cy.get('#mat-input-10').should('be.visible').click()
    cy.wait(2000)
    cy.contains('Golf Advance').should('be.visible').click({ force: true })
    cy.wait(10000)
    cy.get('#mat-input-11').should('be.visible').click().wait(5000).type('1.9TDi')
    // end modelo

    //agregar cliente asociado
    cy.get('body').click()
    cy.get('#mat-input-16').click().clear().type('Sergio{enter}')
    cy.get('body').click()
    cy.wait(10000)
    cy.get('#mat-input-16').click()
    cy.contains('Sergio').click()
    cy.wait(10000)
    cy.get('#mat-select-1 > .mat-select-trigger > .mat-select-arrow-wrapper').click({ force: true })
    cy.xpath("//span[@class='mat-option-text'][contains(.,'Cliente reparador')]").click({ force: true })
    cy.xpath("//span[@class='mat-option-text'][contains(.,'Propietario')]").click({ force: true })
    cy.xpath("//span[@class='mat-option-text'][contains(.,'Conductor habitual')]").click({ force: true })
    cy.get('body > div.cdk-overlay-container > div.cdk-overlay-backdrop.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing').click({ force: true })
    cy.get('body > app-root > main > one-layout-application > div > div > one-create-vehicles > form > div.row.mt-4.ng-valid.ng-dirty.ng-touched > div.col-md-2.d-flex.align-items-center.mb-1 > div > svg:nth-child(1)').click()
    // end agregar cliente asociado

    cy.get('.btn__primary').should('be.enabled').click({ force: true })

    cy.visit("/")
    cy.contains(' Más ').should('be.visible').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
    cy.get('.mat-form-field-infix').type(matricula).wait(1000)
    cy.get('.card-vehicle__content').should('be.visible')



    })



function generarMatricula() {
    const letrasPermitidas = 'BCDFGHJKLMNPRSTVWXYZ'; 
    const numeros = Array.from({length: 4}, () => Math.floor(Math.random() * 10)); 
    const letras = Array.from({length: 3}, () => letrasPermitidas.charAt(Math.floor(Math.random() * letrasPermitidas.length))); 
    return numeros.join('') + letras.join('');
  }



})