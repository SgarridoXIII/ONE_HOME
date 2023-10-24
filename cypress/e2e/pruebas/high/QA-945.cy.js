Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-945 - Crear cita_Pestaña Motivo de la visita_Añadir otras intervenciones_Desplegable', ()=>{
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

  // Accedemos a la pestaña Motivo de la visita
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
  });
  
  // Seleccionamos un motivo
  it('step 6', () => {
    cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
    cy.wait(1000)
  });

  // Introducimos en el campo Añadir intervención, la intervención que deseamos y pulsamos Añadir
  it('step 7', () => {
    cy.get(':nth-child(5) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('test').wait(2000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000).wait(1000)
    cy.wait(1000)
  });
  
  // Desplegamos el combo pagador
  it('step 8', () => {
    cy.get('.mat-select-arrow').click().wait(2000)
    
  });
  
  // Seleccionamos un valor y pulsamos Aceptar
  it('step 9', () => {
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.get('.col-12 > .btn__primary').click()
    cy.wait(1000)
  });
  
  //Desplegamos el combo Tipo de intervención
  it('step 10', () => {
    cy.get('.mat-select-arrow').click()
    cy.wait(1000)
    cy.get('.mat-option').should(el => {
      expect(el).to.have.length(13)
      expect(el.eq(0)).to.contain('Inspección y Mantenimiento')
      expect(el.eq(1)).to.contain('Diagnosis')
      expect(el.eq(2)).to.contain('Medida de Servicio')
      expect(el.eq(3)).to.contain('Electrónica de Confort')
      expect(el.eq(4)).to.contain('Motores')
      expect(el.eq(5)).to.contain('Transmisión de fuerza')
      expect(el.eq(6)).to.contain('Tren de rodaje')
      expect(el.eq(7)).to.contain('Climatización')
      expect(el.eq(8)).to.contain('Chapa y Pintura')
      expect(el.eq(9)).to.contain('Neumáticos')
      expect(el.eq(10)).to.contain('Peritación')
      expect(el.eq(11)).to.contain('Batería Alto Voltaje')
      expect(el.eq(12)).to.contain('Servicio de Preentrega')
    })
  });
  
   
})
