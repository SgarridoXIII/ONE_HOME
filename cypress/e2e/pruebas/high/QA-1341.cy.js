Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import One from '../../../support/PageObject/One.cy';
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'
const master = new One

describe('Test QA-1341 - Recepciones_Detalle del pedido_Diferidos_Añadir diferidos_Seleccionar intervención', () => {
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
    master.citaPPSO()
    cy.get(':nth-child(2) > .shortcut').click()
    cy.wait(1000)
  });

  // Pulsamos sobre la flecha > de uno de los pedidos del listado
  it('step 4', () => {
    cy.get('mat-icon').should('have.text', 'close').click()
    cy.wait(1000)
    cy.get('.mat-form-field-autofill-control').eq(0).click()
    cy.wait(1000)
    cy.get('input[formcontrolname="search"]').type('8399JZZ')
    cy.wait(3000)
    cy.get('.card-vehicle__content').eq(0).click()
    cy.wait(1000)
    cy.get('one-card-appointment').eq(0).click()
    cy.wait(1000)
  });

  // Nos situamos en la pestaña Diferidos
  it('step 5', () => {
    cy.get('.sidebar > :nth-child(8)').click()
    cy.wait(1000)
  });

  // Pulsamos el botón Añadir diferidos
  it('step 6', () => {
    cy.get('.btn__secondary').click()
    cy.wait(1000)
  });

  // Realizamos una búsqueda en el buscador
  it('step 7', () => {
    cy.get(':nth-child(3) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').type('limpiaparabrisas')
    cy.wait(1000)
    cy.get('mat-option').eq(1).click()
    cy.wait(1000)
    cy.get('mat-select[formcontrolname="payerType"]').click()
    cy.wait(1000)
    cy.get('mat-option').eq(1).click()
    cy.wait(1000)
    cy.get('.col-12 > .btn__primary').click()
    cy.wait(1000)
  });

  // Seleccionamos una intervención
  it('step 8', () => {
    cy.wait(1000)
    cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').as('time')
    cy.get('@time').clear().type('1')
    cy.wait(1000)
    cy.xpath("//button[contains(.,'Guardar')]").click()
    cy.wait(1000)
    cy.get('.mt-2 > p').should('have.text', 'Seleccione la fecha en la que desea programar el diferido')
    cy.wait(1000)
  });

  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
