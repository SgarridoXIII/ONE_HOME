Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-939	Crear cita_Pestaña Motivo de la visita_Añadir intervenciones por desgaste', () => {


  before(() => {
    cy.task("generateOTP", "42SITBH2CBZTZDO3");
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  // Accedemos a la URL de ONE - Volkswagen
  it('Step 1 ', () => {
    cy.visit("/",)
    cy.wait(1000)
  })

  // Introducimos usuario o email y contraseña y pulsamos Acceder.
  it("Step 2", () => {
    masterLogin.login()
  })

  //Desde la pantalla "Home", pulsamos sobre el botón +
  it("Step 3", () => {
    cy.get('svg.mat-menu-trigger.top-navigation-bar__actions__icon').click()
    cy.get('.mat-menu-content > :nth-child(1)').click().wait(1000)
  })

  //Pulsamos en la opción "Crear cita". Seleccionamos un cliente con PPSO
  it("Step 4", () => {
    cy.xpath("//button[@class='btn__secondary ng-star-inserted'][contains(.,'0311X - M. CONDE')]").click().wait(1000)
    cy.wait(3000)
    cy.get('input[data-placeholder="Buscar vehículo..."]').click().type('8399JZZ{enter}').wait(10000)
    cy.get('div[class="ng-tns-c380-15"]').click({ force: true })
    cy.get('.customer-card').first().click()
    cy.get('.btn__primary.w-100').click()
  })

  //Accedemos a la pestaña Motivo de la visita
  it("Step 5", () => {
    cy.get('svg.navigation__navs__next').click();
    cy.wait(1000)
  })

  //Seleccionamos motivo
  it('Step 6', () => {
    cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click().wait(5000)
  })

  //Seleccionamos una intervencion por desgaste
  it('Step 7', () => {
    cy.get('#mat-checkbox-20 > .mat-checkbox-layout > .mat-checkbox-inner-container').click({ force: true })
    cy.xpath("//button[contains(.,'Añadir selección')]").click()
    cy.get('.mat-select-arrow').click().wait(2000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.xpath("//button[contains(.,'Aceptar')]").click()
  })

  //Seleccionamos un valor y pulsamos Aceptar
  it('Step 8', () => {
    cy.get('.mat-select-arrow-wrapper').click().wait(3000)
    cy.xpath("//span[@class='mat-option-text'][contains(.,'Inspección y Mantenimiento')]").click()
    cy.xpath("//button[contains(.,'Aceptar')]").click().wait(2000)
    cy.get('.mat-snack-bar-container').should('be.visible')
  });
  
  //Accedemos a la pestaña
  it('Step 9', () => {
    cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click().wait(2300)
    cy.get('span[class="bold px-0"]').should('be.visible')
    cy.get('div[class="mt-2"]').should('be.visible')
  });

  it("Logout", () => {
    masterLogin.logout()
  })//Fin logout
})