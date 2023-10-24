Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
let primerIntervencion = ''
let segundaIntervencion = ''

describe('QA-1331 - Recepciones_Detalle del pedido_Intervenciones_Descartar intervención', () => {
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

  //Pulsamos sobre el botón de descartar una intervención (el cliente no quiere la intervención)
  it('step 6', () => {
  cy.get('span[class="bold px-0"]').eq(0).then(e => {
    expect(e.val()).not.null
    primerIntervencion = e.val()
    console.log('val',e.val())
  })
  console.log ('Valor: '+ primerIntervencion)
  cy.get('svg[matTooltip="Descartar"]').should('be.visible')
  cy.get('svg[matTooltip="Descartar"]').eq(0).click()
  cy.get('one-dialog-structure > :nth-child(1) > .col').should('be.visible')
  cy.get('button[class="btn__primary ng-star-inserted"]').click()
  cy.wait(1000)
  cy.get('span[class="bold px-0"]').eq(0).should('contain.value',primerIntervencion)
  });
  
  it("logout", () => {
    masterLogin.logout()
  })
})