Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import one from '../../../support/PageObject/One.cy'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
const master = new one
let tipoPagador = ''
let tipoIntervencion = ''

describe('QA-1104 - Instalaciones_Ir al detalle_Horario', () => {
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
  
    //En la pantalla "Configuración" pulsamos en el botón "Instalaciones".
    it('step 5', () => {
      cy.contains('div','Instalaciones').click()
      cy.wait(5000)
      cy.get('h3').should('contain.text','Instalaciones')
      cy.get('div').should('contain.text','Código')
      cy.get('div').should('contain.text','KVPS')
      cy.get('div').should('contain.text','Nombre comercial')
      cy.get('div').should('contain.text','Razón social')
      cy.get('div').should('contain.text','Marcas asociadas')
      cy.get('div').should('contain.text','Estado BDC')
    });
    
    //En la pantalla "Instalaciones" pulsamos en el botón "Ir al detalle" de un registro de la tabla.
    it('step 6', () => {
      cy.get('svg[matTooltip="Ir al detalle"]').eq(0).click().wait(4000)
      cy.get('div[class="mat-tab-label-content"]').eq(2).click()
    });

    //En la pantalla "Instalaciones" pulsamos en el botón "Ir al detalle" de un registro de la tabla.
    it('Step 7', () => {
     cy.get('h5').should('contain.text','Lunes a Jueves')
     cy.get('h5').should('contain.text','Viernes')
     cy.get('h5').should('contain.text','Sábado')
     cy.get('div[class="d-none d-md-block col-md-4 text-center"]').should('contain.text','Mañana')
     cy.get('div[class="d-none d-md-block col-md-4 text-center"]').should('contain.text','Tarde')
     cy.get('input[formcontrolname="morningStart"]').should('be.visible')
     cy.get('input[formcontrolname="morningEnd"]').should('be.visible')
     cy.get('.btn__primary').should('be.visible')
    });
    
    it("logout", () => {
      masterLogin.logout()
    });
  })