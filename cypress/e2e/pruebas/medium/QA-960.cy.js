Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

function generateRandomNumber() {
  const characters = '0123456789';
  return Array.from({length: 40}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

describe('QA-960 - Crear usuario_Datos usuario_formato campos_Instalaciones', () => {
  
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

  //Desde la pantalla "Home", pulsamos sobre el botón +
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

  //Comprobamos que el formato del campo Instalaciones es correcto
  it('step 5', () => {
    cy.get('input[formcontrolname="selectedInstallation"]').type(`ins${generateRandomNumber()}`)
    const limitCharacter = '40'
    const fakeLimitCharacter = '41'
    cy.get('input[formcontrolname="selectedInstallation"]').then(e => {
      expect(e.attr('maxlength')).to.equal(limitCharacter)
      expect(e.attr('maxlength')).not.to.equal(fakeLimitCharacter)
    })
  });

  it("logout", () => {
    masterLogin.logout()
  });
})