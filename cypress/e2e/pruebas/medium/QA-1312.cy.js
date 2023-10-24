Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'

describe('QA-1312 - Recepciones_Detalle del pedido_Vehículo', () => {
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
    cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
    cy.wait(1000)
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

  //Nos situamos en la pestaña Vehículo
  it('step 5', () => {
    cy.get('.sidebar > :nth-child(4)').click()
    cy.wait(1000)
    cy.get('one-detail-vehicles').should('be.ok')
    cy.get('h5').should('include.text','Vehículo')
    cy.get('#mat-input-15').should('be.visible')
    cy.get('#mat-input-16').should('be.visible')
  });

  //Comprobamos que son los datos que hemos introducido en la cita
  it('step6', () => {
    
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  });
})