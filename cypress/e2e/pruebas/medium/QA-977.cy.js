Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
var motivoVisita = 'General';
var motivoVisita2 = 'Chasis'
let vehiculo = ''

describe('QA-977 - Crear cita_Pestaña Servicios adicionales_Resumen de la cita', () => {
  
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
    cy.get('button[role="menuitem"]').eq(0).click()
    cy.get(1000)
    cy.get('h5').should('include.text','Crear cita')
    cy.get('.container-fluid').should('be.ok')
    cy.wait(1000)
  });

  //Accedemos a la pestaña Servicios adicionales
  it('step 5', () => {
    cy.contains('button','0311X - M. CONDE').click()
    cy.wait(2000)
    cy.get('input[data-placeholder="Buscar cliente..."]').click()
    cy.get('input[data-placeholder="Buscar cliente..."]').type('Sergio{enter}')
    cy.wait(10000)
    cy.get('span[class="mat-option-text"]').eq(0).click()
    cy.get('div[class="vehicle mb-3 ng-tns-c380-15 ng-star-inserted"]').eq(1).click()
    cy.get('p[class="mb-2 ng-tns-c380-15"]').eq(0).then(e => {
      expect(e.val()).not.null
      vehiculo = e.val()
      console.log('val',e.val())
    })
    cy.wait(1000) 
    cy.contains('button','Aceptar').click()
    cy.wait(1000)
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
    cy.wait(1000)
    //Pestaña Motivo de la visita
    cy.get('h3').should('include.text','Motivo de la visita')
    cy.get('.mat-horizontal-content-container ng-tns-c157-24 container').should('be.ok')
    cy.get('h3').should('include.text','Motivo de la visita')
    cy.get('.mat-horizontal-content-container ng-tns-c157-24 container').should('be.ok')  
    cy.contains('button','Mantenimiento').click()
    cy.wait(1000)
    cy.get('input[formcontrolname="searchPackage"]').type(motivoVisita)
    cy.wait(1000)
    cy.get('input[formcontrolname="createPackage"]').type(motivoVisita)
    cy.wait(1000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
    cy.wait(1000)
    cy.get('.mat-select-placeholder').click()
    cy.wait(1000)
    cy.get('mat-option[role="option"]').eq(0).click()
    cy.wait(500)
    cy.get('button[class="btn__primary w-100"]').click()
    cy.get('.mat-select-placeholder').click()
    cy.wait(500)
    cy.get('mat-option[role="option"]').eq(0).click()
    cy.get('button[class="btn__primary w-100"]').click()
    cy.wait(1000)
    cy.get('input[mask="separator.2"]').eq(0).type('1')
    cy.get('button[class="btn__primary"]').click()
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
    cy.wait(1000)
    //Pestaña Intervenciones
    cy.get('.mat-horizontal-content-container ng-tns-c157-24 container').should('be.ok')  
    cy.get('h3').should('include.text','Intervenciones')
    cy.get('button').should('include.text','Añadir nuevas intervenciones')
    cy.get('button').should('include.text','Editar descuentos')
    cy.get('button[class="btn__primary mt-4 mr-2 mb-2"]').click()
    cy.wait(1000)
    cy.get('input[formcontrolname="searchPackage"]').type(motivoVisita2)
    cy.wait(1000)
    cy.get('input[formcontrolname="createPackage"]').type(motivoVisita2)
    cy.wait(1000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
    cy.wait(1000)
    cy.get('.mat-select-placeholder').click()
    cy.wait(1000)
    cy.get('mat-option[role="option"]').eq(0).click()
    cy.wait(500)
    cy.get('button[class="btn__primary w-100"]').click()
    cy.get('.mat-select-placeholder').click()
    cy.wait(500)
    cy.get('mat-option[role="option"]').eq(0).click()
    cy.get('button[class="btn__primary w-100"]').click()
    cy.wait(1000)
    cy.get('input[mask="separator.2"]').eq(20).clear().type('1')
    cy.get('button[class="btn__primary"]').click()
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
    cy.wait(1000)
    //Pestaña Servicios adicionales
    // cy.get('h3[class="bold mb-3 mt-4"]').should('have.text','Tipo de recepción')
    // cy.get('h3[class="bold mb-3 mt-4"]').should('have.text','Tipo de entrega')
    // cy.get('h3[class="bold mb-3 mt-4"]').should('have.text','Servicios de movilidad')
  });

  //Seleccionamos tipo de recepción, tipo de entrega y Servicios de movilidad y pulsamos el botón 'Resumen de la cita'
  it('step 6', () => {
    cy.get('button[class="btn__secondary m-2 ng-star-inserted"]').eq(0).click()
    cy.get('button[class="btn__secondary m-2 ng-star-inserted"]').eq(2).click()
    cy.get('button[class="btn__secondary summary d-none d-md-block mb-2"]').eq(2).click()
  });

  //Comprobamos que los datos que se muestran son los que hemos introducido previamente
  it('step 7', () => {
    cy.get('h4').should('include.text','Resumen de la cita')
    cy.get('p').should('include.text','0311X - M. CONDE')
    cy.get('p').should('include.text',vehiculo)
    cy.get('p').should('include.text',motivoVisita)
    cy.get('p').should('include.text',motivoVisita2)
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})