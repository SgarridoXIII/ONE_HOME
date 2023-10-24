Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

describe('QA-1098 - Roles y permisos', () => {
  
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

  //En la pantalla "Configuración" pulsamos en el botón "Roles y permisos".
  it('step 5', () => {
    cy.contains('div','Roles y permisos').click()
    cy.wait(1000)
    cy.get('h3').should('contain.text','Roles y permisos')
    cy.get('mat-header-cell').should('contain.text','Rol')
    cy.get('mat-header-cell').should('contain.text','Acciones')
    cy.get('mat-cell').should('contain.text','Administrador')
    cy.get('mat-cell').should('contain.text','Asesor')
    cy.get('mat-cell').should('contain.text','Gestor de precios')
    cy.get('mat-cell').should('contain.text','Mantenimiento de calculadoras')
    cy.get('mat-cell').should('contain.text','Agente de contact center')
  });
   
  it("logout", () => {
    masterLogin.logout()
  });
})