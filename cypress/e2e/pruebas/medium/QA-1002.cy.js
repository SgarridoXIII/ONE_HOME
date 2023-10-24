Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
var horaCita = '11:30'


describe('QA-1002 - Crear cita_Pestaña Día y hora_Resumen de la cita', () => {
  
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

  //Accedemos a la pestaña Día y hora
  it('step 5', () => {
    cy.contains('button','0311X - M. CONDE').click()
    cy.wait(2000)   
    cy.get('h3').should('include.text','Vehículo')
    cy.get('button').should('include.text','Crear nuevo vehículo')
    cy.get('.container-fluid').should('be.ok')
    cy.wait(2000)       
    cy.get('#mat-input-2').type('joa{enter}')
    cy.wait(12000)
    cy.get('#mat-option-15 > .mat-option-text > .d-flex > div').click()
    cy.get('one-infinite-scroll.ng-tns-c380-15 > .row > .col-12 > :nth-child(1)').click()
    cy.get('button[class="btn__primary w-100"]').click()
    cy.wait(1000)
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
    cy.wait(1000)
    cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
    cy.wait(3000)
    cy.get('h4').should('include.text','Añadir intervenciones')
    cy.get('label[for="mat-checkbox-37-input"]').click()
    cy.contains('button',' Añadir selección').click()
    cy.wait(1500)
    cy.get('div[class="mat-select-arrow-wrapper ng-tns-c217-30"]').click()
    cy.wait(1000)
    cy.get('mat-option[id="mat-option-24"]').click()
    cy.get('button[class="btn__primary w-100"]').click()
    cy.wait(500)
    cy.get('button[class="btn__primary w-100"]').click()
    cy.wait(500)
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
    cy.contains('button','Clásica').click()
    cy.get('.ng-tns-c412-10 > .align-items-start > .w-100 > :nth-child(2) > :nth-child(2) > :nth-child(1)').click()
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
    cy.get('h3').should('contain.text','Día y hora')
    cy.get('button').should('contain.text','Resumen de la cita')
    cy.get('button').should('contain.text','Comentario')
    cy.get('button').should('contain.text','Histórico de intervenciones')
  });   

  //Seleccionamos asesor y día y hora de la recepción y de la entrega y pulsamos el botón 'Resumen de la cita'
  it('step 6', () => {
    cy.get('#mat-input-0').click()
    cy.get('#mat-option-0 > .mat-option-text').click()
    cy.wait(3500)
    cy.contains('div',horaCita).click()
    cy.wait(3500)
    cy.get('.mt-4 > .flex-column > :nth-child(1)').click()
  });

  //Comprobamos que los datos que se muestran son los que hemos introducido previamente
  it('step 7', () => {
    cy.get('.summary__title').should('be.ok')
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})