Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
const file = 'users.json'

describe('QA-1078 - Recambios_Subir fichero_Cancelar', () => {
  
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

  //Desde la pantalla principal "Home" pulsamos en el botón "Más" del menú superior
  it('step 3', () => {
    cy.contains('div','Más').click()
    cy.get('.mat-menu-content').should('be.ok')
  });

  //En las opciones del desplegable pulsamos en la opción "Configuración".
  it('step 4', () => {
    cy.xpath("//div[@class='top-navigation-bar__options__navs__more-item ng-tns-c81-2 ng-star-inserted'][contains(.,'Configuración')]").click()
    cy.wait(1000)
    cy.get('h3').should('include.text','Configuración')
    cy.get('.container-fluid').should('be.ok')
    cy.get('h5').should('include.text','Instalaciones')
    cy.get('h5').should('include.text','Precios')
    cy.get('h5').should('include.text','Recambios')
    cy.get('h5').should('include.text','Usuarios')
    cy.get('h5').should('include.text','Roles y permisos')
    cy.get('h5').should('include.text','Perfil')
    cy.get('h5').should('include.text','Horarios')
  });

  //En la pantalla "Configuración" pulsamos en el botón "Recambios".
  it('step 5', () => {
    cy.contains('div','Recambios').click()
    cy.wait(6000)
    cy.get('.h-100 ng-tns-c89-1 ng-trigger ng-trigger-triggerName').should('be.ok')
    cy.get('h3').should('contain.text','Precios recambios')
    cy.get('mat-header-cell').should('contain.text','Nombre')
    cy.get('mat-header-cell').should('contain.text','Número de referencia')
    cy.get('mat-header-cell').should('contain.text','Precio')
    cy.get('mat-header-cell').should('contain.text','Fecha creación')
    cy.get('mat-header-cell').should('contain.text','Fecha actualización')
    cy.get('mat-header-cell').should('contain.text','Acciones')
  });

  //Pulsamos el botón 'Subir fichero'
  it('step 6', () => {
    cy.get('.btn__primary').click()
    cy.wait(1000)
    cy.get('h4').should('include.text','Subir fichero de recambios')
    cy.get('mat-dialog-container').should('be.visible')
  });
  
  //Pulsamos 'Seleccionar fichero' o el botón 'Examinar' y seleccionamos un fichero
  it('step 7', () => {
    cy.get('.ml-2').click()
    cy.wait(1000)
    cy.get('input[type=file]').attachFile(file)
    cy.wait(4000)
  });

  //Pulsamos el botón 'Cancelar'
  it('step 8', () => {
    cy.get('button[class="btn__secondary mr-4"]').click()
    cy.wait(4000)
    cy.get('.h-100 ng-tns-c89-1 ng-trigger ng-trigger-triggerName').should('be.ok')
  });
   
  it("logout", () => {
    masterLogin.logout()
  });
})