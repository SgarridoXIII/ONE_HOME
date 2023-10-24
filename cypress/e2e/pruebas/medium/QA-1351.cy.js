Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import { get } from 'lodash';
import One from '../../../support/PageObject/One.cy';
const asesor = "Alberto";
const video = 'test.mp4'
const photo = "polo.png";
const pdf = 'pdf.pdf'
const fecha = new Date();
const hora = ["13:30", "15:30", "16:30", "17:30", "18:30"];
const year = fecha.getFullYear();
const dia = fecha.getDate();
const monthNumber = fecha.getMonth();
const month = parserMonth();
let matricula = "9716LGS";
let cliente = 'Alberto'
const master = new One

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

describe('QA-1351 - Recepciones_Detalle del pedido_Checklist_Lunas', () => {
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
    master.citaestandar()
    cy.get(':nth-child(2) > .shortcut').click()
    cy.wait(1000)
    cy.get('one-your-work').should('be.ok')
    cy.wait(1000)
    cy.get('h3').should('have.text', 'Tu trabajo')
    cy.wait(1000)
  });
  
  // Pulsamos sobre la flecha > de uno de los pedidos del listado
  it('step 4', () => {
    cy.get('mat-icon').should('have.text', 'close').click()
    cy.wait(1000)
    cy.get('one-card-appointment').eq(1).click()
    cy.wait(1000)
  });
  
  // Nos situamos en la pestaña Check list
  it('step 5', () => {
    cy.get('.app-bar__title').should('have.text', 'Detalle pedido')
    cy.wait(1000)
    cy.get('mat-select[formcontrolname="serviceState"]').click()
    cy.wait(1000)
    cy.get('.mat-option-text').contains('Recepcionado').click()
    cy.wait(1000)
    cy.get('.btn__secondary').click()
    cy.wait(1000)
    cy.get('.sidebar__option__text').contains('Check list').click()
    cy.wait(1000)
  });
  
  // Pulsamos sobre la pestaña Lunas (aparece esta pestaña por defecto)
  it('step 6', () => {
    cy.get('div[class="checklistGroups"] :nth-child(1)').click()
    cy.wait(1000)
    cy.get('div[class="checklistGroups"] :nth-child(1)').should('include.text', 'Lunas')
    cy.wait(1000)
 });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
