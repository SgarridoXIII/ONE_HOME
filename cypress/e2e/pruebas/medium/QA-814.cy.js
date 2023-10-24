Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

function generarDNI() {
  var numero = Math.floor(Math.random() * 100000000);
  var letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
  var letra = letras.charAt(numero % 23);
  var dni = numero.toString().padStart(8, '0') + letra;
  return dni
}

function generarNumeroAleatorio(min, max){
  min = Math.ceil(100000000);
  max = Math.floor(199999999);
  return Math.floor('+9' + Math.random() * (max - min) + min);
}

const documentid = generarDNI()
const numeroTel = generarNumeroAleatorio()
const activeState = 'true'
const desactiveState = 'false'
var datoNombre = 'Emiliano'
var datoApellido1 = 'Ballen'
var datoApellido2 = 'Rincon'
var datoEmail = 'Emilianito98@yopmail.com'

describe('QA-814 - E2E_Crear cliente_Empresa_No Usar la misma dirección', () => {
  
  // Accedemos a la pantalla "Home" de la aplicación ONE
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
    cy.contains('button','Crear cliente').click()
    cy.wait(1000)
    cy.get('h4').should('contain.text','Crear cliente')
    cy.get('button').should('contain.text','Particular')
    cy.get('button').should('contain.text','Empresa')
    cy.contains('button','Particular').click()
    cy.wait(3000)
    cy.get('h5').should('contain.text','Crear cliente (Particular)')
    cy.get('.app-bar').should('be.visible')
});
   
  //En la pantalla "Crear cliente" rellanamos los campos correspondientes del formulario, el campo "Usar la misma dirección" desactivado. Rellenamos los campos de la sección "Dirección facturación". Pulsamos en el botón "Crear cliente".
  it('step 5', () => {
    cy.get('#mat-input-11').type(documentid)
    cy.get('#mat-input-12').type(datoNombre)
    cy.get('#mat-input-13').type(datoApellido1)
    cy.get('#mat-input-14').type(datoApellido2)
    cy.get('#mat-input-1').type(numeroTel)
    cy.get('#mat-input-3').type(datoEmail)  
    cy.get('#mat-checkbox-2 > .mat-checkbox-layout > .mat-checkbox-inner-container')
    const activeState = 'true'
    const desactiveState = 'false'
    cy.get('input[id="mat-checkbox-2-input"]').then(e => {
      expect(e.attr('aria-checked')).to.equal(desactiveState)
      expect(e.attr('aria-checked')).not.to.equal(activeState)
    })
    cy.contains('button','Crear cliente').click()
  });
  
  xit("logout", () => {
    masterLogin.logout()
  });
})