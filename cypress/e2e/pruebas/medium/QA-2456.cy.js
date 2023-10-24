Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
const path = require("path");
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const photo = 'polo.png'
const fecha = new Date()
const dia = fecha.getDate()

function generateRandomNumber() {
  const characters = '0123456789';
  return Array.from({length: 7}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

describe('QA-2456 - Vehículos_Buscar_Limpiar', () => {
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
  })
  
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
  
  // Desde la pantalla  principal "Home", pulsamos en el botón "Más" en la barra superior de la página y pulsamos "Vehículos"
  it('step 3', () => {
    cy.get('.top-navigation-bar__options__navs > .mat-menu-trigger').click()
    cy.wait(1000)
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  });
  
  // Hacemos una búsqueda en el campo "Buscar"
  it('step 4', () => {
    cy.get('input[formcontrolname="search"]').type('au')
    cy.wait(1000)
  });
  
  // Hacemos click en el botón "x"
  it('step 5', () => {
    cy.get('button').eq(1).click()
    cy.wait(1000)
    cy.get('input[formcontrolname="search"]').should('have.value', '')
    cy.wait(1000)
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
