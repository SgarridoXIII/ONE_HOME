Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
function generateRandomNumber() {
  const characters = '0123456789';
  return Array.from({length: 8}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

describe('QA-994 - Crear usuario_pestaña Datos usuarios_obligatoriedad campos_Email', () => {
  
  // Accedemos a la pantalla "Home" de la aplicación ONE
  before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {
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

  //Pulsamos en la opción "Crear usuario".
  it('step 4', () => {
    cy.get('button[role="menuitem"]').eq(2).click()
    cy.get(1000)
    cy.get('h5').should('include.text','Crear usuario')
    cy.get('.container-fluid').should('be.ok')
  });

  //Completamos los campos del formulario menos el campo "Email", y pulsamos en el botón "Crear usuario".
  it('step 5', () => {
    cy.get('input[formcontrolname="name"]').type(`Nombre${generateRandomNumber()}`)
    cy.get('input[formcontrolname="firstSurname"]').type(`1Apellido${generateRandomNumber()}`)
    cy.get('input[formcontrolname="secondSurname"]').type(`2Apellido${generateRandomNumber()}`)
    cy.get('input[formcontrolname="vaesanet"').type(`vaes${generateRandomNumber()}`)
    cy.get('input[formcontrolname="dmsCode"]').type(`${generateRandomNumber()}`)
    cy.get('mat-select[role="listbox"]').click()
    cy.get('span[class="mat-option-text"]').eq(2).click()
    cy.get('input[formcontrolname="selectedInstallation"]').click()
    cy.get('span[class="mat-option-text"]').eq(2).click()
    cy.wait(1000)
    cy.get('.btn__primary').should('not.be.enabled')
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})