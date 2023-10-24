Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import { clickOnAvailableSlot } from '../../../support/PageObject/Hooks';
const asesor = 'Alberto Chicote'
const photo = 'polo.png'
const fecha = new Date()
const dia = fecha.getDate()


describe('Test QA-899 - Crear cita a cliente existente en ONE', ()=>{
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

  // Rellenamos los campos correspondientes en cada una de las pestañas y pulsamos el botón "Confirmar cita".
  // NOTA: en la pestaña Cliente, seleccionamos un cliente con ficha en el buscador de cliente.
  it('step 5', () => {
    // Instalacion
    cy.xpath('//button[@class="btn__secondary ng-star-inserted"][contains(.,"0311X - M. CONDE")]').scrollIntoView().click()
    cy.wait(1000)
    cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(5000).type('1111MMM{enter}')
    // cy.get('#mat-input-3').type('1111MMM{enter}')
    cy.wait(5000)
    cy.contains(' Audi A3 ').click({ force: true })
    cy.get('.customer-card').first().click()
    cy.get('.col-12 > .btn__primary').click()
    cy.wait(2500)
    cy.get(".navigation").click(1075, 75)
    cy.wait(2500)

    cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
    cy.get(':nth-child(5) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('test').wait(8000)
    // cy.get('#mat-input-7').type('test').wait(8000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)

    //

    cy.get('.mat-select-arrow').click().wait(2000)
    // cy.get('#mat-option-28 > .mat-option-text').click().wait(1000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.get('.col-12 > .btn__primary').click()


    cy.get('.mat-select-arrow-wrapper').click().wait(3000)
    cy.contains(' Inspección y Mantenimiento ').click()
    cy.get('.col-12 > .btn__primary').click()
    cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
    cy.get('.col-12 > .btn__primary').click()
    cy.get(".navigation").click(1075, 75)
    cy.wait(1000)
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
    cy.get('.cdk-column-discount > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('50')
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
    cy.get(".navigation").click(1075, 75).wait(2000)

    //test
    cy.xpath("(//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')])[1]")
      .click().wait(2000)
    cy.xpath("//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')]")
      .click().wait(2000)

    cy.get(".navigation").click(1075, 75)
    cy.get('.ng-valid > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click()
    cy.contains('Cualquier asesor').click()
    cy.wait(8000)
    clickOnAvailableSlot()
    clickOnAvailableSlot('entrega')
    cy.get('.navigation__navs > .btn__primary').wait(3000).click()
    cy.wait(3000)

  });
  
  // Accedemos al calendario
  it('step 6', () => {
    cy.visit("/")
    cy.wait(3000)
    cy.get('.top-navigation-bar__options__navs > :nth-child(3)').click()
    cy.wait(1000)
    cy.get('.mat-icon').click()
    cy.reload()
    cy.wait(1000)
    cy.get('.cal-today').contains(dia).click()
    cy.wait(1000)
    cy.get('.cal-open-day-events').should('be.ok')
    cy.wait(1000)
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  }) 
})
