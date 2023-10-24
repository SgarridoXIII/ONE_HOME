Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

describe('QA-1016 - Instalaciones_Ir al detalle_Pestaña Datos generales', () => {
  
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

  //En la pantalla "Configuración" pulsamos en el botón "Instalaciones".
  it('step 5', () => {
    cy.contains('div','Instalaciones').click()
    cy.wait(5000)
    cy.get('h3').should('contain.text','Instalaciones')
    cy.get('div').should('contain.text','Código')
    cy.get('div').should('contain.text','KVPS')
    cy.get('div').should('contain.text','Nombre comercial')
    cy.get('div').should('contain.text','Razón social')
    cy.get('div').should('contain.text','Marcas asociadas')
    cy.get('div').should('contain.text','Estado BDC')
  });
  
  //En la pantalla "Instalaciones" pulsamos en el botón "Ir al detalle" de un registro de la tabla.
  it('step 6', () => {
    cy.get(':nth-child(3) > .cdk-column-actions > .w-100').click()
    cy.wait(2000)
    cy.get('#mat-tab-content-0-0').should('be.visible')
    cy.get('div').should('include.text','Datos generales')
    cy.get('div').should('include.text','Servicios')
    cy.get('div').should('include.text','Horario')
    cy.get('div').should('include.text','Comunicaciones')
  });
   
  it("logout", () => {
    masterLogin.logout()
  });
})