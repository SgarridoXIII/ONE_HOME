Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import { eq } from 'lodash';
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

function generateRandomNumber() {
  const characters = '0123456789';
  return Array.from({length: 7}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

describe('QA-895 - E2E_Crear usuario', () => {

  // Accedemos a la pantalla "Home" de la aplicación ONE
  before(() => {
    cy.task("generateOTP", "42SITBH2CBZTZDO3");
    cy.clearCookies()
    cy.clearLocalStorage()
  })
  
  it("step 1", () => {
  // Accedemos a la URL de ONE - Volkswagen
    cy.visit("/")
    cy.wait(1000) 
  });
  
  // Introducimos usuario o email y contraseña y pulsamos Acceder.
  it('step 2', () => {
    masterLogin.login()
  });

  //Desde la pantalla principal "Home" pulsamos en el botón "Más" del menú superior
  it('step 3', () => {
    cy.get('svg.mat-menu-trigger.top-navigation-bar__actions__icon').click()
    cy.wait(1000)
    cy.get('.mat-menu-content').should('be.ok')
    cy.wait(1000)
  });

  //Pulsamos sobre el módulo 'Crear cliente'.
  it('step 4', () => {
    cy.get('button[role="menuitem"]').eq(0).click()
    cy.wait(3000)
    cy.get('h5').should('include.text','Crear cita')
    cy.get('.container-fluid').should('be.ok')
    cy.wait(1000)
    cy.contains('button','0311X - M. CONDE').click()
    cy.wait(2000)   
    cy.get('h3').should('include.text','Cliente')
    cy.get('button').should('include.text','Crear nuevo cliente')
    cy.get('.container-fluid').should('be.ok')
    cy.contains('button','Crear nuevo cliente').click()
    cy.wait(1000)
    cy.get('h4').should('contain.text','Crear cliente')
    cy.get('button').should('contain.text','Particular')
    cy.get('button').should('contain.text','Empresa')
    cy.contains('button','Particular').click()
    cy.wait(3000)
    cy.get('h4').should('contain.text','Crear nuevo cliente')
    cy.get('#mat-dialog-1').should('be.visible')
  });
   
  //Rellenamos los campos correspondientes y pulsamos en el botón "Crear usuario".
  it('step 5', () => {
    cy.get('input[formcontrolname="documentValue"]').type(`Y${generateRandomNumber()}K`)
    cy.get('input[formcontrolname="name"]').type(`Nombre${generateRandomNumber()}`)
    cy.get('input[formcontrolname="firstSurname"]').type(`1Apellido${generateRandomNumber()}`)
    cy.get('input[formcontrolname="secondSurname"]').type(`2Apellido${generateRandomNumber()}`)
    cy.get('input[formcontrolname="phone1"]').type(`tel${generateRandomNumber()}`)
    cy.get('input[formcontrolname="email"]').type(`email${generateRandomNumber()}@test.com`)
    cy.get('div[class="mat-slide-toggle-bar"]').eq(2).should('not.be.true')
    cy.wait(1000)
    cy.contains('button','Crear cliente').click()
    cy.wait(1000)
    cy.get('div[class="customer-card selected ng-tns-c377-14 ng-star-inserted"]').should('be.visible')
    cy.get('button[class="btn__secondary m-2 ng-tns-c377-14 ng-star-inserted"]').eq(1).click()
    cy.get('.mat-snack-bar-container').should('be.visible')
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})