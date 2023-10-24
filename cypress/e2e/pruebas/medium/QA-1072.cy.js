Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

describe('QA-1072 - Precios_Pestaña Mano de obra', () => {

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
    cy.get('.mat-menu-content').should('be.ok')
    cy.wait(1000)
  });
  
  
  //En las opciones del desplegable pulsamos en la opción "Configuración".
  it('step 4', () => {
    cy.xpath("//div[@class='top-navigation-bar__options__navs__more-item ng-tns-c81-2 ng-star-inserted'][contains(.,'Configuración')]").click()
    cy.wait(1000)
    cy.get('h3').should('contain.text','Configuración')
    cy.get('h5').should('contain.text','Instalaciones')
    cy.get('h5').should('contain.text','Precios')
    cy.get('h5').should('contain.text','Recambios')
    cy.get('h5').should('contain.text','Usuarios')
    cy.get('h5').should('contain.text','Roles y permisos')
    cy.get('h5').should('contain.text','Perfil')
    cy.get('h5').should('contain.text','Horarios')
  });

  //Pulsamos el botón "Precios".
  it('step 5', () => {
    cy.contains(':nth-child(2) > .shortcut','Precios').click()
    cy.wait(30000)
    cy.get('div').should('contain.text','Fluidos')
  });

  //Pulsamos la pestaña Mano de obra
  it('step 6', () => {
    cy.get('div').should('contain.text','Mano de obra')
    cy.get('#mat-tab-label-0-0 > .mat-tab-label-content').click()
    cy.get('.btn__primary').should('be.visible')
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})