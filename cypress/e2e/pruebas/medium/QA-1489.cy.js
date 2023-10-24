Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = "Alberto";
const photo = "polo.png";
const fecha = new Date();
const hora = ["13:30", "15:30", "16:30", "17:30", "18:30"];
const year = fecha.getFullYear();
const dia = fecha.getDate();
const monthNumber = fecha.getMonth();
const month = parserMonth();
let matricula = "9716LGS";
let cliente = 'Alberto'

function parserMonth() {
  switch (monthNumber) {
    case 0:
      return "ENE";
    case 1:
      return "FEB";
    case 2:
      return "MAR";
    case 3:
      return "ABR";
    case 4:
      return "MAY";
    case 5:
      return "JUN";
    case 6:
      return "JUL";
    case 7:
      return "AGO";
    case 8:
      return "SEP";
    case 9:
      return "OCT";
    case 10:
      return "NOV";

    default:
      return "DIC";
  }
}

function generateRandomNumber() {
  const characters = '0123456789';
  return Array.from({length: 7}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

describe('QA-1489 - Recepciones_Detalle del pedido_Ampliaciones/CAM_Ampliaciones pedido_Enviar ampliación pedido (sin vídeo)_Confirmar', () => {
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
  })
  
  // Introducimos usuario o email y contraseña y pulsamos Acceder.
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
    cy.get('one-your-work').should('be.ok')
    cy.wait(1000)
    cy.get('h3').should('have.text', 'Tu trabajo')
    cy.wait(1000)
  });
  
  // Pulsamos sobre la flecha > de uno de los pedidos del listado en estado recepcionado (ya se ha iniciado la recepción)
  it('step 4', () => {
    cy.get('mat-icon').should('have.text', 'close').click()
    cy.wait(1000)
     cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(5000)
    cy.get(".card-vehicle__content").first().click()
    cy.contains(" Sergio Garrido Benitez ").first().click()
    cy.get('.app-bar__title').should('have.text', 'Detalle pedido')
    cy.wait(1000)
    cy.get('mat-select[formcontrolname="serviceState"]').click()
    cy.wait(1000)
    cy.get('.mat-option-text').contains('Recepcionado').click()
    cy.wait(1000)
    cy.get('.btn__secondary').click()
    cy.wait(1000)
  });
  
  // Nos situamos en la pestaña Ampliaciones/CAM
  it('step 5', () => {
    cy.get('.sidebar__option__text').contains('Ampliaciones/CAM').click()
    cy.wait(1000)
    cy.get('one-extensions-cam-service').should('be.ok')
    cy.wait(1000)
  });
  
  // Desde la pestaña Ampliaciones pedido, pulsamos el 
  // botón Enviar ampliación pedido (deben existir ampliaciones 
  // en estado Pdte comunicación cliente y el selector Mostrar vídeo en
  // Ampliación pedido (al pulsar sobre un vídeo añadido en la pestaña) debe estar deshabilitado.)
  it('step 6', () => {
    cy.get('.mat-tab-label-content').contains('Ampliaciones pedido').click()
    cy.wait(1000)

    cy.get('.btn__secondary').contains('Añadir intervención').click()
    cy.wait(1000)

    cy.get('input[formcontrolname="createPackage"]').type(`test${generateRandomNumber()}`)
    cy.wait(1000)
    cy.get('.mb-3').eq(0).click()
    cy.wait(1000)
    cy.get('mat-select[formcontrolname="payerType"]').click()
    cy.wait(1000)
    cy.get('mat-option').eq(0).click()
    cy.wait(1000)
    cy.get('.btn__primary').contains('Aceptar').click()
    cy.wait(1000)
    
    cy.get('mat-select[formcontrolname="taskType"]').click()
    cy.wait(1000)
    cy.get('mat-option').eq(1).click()
    cy.wait(1000)
    cy.get('.btn__primary').contains('Aceptar').click()
    cy.wait(1000)

    cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').as('time')
    cy.get('@time').clear().type('1')
    cy.wait(1000)
    cy.get('.btn__primary').contains('Guardar').click()
    cy.wait(1000)
    
    cy.get('div[class="col d-flex justify-content-end"]').find('button[class="btn__secondary mr-2"]').click()
    cy.wait(1000)
    cy.get('mat-dialog-container').should('be.ok')
    cy.wait(1000)
    cy.get('h4').should('have.text', 'Enviar amplicación de pedido')
    cy.wait(1000)
  });
  
  // Pulsamos Confirmar
  it('step 7', () => {
    cy.get('mat-dialog-container').find('button[type="button"]').click()
    cy.wait(1000)
    cy.get('.mat-snack-bar-container').should('be.ok')
    cy.wait(1000)
    cy.get('.mat-snack-bar-container').should('have.text', 'Email de ampliación CAM enviado al cliente')
    cy.wait(1000)
  });

  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
