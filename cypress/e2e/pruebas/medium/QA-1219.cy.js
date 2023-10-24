Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import { get } from 'lodash';
import One from '../../../support/PageObject/One.cy';
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
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

describe('QA-1219 - Recepciones_Buscador_Seleccionar Vehículo', () => {
  // Accedemos a la pantalla "Home" de la aplicación ONE
  it("step 1", () => {
  // Accedemos a la URL de ONE - Volkswagen
    cy.visit("/")
    cy.wait(1000) 
  })
  
  // Introducimos usuario o email y contraseña y pulsamos Acceder.
  it('step 2', () => {
    masterLogin.login()
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
  
  // Pulsamos sobre el campo Vehículo
  it('step 4', () => {
    cy.get('input').eq(0).click()
    cy.wait(1000)
    cy.get('one-vehicle-selector').should('be.ok')
    cy.wait(1000)
    cy.get('one-vehicle-selector').find('h4').should('have.text', 'Seleccionar vehículo')
    cy.wait(1000)
  });
  
  // Seleccionamos un vehículo pulsando sobre la flecha >
  it('step 5', () => {
    cy.get('input[formcontrolname="search"]').clear().type(`${matricula}{enter}`)
    cy.wait(1000)
    cy.get('one-card-vehicle').eq(0).click()
    cy.wait(1000)
  });
  
  // Comprobamos que el listado es correcto
  it('step 6', () => {
    cy.get('input').eq(0).should('include.value', matricula)
    cy.wait(1000)
  });
  
  it("logout", () => {
    masterLogin.logout()
  })
})
  