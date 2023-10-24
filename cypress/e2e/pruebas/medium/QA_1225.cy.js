Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
const asesor = 'Alberto Chicote'
const photo = 'polo.png'
const fecha = new Date()
const dia = fecha.getDate()

describe('QA-1225 - Recepciones_Detalle del pedido', () => {
  // Accedemos a la pantalla "Home" de la aplicación ONE
  it("step 1", () => {
  // Accedemos a la URL de ONE - Volkswagen
    cy.visit("/")
    cy.wait(1000) 
  });
  
  // Introducimos usuario o email y contraseña y pulsamos Acceder.
  it('step 2', () => {
    masterLogin.login()
  });
  
  // Desde la pantalla principal "Home", pulsamos en el botón "Recepciones" 
  it('step 3', () => {
    cy.contains('.shortcut','Recepciones').click()
    cy.wait(1000)
    cy.get('one-your-work').should('be.visible')
    cy.get('h3').should('include.text','Tu trabajo')
    cy.get('div[class="mat-tab-label-content"]').should('contain.text','Todos')
    cy.get('div[class="mat-tab-label-content"]').should('contain.text','Recepciones')
    cy.get('div[class="mat-tab-label-content"]').should('contain.text','Entregas')    
    cy.wait(1000)
  });

  // Pulsamos sobre la flecha > de uno de los pedidos del listado
  it('step 4', () => {
    cy.get('mat-icon').should('have.text', 'close').click()
    cy.wait(1000)
    cy.get('one-card-appointment').eq(2).click()
    cy.wait(1000)
    cy.get('div[class="sidebar__option sidebar__option--active"]').should('include.text','Información general')
    cy.get('div[class="sidebar__option"]').should('include.text','Cliente')
    cy.get('div[class="sidebar__option"]').should('include.text','Vehículo')
    cy.get('div[class="sidebar__option"]').should('include.text','Resumen Pedido')
    cy.get('div[class="sidebar__option"]').should('include.text','Intervenciones')
    cy.get('div[class="sidebar__option"]').should('include.text','Diferidos')
    cy.get('div[class="sidebar__option"]').should('include.text','Descartadas')
    cy.get('div[class="sidebar__option"]').should('include.text','Multimedia')
    cy.get('div[class="sidebar__option"]').should('include.text','Recepción')
    cy.get('div[class="sidebar__option"]').should('include.text','Entrega')
    cy.get('div[class="sidebar__option"]').should('include.text','Registro')
    cy.get('div[class="sidebar__option"]').should('include.text','Registro de comunicaciones')
    cy.get('button').should('contain.text','Iniciar recepción')
    cy.get('button[routerlinkactive="router-link-active"]').should('be.visible')
  });

  it("logout", () => {
    masterLogin.logout()
  })
})
