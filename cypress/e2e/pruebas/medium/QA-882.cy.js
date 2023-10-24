Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

describe('QA-882 - Crear vehículo_desplegables_Marca', () => {
  
  // Accedemos a la pantalla "Home" de la aplicación ONE
  before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {
  // Accedemos a la URL de ONE - Volkswagen
    cy.visit("/")
    cy.wait(1000) 
  });
  
  // Introducimos usuario o email y contraseña y pulsamos Acceder.
  it('step 2', () => {
    masterLogin.login()
  });

  //Desde la pantalla "Home", pulsamos sobre el botón +
  it('step 3', () => {
    cy.get('svg.mat-menu-trigger.top-navigation-bar__actions__icon').click()
    cy.wait(1000)
    cy.get('.mat-menu-content').should('be.ok')
    cy.wait(1000)
  });

  //Pulsamos en la opción "Crear vehículo".
  it('step 4', () => {
    cy.get('.mat-menu-content > :nth-child(4)').click()
    cy.wait(3000)
    cy.get('h5').should('include.text','Crear vehículo')
    cy.get('.container-fluid').should('be.ok')
    cy.wait(1000)
  });

  //Pulsamos en el campo desplegables "Marca"
  it('step 5', () => {
    cy.get('#mat-select-0 > .mat-select-trigger > .mat-select-value > .mat-select-placeholder').click()
    cy.wait(1000)
    cy.get('#mat-option-62 > .mat-option-text').should('be.visible')
    cy.get('#mat-option-62 > .mat-option-text').should('contain.text','Audi')
    cy.get('#mat-option-63 > .mat-option-text').should('be.visible')
    cy.get('#mat-option-63 > .mat-option-text').should('contain.text','Volkswagen')
    cy.get('#mat-option-64 > .mat-option-text').should('be.visible')
    cy.get('#mat-option-64 > .mat-option-text').should('contain.text','Skoda')
    cy.get('#mat-option-65 > .mat-option-text').should('be.visible')
    cy.get('#mat-option-65 > .mat-option-text').should('contain.text','LCV')
    cy.get('#mat-option-66 > .mat-option-text').should('be.visible')
    cy.get('#mat-option-66 > .mat-option-text').should('contain.text','Otras marcas')
  });   

  it("logout", () => {
    masterLogin.logout()
  });
})