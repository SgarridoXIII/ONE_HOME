Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
var nombreBuscar = 'Sergio'
var buscarVehiculo = 'Audi Q3 Sportback'
var buscarCliente = 'David Prueba1'

describe('QA-929 - Crear cita_Pestaña Vehículo_Anterior', () => {
  
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

  //Accedemos a la pestaña Vehículo
  it('step 5', () => {
    cy.contains('button','0311X - M. CONDE').click()
    cy.wait(2000)   
    cy.get('h3').should('include.text','Vehículo')
    cy.get('button').should('include.text','Crear nuevo vehículo')
    cy.get('.container-fluid').should('be.ok')
  });   

  //Crear cita_Pestaña Vehículo_Anterior
  it('step 6', () => {
    cy.get('svg[class="navigation__navs__back ng-star-inserted"]').click()
    cy.wait(1000)
    cy.get('h3').should('include.text','Selecciona la instalación para comenzar')
    cy.get('.container-fluid').should('be.ok')
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})