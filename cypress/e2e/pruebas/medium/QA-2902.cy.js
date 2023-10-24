Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('QA-2902 - ONE - Visualización de citas en el Tablero', () => {
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

  // Introducimos usuario o email y contraseña y pulsamos Acceder    
    cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
    cy.wait(1000)
  })

  // Pulsamos en el botón "Tablero" 
  it('step 2', () => {
    // Desde la pantalla  principal "Home", pulsamos en el botón "Más" en la barra superior de la página y pulsamos "Clientes"
    cy.get('.top-navigation-bar__options__navs > :nth-child(4)').click()
    cy.wait(1000)
  });

  // Desde la pantalla Tablero, en la columna "Nueva cita" visualizamos las citas que hemos creado recientemente.
  it('step 3', () => {
    cy.get('.mat-icon.notranslate.material-icons.mat-icon-no-color').eq(0).click()
    cy.wait(1000)
    cy.get('.mat-icon.notranslate.material-icons.mat-icon-no-color').eq(0).click()
    cy.wait(1000)
    cy.get('.mat-icon.notranslate.material-icons.mat-icon-no-color').eq(0).click()
    cy.wait(1000)
    cy.get('.board__column__content').eq(0).should('be.ok')
    cy.wait(1000)
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
