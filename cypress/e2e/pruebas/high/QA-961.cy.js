Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-961 Crear cita_Pestaña Intervenciones_Añadir nuevas intervenciones_Añadir otras intervenciones', ()=>{

  after(()=>{
    cy.visit('http://one-pre.kube.vged.es/home')
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000) //Fin logout
  })


  // Accedemos a la URL de ONE - Volkswagen
  before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {
    cy.visit("/",)
    cy.wait(1000) 
  })

  // Introducimos usuario o email y contraseña y pulsamos Acceder
  it('step 2', () => {
    cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
    cy.wait(1000)
  });

  // Desde la pantalla "Home", pulsamos sobre el botón +
  it('step 3', () => {
    cy.get('svg.mat-menu-trigger.top-navigation-bar__actions__icon').click()
    cy.wait(1000)
  });
  
    // Pulsamos en la opción "Crear cita"
  it('step 4', () => {
    cy.get('.mat-menu-content > :nth-child(1)').click()
    cy.wait(1000)
  });

  // Accedemos a la pestaña Intervenciones
  it('step 5', () => {
    cy.get('.btn__secondary.ng-star-inserted').contains('0311X - M. CONDE').click()
    cy.wait(1000)
    cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(5000).type('1111MMM{enter}')
    cy.wait(5000)
    cy.contains(' Audi A3 ').click({ force: true })
    cy.get('.customer-card').first().click()
    cy.get('.col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.navigation__navs__next.ng-star-inserted').click()
    cy.wait(1000)
    cy.get('.navigation__navs__next.ng-star-inserted').click()
    cy.wait(1000)
    cy.get('div.w-100 > .flex-wrap > :nth-child(7)').click()
    cy.wait(1000)
    cy.get('.col.d-flex.justify-content-between.align-items-center :nth-child(2)').as('salir')
    cy.get('@salir').click()
    cy.wait(1000)
    cy.get('.navigation__navs__next.ng-star-inserted').click()
    cy.wait(1000)
  });
  
  // Pulsamos el botón Añadir nuevas intervenciones
  it('step 6', () => {
    cy.get(':nth-child(2) > .align-items-center > .btn__primary').click()
    cy.wait(1000)
  });
  
  // Introducimos en el campo Añadir intervención, la intervención que deseamos y pulsamos Añadir
  it('step 7', () => {
    cy.get(':nth-child(5) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').as('add')
    cy.get('@add').type('Test')
    cy.wait(1000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").click()
    cy.wait(1000)    
  });
  
  // Seleccionamos un valor y pulsamos Aceptar
  it('step 8', () => {
    cy.get('.mat-select-arrow').click()
    cy.wait(1000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.wait(1000)
    cy.get('.col-12 > .btn__primary').click()
    cy.wait(1000)
  });

  // Seleccionamos un valor en tipo de intervención y pulsamos Aceptar
  it('step 9', () => {
    cy.get('.mat-select-arrow').click()
    cy.wait(1000)
    cy.contains('Motores').click()
    cy.wait(1000)
    cy.get('.col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').as('time')
    cy.get('@time').clear().type(1)
    cy.wait(1000)
    cy.get('.col-12 > .btn__primary').click()
    cy.wait(1000)
  });
  
  // En la pestaña, comprobamos que se ha añadido la intervención correctamente
  it('step 10', () => {
    cy.get('#mat-expansion-panel-header-0').should("be.ok");
    cy.wait(1000)
  });

  // it("logout", () => {
  //   cy.visit("/")
  //   cy.get('.top-navigation-bar__actions > .userIcon').click()
  //   cy.get('.mat-menu-content > :nth-child(2)').click()
  //   cy.wait(1000) //Fin logout
  // }) 
})
