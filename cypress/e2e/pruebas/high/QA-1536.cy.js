Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1536 - Recepciones_Detalle del pedido_Información general_Iniciar recepción_Pestaña Estado del vehículo_Siguiente', ()=>{
  // Accedemos a la URL de ONE - Volkswagen
  before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {
    cy.visit("/")
    cy.wait(1000) 
  })

  // Introducimos usuario o email y contraseña y pulsamos Acceder
  it('step 2', () => {
    cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
    cy.wait(1000)
  });

  // Desde la pantalla "Home", pulsamos sobre el botón Recepciones
  it('step 3', () => {
    cy.get(':nth-child(2) > .shortcut').click()
    cy.wait(1000)
  });
  
  // Pulsamos sobre la flecha > de uno de los pedidos del listado
  it('step 4', () => {
    cy.get('.mat-icon').click()
    cy.wait(1000)
    cy.get('.card-appointment__content').eq(2).click()
    cy.wait(1000)
  });
  
  // Nos situamos en la pestaña Información General (por defecto aparece esta pestaña seleccionada)
  it('step 5', () => {
    cy.get('.mb-2').should('have.text','Información general')
    cy.wait(1000)
  });
  
  // Pulsamos el botón Iniciar recepción
  it('step 6', () => {
    cy.get('.btn__primary').click()
    cy.wait(3000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
  });

  // En la pestaña Estado del vehículo, comprobamos la información
  it('step 7', () => {
    cy.get('#cdk-step-label-0-0 > .mat-step-label').should('have.text', 'Estado del vehículo')
    cy.wait(1000)
    cy.get('one-visual-review-checkin-process.ng-star-inserted').should('be.ok')
    cy.wait(1000)
  });
  
  // Pulsamos la flecha Siguiente
  it('step 8', () => {
    cy.get('svg.navigation__navs__next.ng-star-inserted').click()
    cy.wait(1000)
    cy.get('svg.navigation__navs__back.ng-star-inserted').click()
    cy.wait(1000)
  });
  
  // Desde la pestaña Estado del vehículo, pulsamos sobre el nombre de la pestaña Intervenciones
  it('step 9', () => {
    cy.get('#cdk-step-label-0-1').click()
    cy.wait(1000)
    cy.get('.my-3 > .bold').should('have.text','Intervenciones')
    cy.wait(1000)
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  }) 
})
