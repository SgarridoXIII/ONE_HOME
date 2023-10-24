Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

describe('QA-1335 - Recepciones_Detalle del pedido_Intervenciones_Diferir intervención_Cancelar', () => {
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

  //Nos situamos en la pestaña Intervenciones
  it('step 5', () => {
    cy.contains('div[class="sidebar__option"]','Intervenciones').click()
    cy.get('button').should('contain.text','Ordenar')
    cy.get('button').should('contain.text','Añadir intervención')
    cy.get('button').should('contain.text','Editar descuentos')
    cy.get('button').should('contain.text','Enviar a planificar')
    cy.get('h5').should('contain.text','Intervenciones añadidas')
    cy.get('button[routerlinkactive="router-link-active"]').should('be.enabled')
  });

  //Pulsamos sobre el botón Diferir una intervención (se deja para otra fecha determinada)
  it('step 6', () => {
    cy.get('svg[matTooltip="Diferir"]').should('be.visible')
    cy.get('svg[matTooltip="Diferir"]').eq(0).click()
    cy.get('one-dialog-structure > :nth-child(1) > .col').should('be.visible')
    cy.wait(1000)
    cy.get('h4').should('contain.text','Diferir intervención')
    cy.get('button[class="btn__secondary mr-4"]').should('be.visible')
    cy.get('button[class="btn__primary"]').should('be.visible')
  });

  //Seleccionamos una fecha para diferir la intervención
  it('step 7', () => {
    cy.get('.col > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.wait(1000)
  });

  //Seleccionamos año y mes
  it('step 8', () =>{
    cy.get('div[class="mat-calendar-body-cell-content mat-focus-indicator"]').eq(8).click()
    cy.wait(1000)
  });

  //Seleccionamos día
  it('step 9', () => {
    cy.get('div[class="mat-calendar-body-cell-content mat-focus-indicator"]').eq(21).click()
  });
  
  //Pulsamos Cancelar en la ventana
  it('step 10', () => {
    cy.get('button[class="btn__secondary mr-4"]').click()
  });
  
  it("logout", () => {
    masterLogin.logout()
  })
})