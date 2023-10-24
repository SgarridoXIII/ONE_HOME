Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('QA-2994 - Editar información de un cliente Empresa', () => {
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

  // Pulsamos en el botón "Clientes"
  it('step 2', () => {
    // Desde la pantalla  principal "Home", pulsamos en el botón "Más" en la barra superior de la página y pulsamos "Clientes"
    cy.get('.top-navigation-bar__options__navs > .mat-menu-trigger').click()
    cy.wait(1000)
    cy.get('.top-navigation-bar__options__navs__more-item').eq(2).click()
    cy.wait(1000)
  });

  // Desde la pantalla "Clientes" buscamos nuestro cliente Empresa. Pulsamos en el registro.
  it('step 3', () => {
    cy.get('input[formcontrolname="search"]').type('51917668K')
    cy.wait(10000)
    cy.get('one-card-customer').eq(0).click()
    cy.wait(1000)
  });
  
  // Editamos algunos de los campos del cliente Empresa.
  it('step 4', () => {
    cy.get('input[formcontrolname="secondSurname"]').clear().type('Test Edit')
    cy.wait(1000)
    cy.get('.btn__primary').click()
    cy.wait(1000)
    cy.get('.mat-simple-snackbar').should('have.text', 'Información actualizada correctamente')
    cy.wait(1000)
  });

  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
