Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import { clickOnAvailableSlot } from '../../../support/PageObject/Hooks';
const asesor = 'Alberto Chicote'
const photo = 'polo.png'
let orden = ''
const fecha = new Date()
const hora = ['13:30', '15:30', '16:30', '17:30', '18:30']
const dia = fecha.getDate()

describe('Test QA-2904 -  ONE - Iniciar recepción', ()=>{
  // Accedemos a la pantalla "Home" de la aplicación ONE
  before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {
    cy.visit("/")
    cy.wait(1000) 
    cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
    cy.wait(1000)
  })
  
  // Pulsamos en el botón "Tablero" 
  it('step 2', () => {
    cy.get('.top-navigation-bar__options__navs > :nth-child(4)').click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click()
    cy.wait(1000)
  });
  
  // Desde la pantalla Tablero, seleccionamos una cita.
  it('step 3', () => {
    // cy.get(':nth-child(1) > .board__column__content > :nth-child(1)').click()
    // cy.wait(1000)
    // cy.get('input[formcontrolname="serviceNumber"]').then(e => {
    //   orden = e.val()
    // })
    // cy.wait(1000)
    cy.get('one-board-column').eq(0).find('one-board-card').eq(0).click()
    cy.wait(1000)
  });
  
  // Pulsamos en el botón "Iniciar Recepción".
  it('step 4', () => {
    cy.get('.btn__primary').click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
  });
  
  // Desde la sección "Estado vehículo" subimos diferentes archivos de imágenes y videos.
  it('step 5', () => {
    cy.get(':nth-child(2) > .damages__add-damage').click()
    cy.wait(1000)
    cy.get('.fileInput').attachFile(photo)
    cy.wait(1000)
    cy.get(':nth-child(4) > .btn__primary').click()
    cy.wait(1000)
  });
  
  // Desde la sección "Intervenciones" agregamos una intervención manual, y una intervención del paquete PPSO
  it('step 6', () => {
    cy.get('#cdk-step-label-0-1').click()
    cy.wait(1000)
    cy.get('.flex-auto > .btn__primary').click()
    cy.wait(1000)
    cy.get(':nth-child(6) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').type('test')
    cy.wait(1000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").click()
    cy.wait(1000)
    cy.get('.mat-select-arrow').click()
    cy.wait(1000)
    cy.get('mat-option').eq(0).click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.mat-select-arrow').click()
    cy.wait(1000)
    cy.get('mat-option').eq(1).click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').as('time')
    cy.get('@time').clear().type('1')
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
  });
  
  // Desde la sección "Checklist" rellenamos algunos de los puntos de la checklist.
  it('step 7', () => {
    cy.get('#cdk-step-label-0-2').click()
    cy.wait(1000)
    cy.get('body').then(el => {
      if(el.text().includes('Pendiente de planificar')){
        cy.get('.col-12 > .btn__secondary').click()
        cy.wait(1000)
        cy.get('.flex-auto > .alert-dms').click()
        cy.wait(1000)
        cy.get('#cdk-step-label-0-2').click()
        cy.wait(1000)
      }else{
        cy.wait(1000)
      }
    }) 
    cy.get('.checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click({ multiple: true })
    cy.wait(1000)
    cy.get('.checklistGroups > :nth-child(2)').click()
    cy.wait(1000)
    cy.get('.checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click({ multiple: true })
    cy.wait(1000)
    cy.get('.checklistGroups > :nth-child(3)').click()
    cy.wait(1000)
    cy.get('.checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click({ multiple: true })
    cy.wait(1000)
    cy.get('.checklistGroups > :nth-child(4)').click()
    cy.wait(1000)
    cy.get('.checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click({ multiple: true })
    cy.wait(1000)
    cy.get('.checklistGroups > :nth-child(5)').click()
    cy.wait(1000)
    cy.get('.checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click({ multiple: true })
    cy.wait(1000)
    cy.get('.checklistGroups > :nth-child(6)').click()
    cy.wait(1000)
    cy.get('.checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click({ multiple: true })
    cy.wait(1000)
  });
  
  // Desde la sección "Dia y Hora (Entrega)", seleccionamos una fecha y hora con el asesor que deseamos.
  it('step 8', () => {
    cy.get('#cdk-step-label-0-3').click()
    cy.wait(1000)
    cy.get('input[placeholder="Selecciona un asesor..."]').click()
    cy.wait(1000)
    cy.get('mat-option').eq(0).click()
    cy.wait(1000)
    clickOnAvailableSlot()
    clickOnAvailableSlot('entrega')
    // cy.get('h5.m-0.bold.pointer').click({ force: true })
    // cy.wait(3000)
    // cy.get('.mat-calendar-content').contains(dia).click()
    // cy.wait(1000)
    // cy.contains(hora[1]).click()
    // cy.wait(1000)
  });
  
  // Accedemos a la pantalla "Resumen" y podemos visualizar todos los datos de la recepción que vamos a realizar.
  it('step 9', () => {
    cy.get('#cdk-step-label-0-4').click()
    cy.wait(1000)
    cy.get('.mat-horizontal-content-container').should('be.ok')
    cy.wait(1000)
  });
  
  // Pulsamos en el botón "Iniciar recepción"
  it('step 10', () => {
    cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50, {force: true})
    cy.get('.row > :nth-child(2) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50, {force: true})
    cy.get('.navigation__finish > .btn__primary').click()
    cy.wait(1000)
    cy.get('mat-select[formcontrolname="serviceState"]').then(e => {
      expect(e.text()).to.equals('Recepcionado')
      cy.wait(1000)
    })
    cy.get('svg.app-bar__back__icon').click()
    cy.wait(1000)
    cy.get(':nth-child(4) > .board__column__content').should(e => {
      expect(e).to.contain(orden)
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
