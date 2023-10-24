Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
var busquedaUser = 'Francisco';

describe('QA-1089 - Usuarios', () => {
  
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
  });
  
  // Introducimos usuario o email y contraseña y pulsamos Acceder.
  it('step 2', () => {
    masterLogin.login()
  });

  //Desde la pantalla principal "Home" pulsamos en el botón "Más" del menú superior
  it('step 3', () => {
    cy.get('.top-navigation-bar__options__navs > .mat-menu-trigger').click()
    cy.wait(1000)
    cy.get('.mat-menu-content ng-tns-c69-2').should('be.ok')
    cy.wait(1000)
  });

  //En las opciones del despliegue pulsamos la opción "Configuración"
  it('step 4', () => {
    cy.xpath("//div[@class='top-navigation-bar__options__navs__more-item ng-tns-c81-2 ng-star-inserted'][contains(.,'Configuración')]").click()
    cy.wait(1000)
    cy.get('h3').should('include.text','Configuración')
    cy.get('.ng-star-inserted').should('be.ok')
  });

  //Pulsamos el botón usuarios "Usuarios"
  it('step 5', () => {
    cy.get(':nth-child(4) > .shortcut').click() 
    cy.wait(1000)
    cy.get('h3').should('include.text','Usuarios')
    cy.get('.h-100 ng-tns-c76-1 ng-trigger ng-trigger-triggerName').should('be.ok')
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})