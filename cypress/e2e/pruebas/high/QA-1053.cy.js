Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1053 - Crear cita_Pestaña Confirmación', ()=>{
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

  // Accedemos a la pestaña Confirmación
  it('step 5', () => {
    cy.get('.btn__secondary.ng-star-inserted').contains('0311X - M. CONDE').click()
    cy.wait(1000)
    cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(5000).type('1111MMM{enter}')
    cy.wait(5000)
    cy.contains(' Audi A3 ').click({ force: true })
    cy.get('.customer-card').first().click()
    cy.get('.col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('#cdk-step-label-0-2').click()
    cy.wait(1000)
    cy.get('div.w-100 > .flex-wrap > :nth-child(7)').click()
    cy.wait(1000)
    cy.get('.col.d-flex.justify-content-between.align-items-center :nth-child(2)').click()
    cy.wait(1000)
    cy.get('#cdk-step-label-0-3').click()
    cy.wait(1000)
    cy.get('#cdk-step-label-0-4').click()
    cy.wait(1000)
    cy.xpath("(//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')])[1]").click().wait(2000)
    cy.xpath("//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')]").click().wait(2000)
    cy.get('#cdk-step-label-0-5').click()
    cy.wait(1000)
    cy.get('.ng-valid > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.wait(1000)
    cy.get('#mat-option-0').eq(0).click()
    cy.wait(5000)
    for(let i = 0; i < 1; i++){
      cy.get(".day-selector__next").click({force:true}).wait(3000)
    }
    cy.xpath("//div[@class='appointment-hours__hour ng-star-inserted']").first().click()
    cy.wait(1000)
    cy.xpath("//div[@class='appointment-hours__hour ng-star-inserted']").last().click()
    cy.wait(1000)
    cy.get('one-confirm-appointment.ng-star-inserted').should('be.ok')
    cy.wait(1000)
    cy.get('.my-4 > .bold').should('have.text', 'Resumen de la cita')
    cy.wait(1000)
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000) //Fin logout
  }) 
})
