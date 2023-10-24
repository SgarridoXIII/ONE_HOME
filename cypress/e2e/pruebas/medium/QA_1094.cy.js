Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

const primerNombre = 'Alberto'
const primerApellido = 'Recorcha'
const email = 'Albertico@gmail.com'
let nombreIncial = ''
let apellidoIncial = ''
let emailIncial = ''

describe('QA-1094 - Usuarios_Detalle usuario_Datos Usuario_Editar', () => {
  
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
    cy.get('.mat-menu-content ng-tns-c69-2').should('be.ok')
    cy.wait(1000)
  });

  //En las opciones del despliegue pulsamos la opción "Configuración"
  it('step 4', () => {
    cy.xpath("//div[@class='top-navigation-bar__options__navs__more-item ng-tns-c81-2 ng-star-inserted'][contains(.,'Configuración')]").click()
    cy.wait(1000)
    cy.get('h3').should('include.text','Configuración')
    cy.get('.ng-star-inserted').should('be.ok')
  });

  //Pulsamos el botón usuarios "Usuarios"
  it('step 5', () => {
    cy.get(':nth-child(4) > .shortcut').click() 
    cy.wait(1000)
    cy.get('h3').should('include.text','Usuarios')
    cy.get('.h-100 ng-tns-c76-1 ng-trigger ng-trigger-triggerName').should('be.ok')
  });

  //Sobre el listado de registros, pulsamos sobre la flecha >
  it('step 6', () => {
    cy.get('input[formcontrolname="search"]').type('David{enter}').wait(2000)
    cy.get('div[class="card-user__icon"]').eq(1).click().wait(2000)
    cy.get('container-fluid ng-tns-c89-1 pb-0').should('be.ok')
    cy.get('div').should('contain.text','Datos Usuario')
    cy.get('div').should('contain.text','Horario')
    cy.get('h6').should('contain.text','Datos personales')
    cy.get('h6').should('contain.text','Datos de trabajador')
    cy.get('input[formcontrolname="name"]').should('not.be.null')
    cy.get('input[formcontrolname="firstSurname"]').should('not.be.null')
    cy.get('input[formcontrolname="email"]').should('not.be.null')
    cy.get('input[formcontrolname="vaesanet"]').should('not.be.null')
  });

  //Editamos alguno de los campos de la pestaña Datos Usuario
  it('step 7', () => {
    cy.get('input[formcontrolname="name"]').then(e => {
        expect(e.val()).not.null
        nombreIncial = e.val()
        console.log('val',e.val())
    })
    cy.get('input[formcontrolname="firstSurname"]').then(e => {
        expect(e.val()).not.null
        apellidoIncial = e.val()
        console.log('val',e.val())
    })
    cy.get('input[formcontrolname="email"]').then(e => {
        expect(e.val()).not.null
        emailIncial = e.val()
        console.log('val',e.val())
    })
    cy.get('input[formcontrolname="name"]').clear().type(primerNombre)
    cy.get('input[formcontrolname="firstSurname"]').clear().type(primerApellido)
    cy.get('input[formcontrolname="email"]').clear().type(email)
    cy.wait(2000)
    cy.get('button[class="btn__primary w-100"]').click()
    cy.wait(2000)
  });
  
  //Comprobamos en el detalle del usuario, el/los campo/s modificado/s
  it('step 8', () => { 
    cy.get('svg[class="app-bar__back__icon"]').click()
    cy.wait(2000)
    cy.get('input[formcontrolname="search"]').type('Alberto{enter}').wait(2000) 
    cy.wait(2000)
    cy.get('div[class="card-user__icon"]').eq(0).click().wait(2000)
    cy.wait(2000)
    cy.get('input[formcontrolname="name"]').should('contain.value',primerNombre)
    cy.get('input[formcontrolname="firstSurname"]').should('contain.value',primerApellido)
    cy.get('input[formcontrolname="email"]').should('contain.value',email)
    cy.wait(1000)
    cy.get('input[formcontrolname="email"]').should('contain.value',email)
    cy.get('input[formcontrolname="name"]').clear().type(nombreIncial)  
    cy.get('input[formcontrolname="firstSurname"]').clear().type(apellidoIncial)
    cy.get('input[formcontrolname="email"]').clear().type(emailIncial)
    cy.wait(2000)
    cy.get('button[class="btn__primary w-100"]').click()
    cy.wait(2000)
    cy.get('svg[class="app-bar__back__icon"]').click()
  });
  
  it("logout", () => {
    masterLogin.logout()
  });
})