Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import { string } from 'assert-plus';
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
var nuevoPrecioOne = 34;
let antiguoPrecioOne = ''


describe('QA-1075 - Precios_Pestaña Fluidos_Editar_Campo Precio ONE', () => {

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
    cy.get('.top-navigation-bar__options__navs > .mat-menu-trigger').click()
    cy.wait(1000)
    cy.get('.mat-menu-content').should('be.ok')
    cy.wait(1000)
  });
  
  
  //En las opciones del desplegable pulsamos en la opción "Configuración".
  it('step 4', () => {
    cy.xpath("//div[@class='top-navigation-bar__options__navs__more-item ng-tns-c81-2 ng-star-inserted'][contains(.,'Configuración')]").click()
    cy.wait(1000)
    cy.get('h3').should('contain.text','Configuración')
    cy.get('h5').should('contain.text','Instalaciones')
    cy.get('h5').should('contain.text','Precios')
    cy.get('h5').should('contain.text','Recambios')
    cy.get('h5').should('contain.text','Usuarios')
    cy.get('h5').should('contain.text','Roles y permisos')
    cy.get('h5').should('contain.text','Perfil')
    cy.get('h5').should('contain.text','Horarios')
  });

  //Pulsamos el botón "Precios".
  it('step 5', () => {
    cy.contains(':nth-child(2) > .shortcut','Precios').click()
    cy.wait(25000)
    cy.get('div').should('contain.text','Fluidos')
    cy.get('div').should('contain.text','Mano de obra')
  });

  //Pulsamos la pestaña Fluidos
  it('step 6', () => {
    cy.get('#mat-tab-label-0-1 > .mat-tab-label-content').click()
    cy.wait(1000)
    cy.get('mat-header-cell').should('contain.text','Referencia PPSO')
    cy.get('mat-header-cell').should('contain.text','Descripción PPSO')
    cy.get('mat-header-cell').should('contain.text','Unidades PPSO')
    cy.get('mat-header-cell').should('contain.text','Referencia')
    cy.get('mat-header-cell').should('contain.text','Descripción')
    cy.get('mat-header-cell').should('contain.text','Precio')
  });

  //Editamos el campo Precio ONE
  it('step 7', () => {
    cy.get('#mat-input-16').then(e => {
        expect(e.val()).not.null
        antiguoPrecioOne = e.val()
    })
    cy.wait(1000)
    cy.get('#mat-input-16').clear().type(nuevoPrecioOne)
    cy.contains('mat-header-cell','Referencia').click()
    cy.wait(3000)
    cy.get('.mat-snack-bar-container').should('be.ok')
  });
  
  //Comprobamos que el campo Precio ONE se ha editado correctamente
  it('step 8', () => {
    cy.get('#mat-input-16').should('contain.value',nuevoPrecioOne)
    cy.get('#mat-input-16').clear().type(antiguoPrecioOne)
    cy.contains('mat-header-cell','Referencia').click()
    cy.wait(3000)
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})