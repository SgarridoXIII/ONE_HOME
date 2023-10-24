Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

function generarApellidoAleatorio() {
  var numero = Math.floor(Math.random() * 10000);
  var letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
  var letra = letras.charAt(numero % 23);
  var apellido = 'Recor' + numero.toString().padStart(4) + letra;
  return apellido
}

function generarNumeroAleatorio(min, max){
  min = Math.ceil(100000000);
  max = Math.floor(199999999);
  return Math.floor('+9' + Math.random() * (max - min) + min);
}

const apellidoCliente = generarApellidoAleatorio()
const segundoApellidoCliente = generarApellidoAleatorio()
const numeroAleatorio = generarNumeroAleatorio()
let apellidoClienteVal = ''
let segundoApellidoClienteVal = ''
let numeroVal = ''

describe('QA-916 - Crear cita_Pestaña Cliente_Ver ficha cliente_Editar', () => {
  
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
    cy.get('svg[class="mat-menu-trigger top-navigation-bar__actions__icon"]').click().wait(1000)
    cy.get('.mat-menu-content').should('be.ok').wait(1000)
  });

  //Pulsamos en la opción "Crear Cita".
  it('step 4', () => {
    cy.contains('button','Crear cita').click().wait(3000)
    cy.get('h5').should('include.text','Crear cita')
    cy.get('.container-fluid').should('be.ok').wait(1000)
  });

  //Accedemos a la pestaña Cliente
  it('step 5', () => {
    cy.contains('button','0311X - M. CONDE').click().wait(2000)   
    cy.get('h3').should('include.text','Cliente')
    cy.get('button').should('include.text','Crear nuevo cliente')
    cy.get('.container-fluid').should('be.ok')
  });

  //Realizamos una búsqueda en el buscador
  it('step 6', () => {
    cy.get('input[data-placeholder="Buscar cliente..."]').click().type('Alberto{enter}').wait(10000)
    cy.get('svg[class="icon ng-star-inserted"]').eq(1).click().wait(1000)
    cy.get('p').should('contain.text','Canal preferente de contacto')
    cy.get('button').should('contain.text','Teléfono') 
    cy.get('button').should('contain.text','E-mail') 
  });
  
  //Pulsamos sobre el icono de 'Ver ficha'
  it('step 7', () => {
    cy.get('div[class="d-flex ng-tns-c377-14"]').click().wait(500)
    cy.contains('button','Ver el detalle').click().wait(3000)
    cy.get('h6').should('contain.text','Información cliente').wait(1000)
    cy.get('#mat-dialog-0').should('be.visible') 
  });
   
  //Editamos algunos de los campos de las pestañas
  it('step 8', () => {
    cy.get('input[formcontrolname="email"]')
    cy.get('input[formcontrolname="name"]')
    cy.get('input[formcontrolname="firstSurname"]').clear().type(apellidoCliente)
    cy.get('input[formcontrolname="secondSurname"]').clear().type(segundoApellidoCliente)
    cy.get('input[formcontrolname="phone1"]').clear().type(numeroAleatorio)
    cy.contains('button','Guardar cambios').click().wait(2000)
    cy.get('.mat-simple-snackbar > span').should('be.visible').wait(1000)
    cy.get('input[formcontrolname="firstSurname"]').then(e => {
      expect(e.val()).not.null
      apellidoClienteVal = e.val()
      console.log('val',e.val())
    })
    cy.get('input[formcontrolname="secondSurname"]').then(e => {
      expect(e.val()).not.null
      segundoApellidoClienteVal = e.val()
      console.log('val',e.val())
    })
    cy.get('input[formcontrolname="phone1"]').then(e => {
      expect(e.val()).not.null
      numeroVal = e.val()
      console.log('val',e.val())
    })
    cy.get('input[formcontrolname="firstSurname"]').should('have.text',apellidoClienteVal)  
    cy.get('input[formcontrolname="secondSurname"]').should('have.text',segundoApellidoClienteVal)  
    cy.get('input[formcontrolname="phone1"]').should('have.text',numeroVal)  
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})