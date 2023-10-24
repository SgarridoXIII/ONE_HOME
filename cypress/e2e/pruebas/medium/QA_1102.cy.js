Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login


describe('QA-1102 - Roles y permisos_Editar_Valores Permisos del sistema', () => {
  
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

  //En la pantalla "Configuración" pulsamos en el botón "Roles y permisos".
  it('step 5', () => {
    cy.contains('div','Roles y permisos').click()
    cy.wait(1000)
    cy.get('h3').should('contain.text','Roles y permisos')
    cy.get('mat-header-cell').should('contain.text','Rol')
    cy.get('mat-header-cell').should('contain.text','Acciones')
    cy.get('mat-cell').should('contain.text','Administrador')
    cy.get('mat-cell').should('contain.text','Asesor')
    cy.get('mat-cell').should('contain.text','Gestor de precios')
    cy.get('mat-cell').should('contain.text','Mantenimiento de calculadoras')
    cy.get('mat-cell').should('contain.text','Agente de contact center')
  });

  //Pulsamos el botón 'Editar'
  it('step 6', () => {
    cy.get('svg[matTooltip="Consultar"]').eq(1).click()
    cy.wait(1000)
    cy.get('.ng-untouched.ng-star-inserted').should('be.visible')
    cy.get('h5').should('contain.text','Edición de Rol')
    cy.get('h6').should('contain.text','Permisos del sistema')
    cy.get('h6').should('contain.text','Permisos asignados')
  });
  
  //Nos situamos en el listado de permisos del sistema
  it('step 7', () => {
    cy.get('p[class="m-0"]').should('contain.text','Acceso básico a ONE')
    cy.get('p[class="m-0"]').should('contain.text','Gestión de usuarios')
    cy.get('p[class="m-0"]').should('contain.text','Gestión del calendario')
    cy.get('p[class="m-0"]').should('contain.text','Gestión del dashboard')
    cy.get('p[class="m-0"]').should('contain.text','Role management')
    cy.get('p[class="m-0"]').should('contain.text','Gestión de clientes')
    cy.get('p[class="m-0"]').should('contain.text','Gestión de vehículos')
    cy.get('p[class="m-0"]').should('contain.text','Gestión de ORs')
    cy.get('p[class="m-0"]').should('contain.text','Gestión de citas')
    cy.get('p[class="m-0"]').should('contain.text','Gestión de instalaciones')
    cy.get('p[class="m-0"]').should('contain.text','Gestión del perfil')
    cy.get('p[class="m-0"]').should('contain.text','Gestión de precios')
    cy.get('p[class="m-0"]').should('contain.text','Gestión de configuración')
    cy.get('p[class="m-0"]').should('contain.text','READ')
    cy.get('p[class="m-0"]').should('contain.text','WRITE')
    cy.get('p[class="m-0"]').should('contain.text','Gestión de eventos personales')
});
   
  it("logout", () => {
    masterLogin.logout()
  });
})