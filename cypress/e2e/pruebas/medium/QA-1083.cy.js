Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import { log } from 'async';
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
let precioInicial = ''
const precioFinal = '342'

describe('QA-1083 - Recambios_Modificar recambio', () => {
  
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
    cy.contains('div','Más').click()
    cy.get('.mat-menu-content').should('be.ok')
  });

  //En las opciones del desplegable pulsamos en la opción "Configuración".
  it('step 4', () => {
    cy.xpath("//div[@class='top-navigation-bar__options__navs__more-item ng-tns-c81-2 ng-star-inserted'][contains(.,'Configuración')]").click()
    cy.wait(1000)
    cy.get('h3').should('include.text','Configuración')
    cy.get('.container-fluid').should('be.ok')
    cy.get('h5').should('include.text','Instalaciones')
    cy.get('h5').should('include.text','Precios')
    cy.get('h5').should('include.text','Recambios')
    cy.get('h5').should('include.text','Usuarios')
    cy.get('h5').should('include.text','Roles y permisos')
    cy.get('h5').should('include.text','Perfil')
    cy.get('h5').should('include.text','Horarios')
  });

  //Pulsamos el botón "Recambios".
  it('step 5', () => {
    cy.contains('div','Recambios').click()
    cy.wait(4000)
    cy.get('.h-100 ng-tns-c89-1 ng-trigger ng-trigger-triggerName').should('be.ok')
    cy.get('h3').should('contain.text','Precios recambios')
    cy.get('mat-header-cell').should('contain.text','Nombre')
    cy.get('mat-header-cell').should('contain.text','Número de referencia')
    cy.get('mat-header-cell').should('contain.text','Precio')
    cy.get('mat-header-cell').should('contain.text','Fecha creación')
    cy.get('mat-header-cell').should('contain.text','Fecha actualización')
    cy.get('mat-header-cell').should('contain.text','Acciones')
  });

  //Pulsamos el botón 'Editar/Modificar recambio (icono lápiz) de uno de los registros
  it('step 6', () => {
    cy.get(':nth-child(2) > .cdk-column-actions > div').click()
    cy.get('#mat-dialog-0').should('be.visible')
    cy.get('h4').should('contain.text','Actualizar precio de recambio')
    cy.get('.btn__secondary').should('be.visible')
    cy.get('.col-12 > .btn__primary').should('be.visible')
    cy.get('input[formcontrolname="price"]').then(e => {
        expect(e.val()).not.null
        precioInicial = e.val()
        console.log('val',e.val())
    })
  });
  
  //Actualizamos el precio, si procede, y pulsamos Guardar
  it('step 7', () => {
    // console.log('precioInicial',precioInicial);
    cy.get('input[formcontrolname="price"]').clear().type(precioFinal)
    cy.contains('button','Guardar').click()
    cy.wait(2000)   
    cy.get(':nth-child(2) > .cdk-column-price').should('include.text',precioFinal)
    cy.wait(1000)
    cy.get(':nth-child(2) > .cdk-column-actions > div').click()
    cy.get('input[formcontrolname="price"]').clear().type(precioInicial)
    cy.get('.col-12 > .btn__primary').click()
    cy.wait(2000)
    cy.get(':nth-child(2) > .cdk-column-price').should('include.text',precioInicial)
    cy.wait(1000)
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})