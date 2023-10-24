Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = "Alberto Chicote";
const photo = "polo.png";
const fecha = new Date();
const hora = ["13:30", "15:30", "16:30", "17:30", "18:30"];
const year = fecha.getFullYear();
const dia = fecha.getDate();
const monthNumber = fecha.getMonth();
const month = parserMonth();
let matricula = "";

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

describe('QA-2424 - Calendario_CrearNuevaCita_ConCitas_VistaRapida', () => {
  // Accedemos a la pantalla "Home" de la aplicación ONE
  before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {
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
  
  // Desde la pantalla  principal "Home", pulsamos en el botón "Calendario" en la barra superior de la página
  it('step 3', () => {
    cy.get('.top-navigation-bar__options__navs > :nth-child(3)').click()
    cy.wait(1000)
  });
  
  // Hacemos click en un día del mes teniendo seleccionado un usuario en el campo "Usuario"
  it('step 4', () => {
    cy.get('.cal-day-number').contains(dia).click()
    cy.wait(1000)
    cy.get('body').then(el => {
      if(el.text().includes('Nueva')){
        cy.get('div[class="new-appointment"]').click()
        cy.wait(1000)
        cy.get('.btn__primary').contains('Evento personal').click()
        cy.wait(1000)
        cy.get('input[formcontrolname="name"]').type('Test Evento personal')
        cy.wait(1000)
        cy.get('textarea[formcontrolname="description"]').type('Test automation')
        cy.wait(1000)
        cy.get('div[class="mat-checkbox-inner-container"]').click()
        cy.wait(1000)
        cy.get('.mat-datepicker-toggle-default-icon').eq(1).click()
        cy.wait(1000)
        cy.get('.mat-calendar-content').contains(dia).click()
        cy.wait(1000)
        cy.get('.btn__primary').click()
        cy.wait(1000)
        cy.get('.cal-day-number').contains(dia).click()
        cy.wait(1000)
      }else{
        cy.get('.btn__primary').contains('Evento personal').click()
        cy.wait(1000)
        cy.get('input[formcontrolname="name"]').type('Test Evento personal')
        cy.wait(1000)
        cy.get('textarea[formcontrolname="description"]').type('Test automation')
        cy.wait(1000)
        cy.get('div[class="mat-checkbox-inner-container"]').click()
        cy.wait(1000)
        cy.get('.mat-datepicker-toggle-default-icon').eq(1).click()
        cy.wait(1000)
        cy.get('.mat-calendar-content').contains(dia).click()
        cy.wait(1000)
        cy.get('.btn__primary').click()
        cy.wait(1000)
      }
    }) 
  });
  
  // Hacemos click sobre una de las citas
  it('step 5', () => {
    cy.get('.cal-day-number').contains(dia).click()
    cy.wait(1000)
    cy.get('mwl-calendar-event-title').eq(0).click()
    cy.wait(1000)
  });
  
  // Hacemos click en el botón "Ir al detalle"
  it('step 6', () => {
    cy.get('.btn__primary').eq(0).should('have.text', ' Ir al detalle ').click()
    cy.wait(1000)
  });
  
  // Pulsamos en el botón "Volver"
  it('step 7', () => {
    cy.get('one-dialog-structure').should('be.ok')
    cy.wait(1000)
    cy.get('h4').should('have.text', 'Detalle evento personal')
    cy.wait(1000)
    cy.get('svg[class="icon ng-star-inserted"]').click()
    cy.wait(1000)
    cy.get('one-my-calendar').should('be.ok')
    cy.wait(1000)
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
