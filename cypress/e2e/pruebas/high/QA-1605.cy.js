Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import { clickOnAvailableSlot } from '../../../support/PageObject/Hooks';
const asesor = 'Alberto Chicote'
const photo = 'polo.png'
const fecha = new Date()
const hora = ['13:30', '15:30', '16:30', '17:30', '18:30']
const year = fecha.getFullYear()
const dia = fecha.getDate()
const monthNumber = fecha.getMonth()
const month = parserMonth()
let matricula = ''

function parserMonth() {
  switch (monthNumber) {
    case 0:
        return 'ENE'
    case 1:
       return 'FEB'
    case 2:
       return 'MAR'
    case 3:
       return 'ABR'
    case 4:
       return 'MAY'
    case 5:
       return 'JUN'
    case 6:
       return 'JUL'
    case 7:
       return 'AGO'
    case 8:
       return 'SEP'
    case 9:
       return 'OCT'
    case 10:
       return 'NOV'
  
    default:
       return 'DIC'

  }
}

describe('Test QA-1605 - E2E_Recepciones_Detalle del pedido_Iniciar recepción_Día y hora (Entrega)_Finalizar', ()=>{
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
  
  // Desde la home, pulsamos sobre Crear cita
  it('step 3', () => {
    cy.get(':nth-child(1) > .shortcut').click()
    cy.wait(1000)
  });

  // Creamos una cita completa 
  it('step 4', () => {
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
    cy.get(':nth-child(5) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('test').wait(2000)
    // cy.get('#mat-input-7').type('test').wait(8000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000).wait(1000)

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
        .click().wait(1000)
    cy.xpath("//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')]")
        .click().wait(1000)

    cy.get(".navigation").click(1075, 75)
    cy.get('.ng-valid > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click()
    cy.contains('Cualquier asesor').click()
    cy.wait(8000)
    clickOnAvailableSlot()
    clickOnAvailableSlot('entrega')
    cy.get('.navigation__navs > .btn__primary').wait(3000).click()
    cy.wait(2000)
    //Fin crear cita
  });

  // Desde la Home, pulsamos sobre el botón Recepciones
  it('step 5', () => {
    cy.visit("/")
    cy.wait(1000)
    cy.get(':nth-child(2) > .shortcut').click()
    cy.wait(1000)
  });

  // Pulsamos sobre la flecha > del registro de recepción de nuestra cita
  it('step 6', () => {
    cy.xpath("//span[@class='mat-button-wrapper'][contains(.,'close')]").click()
    cy.wait(3000)
    cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator > .mat-button-wrapper > .mat-datepicker-toggle-default-icon').click()
    cy.wait(5000)
    cy.get('.mat-calendar-body-today').click()
    cy.get('.mat-calendar-body-today').click()
    cy.wait(8000)
    cy.get('.card-appointment__content__appointment-info').last().click()
    cy.wait(3000)
  });
  
  // Rellenamos todas las pestañas correctamente y pulsamos el botón Iniciar recepción
  it('step 7', () => {
    cy.get('.btn__primary').click()
    cy.wait(1000)
  });
  
  // Actualizamos si procede, los kilómetros y pulsamos Aceptar
  it('step 8', () => {
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
  });

  // En la pestaña Día y hora (Entrega),  editamos día y hora de la entrega
  it('step 9', () => {
    cy.get('svg.navigation__navs__next.ng-star-inserted').click()
    cy.wait(1000)

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

    cy.get('svg.navigation__navs__next.ng-star-inserted').click()
    cy.wait(1000)

    cy.get('input[placeholder="Selecciona un asesor..."]').click()
    cy.wait(1000)
    cy.get('mat-option').eq(0).click()
    cy.wait(5000)
    cy.get('h5.m-0.bold.pointer').click({ force: true })
    cy.wait(3000)
    cy.get('.mat-calendar-period-button').click()
    cy.wait(1000)
    cy.get('.mat-calendar-content').contains(year).click()
    cy.wait(1000)
    cy.get('.mat-calendar-content').contains(month).click()
    cy.wait(1000)
    cy.get('.mat-calendar-content').contains(dia).click()
    cy.wait(1000)
    // cy.contains(hora[2]).click()
    // cy.wait(1000)
    clickOnAvailableSlot()
  });
  
  // Pulsamos el botón Finalizar
  it('step 10', () => {
    cy.get('#cdk-step-label-0-4').click()
    cy.wait(1000)
    cy.get('.ng-untouched > .row > .col-12').should('be.ok')
    cy.wait(1000)
    cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50, {force: true})
    cy.wait(1000)
    cy.get('.row > :nth-child(2) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50, {force: true})
    cy.wait(1000)
    cy.get('.navigation__finish > .btn__primary').click()
    cy.wait(1000)
  });
  
  // Comprobamos que ha llegado un email
  it('step 11', () => {
    cy.get('mat-select[formcontrolname="serviceState"]').then(e => {
      expect(e.text()).to.equals('Recepcionado')
      cy.wait(1000)
    })
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })    
})