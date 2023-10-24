Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-893 - Crear vehículo_obligatoriedad campos_DNI/NIF/NIE/CIE',()=>{
  // Accedemos a la URL de ONE - Volkswagen
  before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {
    cy.visit("/")
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
  
  // Pulsamos en la opción "Crear vehículo".
  it('step 4', () => {
    cy.contains(' Crear vehículo ').click()
    //cy.contains(' Crear vehículo ').click()
    cy.wait(1000)
  });

  // Completamos los campos del formulario menos el campo "DNI/NIF/NIE/CIE", y pulsamos en el botón "Crear vehículo".
  it('step 5', () => {
    cy.get(':nth-child(1) > :nth-child(3) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').as('matricula')
    cy.get('@matricula').type('8TESTZ')
    cy.get(':nth-child(10) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('100')
    cy.wait(10000)
    cy.get('#mat-select-0 > .mat-select-trigger > .mat-select-arrow-wrapper > .mat-select-arrow').click()
    cy.wait(3000)
    cy.get('mat-option').contains('Audi').click({ force:true })
    cy.wait(3000)
    cy.get('#mat-input-10').click()
    cy.wait(1000)
    cy.contains('A3').click({ force:true })
    cy.wait(1000)
    cy.get('#mat-input-11').click()
    cy.wait(1000)
    cy.contains('A3').click()
    cy.wait(1000)
    cy.get('#mat-input-16').click().clear().type('Sergio{enter}')
    cy.wait(10000)
    cy.contains('Sergio').click()
    cy.wait(3000)
    cy.get('#mat-select-1 > .mat-select-trigger > .mat-select-arrow-wrapper').click({ force: true })
    cy.wait(5000)
    cy.get('#mat-option-107 > .mat-option-text').click({ force: true })
    cy.get('#mat-option-108 > .mat-option-text').click({ force: true })
    cy.get('#mat-option-109 > .mat-option-text').click({ force: true })
    cy.wait(1000)
    cy.get('.cdk-overlay-backdrop').click()    
    cy.wait(1000)
    cy.get('svg.mat-tooltip-trigger.customer__relation__icon.ng-star-inserted').eq(0).click()
    cy.wait(1000)
    cy.get('.col-md-12 > .row > :nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').as('dni')
    cy.get('@dni').should('be.ok')
    cy.wait(1000)
    cy.get('.btn__primary').should('be.enabled')
    cy.wait(1000)
  });

  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  }) 
})