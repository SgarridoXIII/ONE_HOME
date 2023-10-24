Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
const randomNumber = () => {
  return Math.floor(Math.random() * 900000000) + 100000000;
}

var telefono = randomNumber();

describe('QA-1307 - Recepciones_Detalle del pedido_Cliente_Editar cliente', () => {

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

  //Editamos alguno de los campos de los datos del cliente
  it('step 6', () => {

    cy.get('input[formcontrolname="phone1"]').clear().type(telefono)
    // cy.get('div[class="mat-form-field-wrapper ng-tns-c114-122"]').clear()
    // cy.get('div[class="mat-form-field-wrapper ng-tns-c114-122"]').type(telefono)
    cy.get('.mr-2').click()
    cy.wait(20000)
    cy.get('input[formcontrolname="phone1"]').should('have.value', telefono)
  });
  

  it("logout", () => {
    masterLogin.logout()
  });
})