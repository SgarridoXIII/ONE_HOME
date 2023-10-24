Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
var datoDNI = '32345678F'
var datoNombre = 'Emiliano'
var datoApellido1 = 'Ballen'
var datoApellido2 = 'Rincon'
var datoNumero = '+943212341'
var datoEmail = 'Emilianito98@yopmail.com'

describe('QA-910 - Crear cita_Pestaña Cliente_Crear nuevo', () => {
  
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

  //Pulsamos en la opción "Crear Cita".
  it('step 4', () => {
    cy.get('.mat-menu-content > :nth-child(1)').click()
    cy.wait(3000)
    cy.get('h5').should('include.text','Crear cita')
    cy.get('.container-fluid').should('be.ok')
    cy.wait(1000)
  });

  //Accedemos a la pestaña Cliente
  it('step 5', () => {
    cy.contains('button','0311X - M. CONDE').click()
    cy.wait(2000)   
    cy.get('h3').should('include.text','Cliente')
    cy.get('button').should('include.text','Crear nuevo cliente')
    cy.get('.container-fluid').should('be.ok')
  });

  //Pulsamos el botón 'Crear nuevo'
  it('step 6', () => {
    cy.contains('button','Crear nuevo cliente').click()
    cy.wait(1000)
    cy.get('h4').should('contain.text','Crear cliente')
    cy.get('button').should('contain.text','Particular')
    cy.get('button').should('contain.text','Empresa')
});
  
  //Seleccionamos Particular
  it('step 7', () => {
    cy.contains('button','Particular').click()
    cy.wait(3000)
    cy.get('h4').should('contain.text','Crear nuevo cliente')
    cy.get('#mat-dialog-1').should('be.visible')
});
   
  //Rellenamos los campos correspondientes y pulsamos el botón 'Crear cliente'
  it('step 8', () => {
    cy.get('#mat-input-15').type(datoDNI)
    cy.get('#mat-input-16').type(datoNombre)
    cy.get('#mat-input-17').type(datoApellido1)
    cy.get('#mat-input-18').type(datoApellido2)
    cy.get('#mat-input-5').type(datoNumero)
    cy.get('#mat-input-7').type(datoEmail)   
    cy.contains('button','Crear cliente').click()
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})