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

describe('Test QA-1750 - Recepciones_Detalle del pedido_Información general_Iniciar recepción_Pestaña Día y Hora (Entrega)_Editar fecha entrega', () => {
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

  // Desde la pantalla "Home", pulsamos sobre el botón Recepciones
  it('step 3', () => {
    cy.get(':nth-child(2) > .shortcut').click()
    cy.wait(1000)
  });

  // Pulsamos sobre la flecha > de uno de los pedidos del listado
  it('step 4', () => {
    cy.get('mat-icon').should('have.text', 'close').click()
    cy.wait(1000)
    cy.get('one-card-appointment').eq(1).click()
    cy.wait(1000)
  });

  // Nos situamos en la pestaña Información General (por defecto aparece esta pestaña seleccionada)
  it('step 5', () => {
    cy.get('.mb-2').should('have.text', 'Información general')
    cy.wait(1000)
  });

  // Pulsamos el botón Iniciar recepción
  it('step 6', () => {
    cy.get('.btn__primary').click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
  });

  // En la pestaña Día y Hora (Entrega), comprobamos la información
  it('step 7', () => {
    cy.get('#cdk-step-label-0-1').click()
    cy.wait(1000)
    cy.get('#cdk-step-label-0-2').click()
    cy.wait(1000)
    cy.get('body').then(el => {
      if (el.text().includes('Pendiente de planificar')) {
        cy.get('.col-12 > .btn__secondary').click()
        cy.wait(1000)
        cy.get('.flex-auto > .alert-dms').click()
        cy.wait(1000)
        cy.get('#cdk-step-label-0-2').click()
        cy.wait(1000)
      } else {
        cy.wait(1000)
      }
    })
    cy.get('#cdk-step-label-0-3').click()
    cy.wait(1000)
    cy.get('one-advisor-slot-selector.ng-star-inserted > .ng-valid.ng-star-inserted').should('be.ok')
    cy.wait(1000)
  });

  // Editamos la fecha y hora de la entrega
  it('step 8', () => {
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
    // cy.contains(hora[4]).click()
    // cy.wait(1000)
    clickOnAvailableSlot()
    cy.get('.ng-untouched > .row > .col-12').should('be.ok')
    cy.wait(1000)
  });

  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
