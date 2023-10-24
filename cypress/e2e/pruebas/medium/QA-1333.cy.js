Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1333 - Recepciones_Detalle del pedido_Intervenciones_Diferir intervención', ()=>{
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
    cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(2000)
    cy.get(".card-vehicle__content").first().click()
    cy.get('.card-appointment__content').last().click().wait(2000)
  });
  
  // Nos situamos en la pestaña Intervenciones
  it('step 5', () => {
    cy.get('.sidebar > :nth-child(7)').click()  
    cy.wait(3000)
    cy.xpath("//button[contains(.,'Añadir intervención')]").click().wait(3000)
    cy.xpath("//input[@formcontrolname='createPackage']").scrollIntoView().type('test')
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").click({force:true}).wait(1000)
    cy.get('.mat-select-arrow').click().wait(2000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.get('.col-12 > .btn__primary').click()
    cy.get('.mat-select-arrow-wrapper').click().wait(3000)
    cy.xpath("//span[@class='mat-option-text'][contains(.,'Inspección y Mantenimiento')]").click()
    cy.get('.col-12 > .btn__primary').click()
    cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').clear().type('2').wait(2000)
    cy.get('.col-12 > .btn__primary').click().wait(1000)

  });
  
  // Pulsamos sobre el botón Diferir una intervención
  it('step 6', () => {
    cy.get('.col > [matTooltip="Diferir"]').first().click()
    cy.wait(1000)
    cy.xpath("//mat-dialog-container[contains(.,'Diferir intervenciónSeleccione la fecha en la que desea programar el diferidoFecha Cancelar  Diferir')]").should("be.visible")
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})