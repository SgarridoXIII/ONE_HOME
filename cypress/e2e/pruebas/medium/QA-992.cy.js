Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
var nombreUser = 'Francisco';
var apellido1User = 'Rincon';
var apellido2User = 'Garzon';
var vaesanetUser = 'volswag';
var dmsUser = 'fgarzon94';
var emailUser = 'fgarzon94@gmail.com';


describe('QA-992 - Crear usuario_pestaña Datos usuarios_obligatoriedad campos_Nombre', () => {
  
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
    cy.get('svg.mat-menu-trigger.top-navigation-bar__actions__icon').click()
    cy.wait(1000)
    cy.get('.mat-menu-content').should('be.ok')
    cy.wait(1000)
  });

  //Pulsamos en la opción "Crear usuario".
  it('step 4', () => {
    cy.get('.mat-menu-content > :nth-child(3)').click()
    cy.get('h5').should('include.text','Crear usuario')
    cy.get('.container-fluid').should('be.ok')
  });

  //Completamos los campos del formulario menos el campo "Nombre", y pulsamos en el botón "Crear usuario".
  it('step 5', () => {
    cy.get('#mat-input-1').type(apellido1User)
    cy.get('#mat-input-2').type(apellido2User)
    cy.get('#mat-input-3').type(vaesanetUser)
    cy.get('#mat-input-4').type(dmsUser)
    cy.get('#mat-input-5').type(emailUser)
    cy.get('.mat-select-placeholder').click()
    cy.get('#mat-option-20 > .mat-option-text').click()
    cy.wait(1000)
    cy.get('#mat-input-6').click()
    cy.get('#mat-option-0').click()
    cy.wait(1000)
    cy.get('.btn__primary').should("not.be.enabled")
  });

  it("logout", () => {
    masterLogin.logout()
  });
})