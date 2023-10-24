Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-927 - Crear cita_Pestaña Vehículo_Seleccionar vehículo', ()=>{
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

  // Accedemos a la pestaña Vehículo
  it('step 5', () => {
    cy.get('.btn__secondary.ng-star-inserted').contains('0311X - M. CONDE').click()
    cy.wait(1000)
  });

  // Pulsamos sobre uno de los vehículos del listado
  it('step 6', () => {
    cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(5000).type('1111MMM{enter}')
    cy.wait(5000)
    cy.contains(' Audi A3 ').click({ force: true })
    cy.get('.customer-card').first().click()
    cy.get('.col-12 > .btn__primary').click()
    cy.wait(2500)

  });
  
  // Actualizamos la información, si procede, y pulsamos el botón Aceptar
  it('step 7', () => {
    cy.get('.navigation__navs__next.ng-star-inserted').click()
    cy.wait(1000)  
    cy.get('one-reason-appointment.ng-star-inserted > .align-items-start > div.w-100 > .mb-3 > .bold').as('title')
    cy.get('@title').should(el => {
      expect(el).to.contain('Motivo de la visita')
    })
    cy.wait(1000)  
  });

  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  }) 
})
