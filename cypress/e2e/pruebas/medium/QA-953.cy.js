Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
var nombreUser = 'Francisco';
var apellido1User = 'Rincon';
var apellido2User = 'Garzon';
var vaesanetUser = 'volswag';
var dmsUser = 'fgarzon94';
var emailUser = 'fgarzon94@gmail.com';


describe('QA-953 - Crear usuario_pestaña Datos usuarios_obligatoriedad campos_Nombre', () => {
  
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
    cy.get('.mat-menu-content > :nth-child(3)').click()
    cy.get('h5').should('include.text','Crear usuario')
    cy.get('.container-fluid').should('be.ok')
  });

  //Comprobamos que el formato del campo nombre es correcto
  it('step 5', () => {
    const limitCharacter = '40'
    const fakeLimitCharacter = '41'
    cy.get('input[formcontrolname="name"]').then(e => {
      expect(e.attr('maxlength')).to.equal(limitCharacter)
      expect(e.attr('maxlength')).not.to.equal(fakeLimitCharacter)
    })
  });

  it("logout", () => {
    masterLogin.logout()
  });
})