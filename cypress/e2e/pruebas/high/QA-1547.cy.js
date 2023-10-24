Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1547 - Recepciones_Detalle del pedido_Información general_Iniciar recepción_Pestaña Intervenciones_Diferir', () => {
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
    //   cy.get('#otp').type(token);
    // });

    // cy.get('.btn').click({ force: true })
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
    cy.get('.mb-2').should('have.text', 'Información general')
    cy.wait(1000)
  });

  // Pulsamos el botón Iniciar recepción
  it('step 6', () => {
    cy.get('.btn__primary').click()
    cy.wait(5000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
  });

  // En la pestaña Intervenciones, comprobamos la información
  it('step 7', () => {
    cy.get('#cdk-step-label-0-1').click()
    cy.wait(1000)
    cy.get('.flex-auto > .btn__primary').click()
    cy.wait(1000)
    cy.get(':nth-child(6) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').type('Test')
    cy.wait(1000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").click()
    cy.wait(1000)
    cy.get('.mat-select-arrow').click()
    cy.wait(1000)
    cy.get('.mat-option').eq(0).click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.mat-select-arrow').click()
    cy.wait(1000)
    cy.get('.mat-option').eq(1).click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').as('time')
    cy.get('@time').clear().type('1')
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').should('be.ok')
    cy.wait(1000)
    cy.get('.my-3 > .bold').should('have.text', 'Intervenciones')
    cy.wait(1000)
  });

  // Pulsamos Diferir en una de las intervenciones
  it('step 8', () => {
    cy.get('svg[matTooltip="Diferir"]').eq(0).click()
    cy.wait(1000)
    cy.get('.col > .m-0').should('have.text', 'Diferir intervención')
    cy.wait(1000)
  });

  // Selecciomos fecha y pulsamos Diferir
  it('step 9', () => {
    cy.get('.col > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.wait(1000)
    cy.contains('NOV').click()
    cy.wait(1000)
    cy.get(':nth-child(4) > [data-mat-col="3"]').click()
    cy.wait(1000)
    cy.get(':nth-child(3) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.mat-snack-bar-container').should('have.text', 'Información actualizada correctamente')
    cy.wait(1000)
  });

  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
