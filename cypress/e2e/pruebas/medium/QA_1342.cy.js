Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

describe('QA-1342 - Recepciones_Detalle del pedido_Diferidos_Añadir diferidos_Buscador_Seleccionar intervención_Seleccionar fecha', () => {
  
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

  //Pulsamos el botón Añadir diferidos
  it('step 6', () => {
    cy.contains('button','Añadir intervención').click()
    cy.get('#mat-dialog-0').should('be.visible')
    cy.get('h4').should('contain.text','Añadir intervenciones')
  });

  //Realizamos una búsqueda en el buscador
  it('step 7', () => {
    cy.wait(5000)
    //cy.get('label[class="mat-checkbox-layout"]').eq(0).click()
    //cy.contains('button','Añadir selección').click()
    cy.get('input[formcontrolname="searchPackage"]').click().type('Escobillas{enter}')
    cy.wait(5000)
    cy.get('form.ng-valid').click()
    cy.get('input[formcontrolname="searchPackage"]').click()
    cy.get('span[class="mat-option-text"]').should('be.visible')
    cy.wait(1000)
  });
  
  //Seleccionamos una intervención
  it('step 8', () => {
    cy.get('span[class="mat-option-text"]').eq(2).click()
    cy.get('mat-select[formcontrolname="payerType"]').click()
    cy.get('span[class="mat-option-text"]').eq(2).click()
    cy.contains('button','Aceptar').click()  
  });

  //Seleccionamos una fecha para diferir la intervención
  it('step 9', () => {
    cy.get('svg[matTooltip="Diferir"]').eq(0).click()
    cy.get('.col > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.wait(1000)
  });

  //Seleccionamos año y mes
  it('step 10', () =>{
    cy.get('div[class="mat-calendar-body-cell-content mat-focus-indicator"]').eq(8).click()
    cy.wait(1000)
  });

  //Seleccionamos día
  it('step 11', () => {
    cy.get('div[class="mat-calendar-body-cell-content mat-focus-indicator"]').eq(21).click()
    cy.wait(2000)
    cy.get('.col > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').should('not.be.null')
  });
  
  it("logout", () => {
    masterLogin.logout()
  })
})