Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

describe('QA-936 - Crear cita_Pestaña Motivo de la visita_Siguiente', () => {
  
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

  //Desde la pantalla principal "Home" pulsamos en el botón "Más" del menú superior
  it('step 3', () => {
    cy.get('svg[class="mat-menu-trigger top-navigation-bar__actions__icon"]').click().wait(1000)
    cy.get('.mat-menu-content').should('be.ok').wait(1000)
  });

  //Pulsamos en la opción "Crear Cita".
  it('step 4', () => {
    cy.contains('button','Crear cita').click().wait(3000)
    cy.get('h5').should('include.text','Crear cita')
    cy.get('.container-fluid').should('be.ok').wait(1000)
  });

  //Accedemos a la pestaña Motivo de la visita
  it('step 5', () => {
    cy.contains('button','0311X - M. CONDE').click().wait(2000)   
    cy.get('input[data-placeholder="Buscar cliente..."]').click().type('Serg{enter}').wait(10000)
    cy.get('svg[class="icon ng-star-inserted"]').eq(1).click().wait(1000)
    cy.get('div[class="vehicle mb-3 ng-tns-c380-15 ng-star-inserted"]').eq(0).click().wait(1000)
    cy.contains('button','Aceptar').click().wait(1000)
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
    cy.wait(1000)
    cy.get('h3').should('include.text','Motivo de la visita')
    cy.get('.mat-horizontal-content-container ng-tns-c157-24 container').should('be.ok')  
  });   

  //Seleccionamos un motivo
  it('step 6', () => {
    cy.contains('button','Mantenimiento').click().wait(3000)
    cy.get('input[formcontrolname="searchPackage"]').type("Test").wait(1000)
    cy.get('input[formcontrolname="createPackage"]').type("Test").wait(1000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)

    cy.get('.mat-select-arrow').click().wait(2000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.xpath("//button[contains(.,'Aceptar')]").click()

    cy.get('.mat-select-arrow-wrapper').click().wait(3000)
    cy.contains(' Inspección y Mantenimiento ').click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
    cy.xpath("//button[contains(.,'Guardar')]").click()
    cy.get(".navigation").click(1075, 75).wait(1000)
    
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
    cy.get('.cdk-column-discount > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('50')
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
    cy.get('.mat-horizontal-content-container ng-tns-c157-24 container').should('be.ok')  
    cy.get('h3').should('include.text','Intervenciones')
  });

  //Regresamos a la pestaña Motivo de la visita de nuevo y pulsamos sobre la flecha Siguiente
  it('step 7', () => {
    cy.get('svg[class="navigation__navs__back ng-star-inserted"]').click().wait(1000)
    cy.get('h3').should('include.text','Motivo de la visita')
    cy.get('.mat-horizontal-content-container ng-tns-c157-24 container').should('be.ok')
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click().wait(1000)
    cy.get('.mat-horizontal-content-container ng-tns-c157-24 container').should('be.ok')  
    cy.get('h3').should('include.text','Intervenciones')
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})