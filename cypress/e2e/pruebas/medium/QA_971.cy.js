Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import one from '../../../support/PageObject/One.cy'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
const master = new one
let tipoPagador = ''
let tipoIntervencion = ''

describe('QA-971 - Crear cita_Pestaña Intervenciones_Detalle intervenciones', () => {
  
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
    cy.wait(2000)
    cy.contains('button','0311X - M. CONDE').click()
    cy.get('input[data-placeholder="Buscar cliente..."]').type('Ser{enter}').wait(8000)
    cy.get('span[class="mat-option-text"]').eq(0).click().wait(2000)
    // cy.get('.customer-card').first().click()
    cy.get('one-infinite-scroll.ng-tns-c380-15 > .row > .col-12 > :nth-child(1)').eq(0).click().wait(1000)
    cy.get('button[class="btn__primary w-100"]').click().wait(2000)
  });

  //Accedemos a la pestaña Intervenciones
  it('step 5', () => {
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
    cy.get('div[class="w-100"]').should('be.visible')
    cy.get('h3').should('contain.text','Motivo de la visita')
    cy.get('button[class="btn__secondary ng-star-inserted"]').eq(6).click().wait(2000)
    cy.get('input[formcontrolname="searchPackage"]').type('test').wait(2000)
    cy.get('input[formcontrolname="createPackage"]').type('test').wait(2000)
    cy.contains('button','Añadir intervención manual').click().wait(1000)
    cy.get('#mat-dialog-2').should('be.visible')
    cy.get('.mat-select-arrow-wrapper').click().wait(1000)
    cy.get('.mat-option-text').should('be.visible')
    cy.get('.mat-option-text').should('contain.text','Interno')
    cy.get('.mat-option-text').should('contain.text','Aseguradora')
    cy.get('.mat-option-text').should('contain.text','Cliente propietario')
    cy.get('.mat-option-text').should('contain.text','Empresa Renting')
    cy.get('.mat-option-text').should('contain.text','Garantías')
    cy.get('.mat-option-text').should('contain.text','VWFS')
    cy.get('span[class="mat-option-text"]').eq(2).then(e => {
        expect(e.val()).not.null
        tipoPagador = e.val()
        console.log('val',e.val())
    })
    cy.get('span[class="mat-option-text"]').eq(2).click()
    cy.contains('button','Aceptar').click().wait(2000)
    cy.get('.mat-select-arrow-wrapper').click().wait(1000)
    cy.get('span[class="mat-option-text"]').eq(2).then(e => {
        expect(e.val()).not.null
        tipoIntervencion = e.val()
        console.log('val',e.val())
    })
    cy.get('span[class="mat-option-text"]').eq(2).click().wait(2000)
    cy.contains('button','Aceptar').click().wait(2000)
    cy.get('#mat-input-9').clear().type('1')
    cy.contains('button','Guardar').click().wait(2000)
    cy.get('.mat-snack-bar-container').should('be.visible')
    cy.get('div[class="w-100"]').should('be.visible')
    cy.get('h3').should('contain.text','Motivo de la visita')
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
    cy.get('h3').eq(4).should('have.text','Intervenciones')
  });

  //En el listado, pulsamos sobre la flecha de expandir (flecha para abajo) en una de las intervenciones
  it('step 6', () => {
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
    cy.get('h6').should('contain.text','Recambios')
    cy.get('h6').should('contain.text','Mano de obra')
    cy.get('h6').should('contain.text','Fluidos')
  });
  
  //Sobre el apartado Recambios, pulsamos sobre la felcha de expandir
  it('step 7', () => {
    // cy.get('h6[class="mb-1 ml-2 hide-in-mobile"]')    
    cy.contains('h6','Recambios').click().wait(2000)
    cy.get('thead').eq(0).should('contain.text','Referencia')
    cy.get('thead').eq(0).should('contain.text','Descripción')
    cy.get('thead').eq(0).should('contain.text','Uds.')
    cy.get('thead').eq(0).should('contain.text','Stock')
    cy.get('thead').eq(0).should('contain.text','Precio')
    cy.get('thead').eq(0).should('contain.text','Dto')
    cy.get('thead').eq(0).should('contain.text','Precio final')
  });

  //Sobre el apartado Mano de obra, pulsamos sobre la flecha de expandir
  it('step 8', () => {
    cy.contains('h6','Mano de obra').click().wait(2000)
    cy.get('thead').eq(1).should('contain.text','Referencia')
    cy.get('thead').eq(1).should('contain.text','Descripción')
    cy.get('thead').eq(1).should('contain.text','Tiempo')
    cy.get('thead').eq(1).should('contain.text','Precio')
    cy.get('thead').eq(1).should('contain.text','Dto')
    cy.get('thead').eq(1).should('contain.text','Precio final')
  });

  //Pulsamos sobre las flechas hacia arriba en ambos apartados
  it('step 9', () => {
    cy.get('#mat-expansion-panel-header-1 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})