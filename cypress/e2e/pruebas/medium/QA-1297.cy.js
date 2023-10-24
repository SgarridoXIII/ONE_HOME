Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
var nombreAleatorio = "Pelaez";

describe('QA-1297 - Recepciones_Detalle del pedido_Cliente', () => {

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

  //Desde la pantalla "Home", pulsamos sobre el botón Recepciones
  it('step 3', () => {
    cy.contains('.shortcut','Recepciones').click()
    cy.wait(1000)
    cy.get('one-your-work').should('be.ok')
    cy.wait(500)
    cy.get('h3').should('include.text','Tu trabajo')
    cy.wait(1000)
  });
  
  //Pulsamos sobre la flecha > de uno de los pedidos del listado
  it('step 4', () => {
    cy.get('mat-icon').should('have.text', 'close').click()
    cy.wait(1000)
    cy.get('one-card-appointment').eq(2).click()
    cy.wait(1000)
    cy.get('one-info-service').should('be.ok')
    cy.wait(1000)
  });

  //Nos situamos en la pestaña Cliente
  it('step 5', () => {
    cy.get('.sidebar > :nth-child(3)').click()
    cy.wait(1000)
    cy.get('one-customer-service').should('be.ok')
    cy.get('h5').should('include.text','Cliente')
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})