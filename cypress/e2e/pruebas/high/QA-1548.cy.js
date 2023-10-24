Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'
import One from '../../../support/PageObject/One.cy';

describe('Test QA-1548	Recepciones_Detalle del pedido_Información general_Iniciar recepción_Pestaña Intervenciones_Descartar', () => {

  const master=new One


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
    master.login()
  })

  it("Step 3", () => {
    cy.get(':nth-child(2) > .shortcut').click()


  })
  it("Step 4", () => {
    cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
    cy.wait(5000)
    cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(3000)
    cy.get(".card-vehicle__content").first().click()
    cy.contains(" Sergio Garrido Benitez ").first().click().wait(5000);


  })

  it("Step 5", () => {
    cy.wait(2000)
    cy.get('.sidebar__option').children('.sidebar__option__text').contains('Información general').click().wait(5000)
  })
  it("Step 6", () => {
    cy.get('.btn__primary').click()
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click().wait(2000)
    cy.get('svg.navigation__navs__next').click().wait(2000)
    cy.get('.flex-auto > .btn__primary')
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
    // cy.get('svg[matTooltip="Añadir rápido"]"]')
    // cy.get('svg[matTooltip="Añadir rápido"]"]')
    // cy.get('svg[matTooltip="Descartar"]')
    // cy.get('svg[matTooltip="Añadir rápido"]"]')
    cy.get('svg.navigation__navs__back')
    cy.get('.mat-slide-toggle-bar').scrollIntoView()
    cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').scrollIntoView()
    cy.get('.col-12 > .btn__primary').scrollIntoView()
    cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').scrollIntoView()
    cy.get(':nth-child(2) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').wait(3000)

  })
  it("Step 8", () => {

    cy.get('svg[matTooltip="Descartar"]').first().click({force:true}).wait(3000)
    cy.xpath("//button[contains(.,'Sí')]").click()
    cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').scrollIntoView().click(50, 50);
    cy.get(':nth-child(2) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50);
    cy.get('.navigation__finish > .btn__primary').click().wait(5000)

    cy.get('.sidebar__option').children('.sidebar__option__text').contains('Descartadas').click().wait(2000)


  })
  it("Logout", () => {
    cy.visit('/')
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })//Fin logout



})