Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import { clickOnAvailableSlot } from '../../../support/PageObject/Hooks';
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-2901 Creación de una recepción sin cita', () => {


  before(() => {
    cy.task("generateOTP", "42SITBH2CBZTZDO3");
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('Step 1 ', () => {

    cy.visit("/",)
    cy.get("#username").type("sergio.garrido@siigroup-spain.com")
    cy.get("#password").type("Godella21!con")
    cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
    //cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()

    // cy.task("generateOTP").then(token => {
    //     cy.get('#otp').type(token);
    //   });

    // cy.get('.btn').click({force:true})
    cy.wait(1000) //Fin login

  })
  it("Step 2", () => {
    cy.get('body > app-root > main > one-layout-application > div > div > gopa-home > div > div:nth-child(3) > div').click()
    cy.wait(2000)
  })
  it("Step 3", () => {
    cy.wait(1000)

    // cy.get('#mat-input-2').click().type('Edu').wait(2).type('{enter}').wait(15000)
    // cy.contains('Edu Diaz').click().wait(1000)
    // cy.contains('E-mail').click()

  })

  it("Step 4", () => {
    cy.get('#mat-input-3').click().type('1234ABC{enter}')
    cy.wait(5000)
    cy.contains('1234ABC').click({ force: true })
    cy.get('.customer-card').contains('E01').click();
    cy.get('.btn__primary.w-100').click()
    cy.get('svg.navigation__navs__next').click();
  })
  it("Step 5", () => {
    //  Motivo de la visita
    cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
    cy.get(':nth-child(5) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('test').wait(3000)
    // cy.get('#mat-input-7').type('test').wait(8000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)

    //

    cy.get('.mat-select-arrow').click().wait(2000)
    // cy.get('#mat-option-28 > .mat-option-text').click().wait(1000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.xpath("//button[contains(.,'Aceptar')]").click()


    cy.get('.mat-select-arrow-wrapper').click().wait(3000)
    cy.contains(' Inspección y Mantenimiento ').click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
    cy.get('.col-12 > .btn__primary').contains(' Guardar ').click()
    cy.get(".navigation").click(1075, 75)

    // cy.get('#mat-expansion-panel-header-1 > .mat-expansion-indicator').click()
    // cy.get('#mat-expansion-panel-header-4 > .mat-expansion-indicator').scrollIntoView().click()
    //cy.get('.ng-tns-c197-52 > one-card-package-expansion-v2-content-fluids > .mat-table > tfoot > .mat-footer-row > .cdk-column-actions > svg.mat-tooltip-trigger').click()

    // cy.get('one-card-package-expansion-v2-content-fluids > .mat-table > tbody > .mat-row > .cdk-column-name > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().type('Fluido1').wait(2000)
    // cy.get('.cdk-column-quantityLiters > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().type('5{enter}').wait(5000)
    // cy.get('#mat-input-63').click().type('15')
    // cy.get('.mat-stepper-horizontal').click()
  })
  it("Step 6", () => {
    cy.get(':nth-child(2) > .align-items-center > .btn__primary').scrollIntoView().click().wait(2000)
    cy.xpath("//mat-icon[@role='img'][contains(.,'account_tree')]").click().wait(3000)
    cy.xpath("//button[contains(@aria-label,'Toggle Actividades generales')]").click()
    cy.xpath("//button[contains(@aria-label,'Toggle Servicio de Líquido de Frenos')]").click()
    cy.xpath("//mat-tree-node[contains(.,'Servicio de líquido de frenos')]").find('mat-checkbox').click()
    cy.get(':nth-child(3) > .col > .btn__primary').click()
  })

  it("Step 7", () => {
    cy.get('mat-select[formcontrolname="payerType"]').click()
    cy.wait(1000)
    cy.get('mat-option').eq(0).click()
    cy.wait(1000)
    cy.get('.btn__primary').contains('Aceptar').click()
    cy.wait(1000)
    cy.get('.btn__primary').contains('Aceptar').click()
    cy.wait(1000)
    cy.get('svg.navigation__navs__next').click();
    cy.wait(1000)
    cy.get('one-checkin-type-appointment.ng-star-inserted > .align-items-start > .w-100 > :nth-child(1) > :nth-child(2) > :nth-child(1)').click()
    cy.wait(1000)
    cy.get('svg.navigation__navs__next').click();
    cy.wait(1000)
  })

  it("Step 8", () => {
    const photo = 'polo.png'
    cy.get(':nth-child(2) > .damages__add-damage').click()
    cy.get('.fileInput').attachFile(photo)
    cy.wait(3000)
    cy.get('button.btn__primary').contains('Guardar').click()
    // cy.get(':nth-child(4) > .btn__primary').click()
    cy.wait(2000)
    cy.get('svg.navigation__navs__next').click();
  })

  it("Step 9", () => {
    cy.get(':nth-child(1) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
    cy.get(':nth-child(2) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
    cy.get(':nth-child(3) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
    cy.wait(1000)
    cy.contains('Exterior').click()
    cy.wait(1000)
    cy.get(':nth-child(1) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
    cy.get(':nth-child(2) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
    cy.get(':nth-child(3) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
    cy.get(':nth-child(4) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
    cy.wait(1000)
    cy.get('svg.navigation__navs__next').click();
  })

  it("Step 10", () => {
    cy.get('.ng-untouched.ng-star-inserted > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(1000)

    cy.contains('Cualquier asesor').click()
    cy.wait(8000)
    clickOnAvailableSlot()
  })

  it("Step 11", () => {
    cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').scrollIntoView()
    cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50)
    cy.get(':nth-child(2) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50)
    cy.wait(5000);
    cy.get('.navigation__navs > .btn__primary').click()
  })

  it("Step 12", () => {
    cy.wait(1000)
  })
  it("Logout", () => {
    cy.visit('/')
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })//Fin logout



})