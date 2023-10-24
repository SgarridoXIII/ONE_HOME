Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
let correoCliente = ''

describe('QA-915 - Crear cita_Pestaña Cliente_Ver ficha cliente', () => {
  
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
    cy.get('svg[class="mat-menu-trigger top-navigation-bar__actions__icon"]').click().wait(1000)
    cy.get('.mat-menu-content').should('be.ok').wait(1000)
  });

  //Pulsamos en la opción "Crear Cita".
  it('step 4', () => {
    cy.contains('button','Crear cita').click().wait(3000)
    cy.get('h5').should('include.text','Crear cita')
    cy.get('.container-fluid').should('be.ok').wait(1000)
  });

  //Accedemos a la pestaña Cliente
  it('step 5', () => {
    cy.contains('button','0311X - M. CONDE').click().wait(2000)   
    cy.get('h3').should('include.text','Cliente')
    cy.get('button').should('include.text','Crear nuevo cliente')
    cy.get('.container-fluid').should('be.ok')
  });

  //Realizamos una búsqueda en el buscador
  it('step 6', () => {
    cy.get('input[data-placeholder="Buscar cliente..."]').click().type('Alberto{enter}').wait(10000)
    cy.get('svg[class="icon ng-star-inserted"]').eq(1).click().wait(1000)
    cy.get('p').should('contain.text','Canal preferente de contacto')
    cy.get('button').should('contain.text','Teléfono') 
    cy.get('button').should('contain.text','E-mail') 
    cy.get('div[class="mat-form-field-infix ng-tns-c127-20"]').then(e => {
      expect(e.val()).not.null
      correoCliente = e.val()
      console.log('val',e.val())
  })
});
  
  //Pulsamos sobre el icono de 'Ver ficha'
  it('step 7', () => {
    cy.get('div[class="d-flex ng-tns-c377-14"]').click().wait(500)
    cy.contains('button','Ver el detalle').click().wait(3000)
    cy.get('h6').should('contain.text','Información cliente').wait(1000)
    cy.get('#mat-dialog-0').should('be.visible')
});
   
  //Comprobamos que los datos que aparecen en las pestañas son correctos
  it('step 8', () => {
    cy.get('input[formcontrolname="name"]')
    cy.get('input[formcontrolname="firstSurname"]')
    cy.get('input[formcontrolname="secondSurname"]')
    cy.get('input[formcontrolname="phone1"]')
    cy.get('input[formcontrolname="email"]').should('have.text',correoCliente)  
    cy.get('#mat-tab-label-1-0').should('contain.text',"Datos cliente")
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})