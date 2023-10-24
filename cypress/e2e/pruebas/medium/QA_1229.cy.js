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

describe('QA-1229 - Recepciones_Detalle del pedido_Información general_Desplegable_Estado', () => {
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
 
  //Pulsamos sobre el campo Estado
  it('step 6', () => {
    cy.get('mat-select[formcontrolname="serviceState"]').click()
    cy.get('mat-option[role="option"]').should('be.visible')
    cy.get('mat-option[role="option"]').should('contain.text','Nueva Cita')
    cy.get('mat-option[role="option"]').should('contain.text','Cita preparada')
    cy.get('mat-option[role="option"]').should('contain.text','Pedido pendiente de firma')
    cy.get('mat-option[role="option"]').should('contain.text','Recepcionado')
    cy.get('mat-option[role="option"]').should('contain.text','Ampliación de Pedido')
    cy.get('mat-option[role="option"]').should('contain.text','Reparando')
    cy.get('mat-option[role="option"]').should('contain.text','Listo para entregar')
    cy.get('mat-option[role="option"]').should('contain.text','Entregado')
    cy.get('mat-option[role="option"]').should('contain.text','Cancelado')
    cy.get('mat-option[role="option"]').should('contain.text','Reparado')
  });
   
  //Seleccionamos uno de los estados
  it('step 7', () => {
    cy.get('mat-option[role="option"]').eq(1).click()
    cy.get('mat-select[formcontrolname="serviceState"]').should('contain.text','Cita preparada')
  });
  
  it("logout", () => {
    masterLogin.logout()
  })
})