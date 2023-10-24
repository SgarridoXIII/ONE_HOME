Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('QA-1328 - Recepciones_Detalle del pedido_Intervenciones_Añadir intervención_paquete PPSO', () => {
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
    cy.xpath("//input[contains(@formcontrolname,'search')]").type("8399JZZ").wait(5000)
    cy.get(".card-vehicle__content").first().click()
    cy.get('.card-appointment__content').first().click()
  });

  // Nos situamos en la pestaña Intervenciones
  it('step 5', () => {
    cy.get('.sidebar > :nth-child(7)').click()
    cy.wait(1000)
  });

  // Pulsamos el botón Añadir intervención
  it('step 6', () => {
    cy.contains('Añadir intervención').click()
    cy.wait(1000)
  });

  // Pulsamos el botón Añadir intervención
  it('step 7', () => {
    cy.xpath("//mat-icon[@role='img'][contains(.,'account_tree')]").click().wait(3000)
    cy.xpath("//button[contains(@aria-label,'Toggle Actividades generales')]").click()
    cy.xpath("//button[contains(@aria-label,'Toggle Chequeo completo del vehículo con certificado')]").click()
    cy.xpath("//mat-tree-node[contains(.,'Revisar el vehículo con certificado')]").find('mat-checkbox').click()
   //cy.get('mat-checkbox[class="mat-checkbox ng-tns-c321-118 mat-primary"]').select()
    //cy.xpath("//span[@class='ng-tns-c321-118'][contains(.,'Revisar el regulador de tensión para el generador')]").click({force:true})
    cy.get('.col > .btn__primary').click().wait(2000)
    cy.get('mat-select[formcontrolname="payerType"]').click()
    cy.wait(1000)
    cy.get('mat-option').eq(0).click()
    cy.wait(1000)
    cy.get('.btn__primary').contains('Aceptar').click()
    cy.wait(1000)
    
    cy.get('mat-select[formcontrolname="taskType"]').click()
    cy.wait(1000)
    cy.get('mat-option').eq(1).click()
    cy.wait(1000)
    cy.get('.btn__primary').contains('Aceptar').click()
    cy.wait(1000)
    
    cy.get('svg[matTooltip="Eliminar"]').eq(0).click()
    cy.wait(1000)
    cy.get('.col-12 > .btn__primary').click()
    cy.wait(1000)
  });

  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
