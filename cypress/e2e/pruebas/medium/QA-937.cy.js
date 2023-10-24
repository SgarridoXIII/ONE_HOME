Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import { eq } from 'lodash';
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login


describe('QA-937 - Crear cita_Pestaña Motivo de la visita_Anterior', () => {
  
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
    cy.get('svg.mat-menu-trigger.top-navigation-bar__actions__icon').click()
    cy.wait(1000)
    cy.get('.mat-menu-content').should('be.ok')
    cy.wait(1000)
  });

  //Pulsamos en la opción "Crear Cita".
  it('step 4', () => {
    cy.get('.mat-menu-content > :nth-child(1)').click()
    cy.wait(3000)
    cy.get('h5').should('include.text','Crear cita')
    cy.get('.container-fluid').should('be.ok')
    cy.wait(1000)
  });

  //Accedemos a la pestaña Motivo de la visita
  it('step 5', () => {
    cy.contains('button','0311X - M. CONDE').click()
    cy.wait(2000)
    cy.get('input[data-placeholder="Buscar cliente..."]').click()
    cy.get('input[data-placeholder="Buscar cliente..."]').type('Sergio{enter}')
    cy.wait(10000)
    cy.get('span[class="mat-option-text"]').eq(0).click()
    cy.get('div[class="vehicle mb-3 ng-tns-c380-15 ng-star-inserted"]').eq(1).click()
    cy.wait(1000) 
    cy.contains('button','Aceptar').click()
    cy.wait(1000)
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
    cy.wait(1000)
    cy.get('h3').should('include.text','Motivo de la visita')
    cy.get('.mat-horizontal-content-container ng-tns-c157-24 container').should('be.ok')  
  });   

  //Pulsamos sobre la flecha Anterior
  it('step 6', () => {
    cy.get('svg[class="navigation__navs__back ng-star-inserted"]').click()
    cy.wait(1000)
    cy.get('div[class="customer-card selected ng-tns-c377-14 ng-star-inserted"]').should('be.visible')
    cy.get('div[class="vehicle selected mb-3 ng-tns-c380-15"]').should('be.visible')
    cy.get('div[class="mat-horizontal-content-container ng-tns-c156-11 container"]').should('be.ok')  
    cy.get('h3').should('include.text','Cliente')
    cy.get('h3').should('include.text','Vehículo')
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})