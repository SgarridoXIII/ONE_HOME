Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

describe('QA-883 - Crear vehículo_desplegables_Relación Cliente-Vehículo', () => {
  
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

  //Pulsamos en el campo desplegables "Relación Cliente-Vehículo"
  it('step 5', () => {
    cy.get('#mat-select-1 > .mat-select-trigger > .mat-select-value > .mat-select-placeholder').click()
    cy.wait(1000)
    cy.get('#mat-option-107').should('be.visible')
    cy.get('#mat-option-107').should('contain.text','Cliente reparador')
    cy.get('#mat-option-108').should('be.visible')
    cy.get('#mat-option-108').should('contain.text','Propietario')
    cy.get('#mat-option-109').should('be.visible')
    cy.get('#mat-option-109').should('contain.text','Conductor habitual')
  });   
  
  it("logout", () => {
    masterLogin.logout()
  });
})