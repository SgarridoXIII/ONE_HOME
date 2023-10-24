Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1330 - Recepciones_Detalle del pedido_Intervenciones_Editar intervención', () => {
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
    cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
    cy.wait(5000)
    cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(5000)
    cy.get(".card-vehicle__content").first().click()
    cy.contains(" Sergio Garrido Benitez ").last().click().wait(5000)
  });

  // Nos situamos en la pestaña Intervenciones
  it('step 5', () => {
    cy.get('.sidebar > :nth-child(7)').click()
    cy.wait(5000)
  });

  // Editamos una intervención
  it('step 6', () => {
    cy.xpath("(//mat-expansion-panel-header[contains(@role,'button')])[1]")
    cy.get(".w-100 > :nth-child(1) > .mat-tooltip-trigger ").first().click()
    cy.wait(1000)
    cy.get('.col-12 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').clear().type('Test Edit')
    cy.wait(1000)
    cy.xpath("//button[contains(.,'Modificar')]").click()
    cy.wait(1000)
    cy.get('.mat-expansion-panel-header-title > .col-12').first().click()
    cy.wait(10000)
    // cy.get('#mat-option-44').click()
    // cy.wait(1000)
    // cy.get('.col-12 > .btn__primary').click()
    // cy.wait(1000)
    // cy.get('.mat-select-arrow').click()
    // cy.wait(1000)
    // cy.get('#mat-option-51').click()
    // cy.wait(1000)
    // cy.get('.col-12 > .btn__primary').click()
    // cy.wait(1000)
    // cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').as('time')
    // cy.get('@time').clear().type('1')
    // cy.wait(1000)
    // cy.get('.col-12 > .btn__primary').click()
    // cy.wait(1000)
    // cy.reload()
    // cy.wait(1000)
    // cy.get('.sidebar > :nth-child(7)').click()
    // cy.wait(1000)
    // cy.get('#mat-expansion-panel-header-0 > .mat-content > .mat-expansion-panel-header-title > .col-md-4 > one-card-package-expansion-v2-header-title > .w-100 > :nth-child(1)').as('edit')
    // cy.get('@edit').children('svg.mat-tooltip-trigger.mr-2.packageEditName.ng-star-inserted').click()
    // cy.wait(1000)
    // cy.get('.col-12 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').clear().type('Edit test')
    // cy.wait(1000)
    // cy.get('.col-12 > .btn__primary').click()
    // cy.wait(1000)
    // cy.get('.mat-snack-bar-container').should('have.text', 'Nombre actualizado correctamente')
    // cy.wait(1000)
  });

  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
