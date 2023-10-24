Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1561 Recepciones_Detalle del pedido_Información general_Iniciar recepción_Pestaña Resumen_Diferir intervención', () => {


  before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {

    cy.visit("/",)
    cy.wait(1000)

  })

  it("Step 2", () => {
    cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
    cy.wait(1000) //Fin login
  })

  it("Step 3", () => {
    cy.get(':nth-child(2) > .shortcut').click()


  })
  it("Step 4", () => {
    cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
    cy.wait(5000)
    cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(5000)
    cy.get(".card-vehicle__content").first().click()
    cy.contains(" Sergio Garrido Benitez ").first().click().wait(5000);

  })

  it("Step 5", () => {
    cy.wait(3000)
    cy.get('.sidebar__option').children('.sidebar__option__text').contains('Información general').click().wait(2000)
  })
  it("Step 6", () => {
    cy.xpath("//button[@routerlinkactive='router-link-active'][contains(.,'Iniciar recepción')]").click().wait(5000)
    cy.xpath("//button[@class='btn__primary w-100'][contains(.,'Aceptar')]").click()
    cy.get('svg.navigation__navs__next').click().wait(2000)
    cy.xpath("//button[contains(.,'Añadir nuevas intervenciones')]").click()
    cy.get(':nth-child(6) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').type('Test')
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000).wait(1000)

    //

    cy.get('.mat-select-arrow').click().wait(2000)
    // cy.get('#mat-option-28 > .mat-option-text').click().wait(1000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.xpath("//button[contains(.,'Aceptar')]").click()


    cy.get('.mat-select-arrow-wrapper').click().wait(3000)
    cy.get('mat-option').eq(0).click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').clear().type('2').wait(2000)
    cy.xpath("//button[contains(.,'Guardar')]").click()
    cy.get(".navigation").click(1075, 75)
    cy.wait(1000)
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
    cy.get('.ng-tns-c259-53 > one-card-package-expansion-v2-content-labours > .mat-table > tbody > .mat-row > .cdk-column-discount > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').clear().type('50')
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()

    cy.get('.flex-auto > :nth-child(3)').then($button => {
      if ($button.is(':disabled')) {
        cy.wait(1000)
      } else {
        $button.click()
      }
    })
    cy.get('svg.navigation__navs__next').click().wait(2000)
    cy.get('svg.navigation__navs__next').click().wait(2000)
    cy.get('svg.navigation__navs__next').click().wait(2000)
  })
  it("Step 7", () => {
    cy.wait(2000)
  })
  it("Step 8", () => {
    cy.get('svg[matTooltip="Diferir"]').first().click({force:true})
    cy.get('.col > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.get('.mat-calendar-body-active').click()
    cy.get('.mat-calendar-body-active').click()
    cy.wait(3000)
    cy.get('.mt-2 > .row > .col-12 > .btn__primary').click()
  })
  it("Logout", () => {
    cy.visit('/')
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })//Fin logout

})