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

describe('QA-1228 - Recepciones_Detalle del pedido_Información general_Desplegable_Motivo', () => {
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

  //Nos situamos en la pestaña Información General (por defecto aparece esta pestaña seleccionada)
  it('step 5', () => {
    cy.wait(1000)
    cy.get('h5').should('contain.text','Información general')
    cy.get('h5').should('contain.text','Cliente')
    cy.get('h5').should('contain.text','Vehículo')
    cy.get('h5').should('contain.text','Intervenciones')
  });
 
  //Pulsamos sobre el campo Motivo
  it('step 6', () => {
    cy.get('mat-select[formcontrolname="appointmentReasons"]').click()
    cy.get('mat-option[role="option"]').should('be.visible')
    cy.get('mat-option[role="option"]').should('contain.text','Mantenimiento')
    cy.get('mat-option[role="option"]').should('contain.text','Avería')
    cy.get('mat-option[role="option"]').should('contain.text','Neumáticos')
    cy.get('mat-option[role="option"]').should('contain.text','Revisión pre-ITV')
    cy.get('mat-option[role="option"]').should('contain.text','Chapa y pintura')
    cy.get('mat-option[role="option"]').should('contain.text','Accesorios')
    cy.get('mat-option[role="option"]').should('contain.text','Otros')
  });
   
  //Seleccionamos uno de los motivos
  it('step 7', () => {
    cy.get('mat-option[role="option"]').eq(2).click()
    cy.get('mat-select[formcontrolname="appointmentReasons"]').should('contain.text','Neumáticos')
  });
  
  it("logout", () => {
    masterLogin.logout()
  })
})