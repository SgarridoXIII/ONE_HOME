Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

describe('QA-1052 Crear cita_Pestaña Día y hora_Selecciona día y hora_Entrega', () => {
  
  before(() => {
    cy.task("generateOTP", "42SITBH2CBZTZDO3");
    cy.clearCookies()
    cy.clearLocalStorage()
  })
  
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

  it('step 3', () => {  //Pulsamos mas
    cy.get('svg.mat-menu-trigger:nth-child(3)').click()
  });

  it('Step 4',()=>{   //Pulsamos crear cita
    cy.contains(" Crear cita ").click()    
  })

  it('Step 5',()=>{   // Accedemos a pestaña dia y hora
    cy.xpath('//button[@class="btn__secondary ng-star-inserted"][contains(.,"0311X - M. CONDE")]').scrollIntoView().click()
    cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(1000).type('1111MMM{enter}')
    cy.wait(2000)
    cy.contains(' Audi A3 ').click({ force: true })
    cy.get('.customer-card').first().click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.wait(1000)
    cy.get(".navigation").click(1075, 75)
    cy.wait(1000)
    cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
    cy.get('div[class="mat-form-field-wrapper ng-tns-c114-27"]').scrollIntoView().type('test').wait(2000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
    cy.get('.mat-select-arrow').click().wait(2000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.get('.mat-select-arrow-wrapper').click().wait(3000)
    cy.contains(' Inspección y Mantenimiento ').click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
    cy.xpath("//button[contains(.,'Guardar')]").click()
    cy.get(".navigation").click(1075, 75)
    cy.get(".navigation").click(1075, 75)
    cy.xpath("(//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')])[1]").click()
    cy.xpath("//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')]").click()
    cy.get(".navigation").click(1075, 75)
  })

  it('Step 6',()=>{   //Realizamos busqueda asesor
    cy.get('.ng-valid > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type("Eduardo")
    cy.contains(' Eduardo Diaz Diaz ').click().wait(5000)   
    cy.get('div[class="col-12 appointment-hours d-flex flex-wrap"]').should("be.visible")
  })

  it('Step 7',()=>{   // Seleccionamos dia y hora
    cy.get('svg[class="day-selector__next"]').click().wait(2000)
    cy.xpath("//div[@class='appointment-hours__hour ng-star-inserted']").first().click().wait(3000)
  })

  it('Step 8',()=>{   //Seleccionamos otro asesor
    cy.xpath("//input[@placeholder='Selecciona un asesor...']").clear().type("Alberto")
    cy.contains("Alberto Chicote Pruebas").click()
  })

  it('Step 9',()=>{   //Seleccionamos dia y hora entrega
    cy.xpath("//div[@class='appointment-hours__hour ng-star-inserted']").last().click()
  })

  it("logout", () => {
    masterLogin.logout()
  });
})