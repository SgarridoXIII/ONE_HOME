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
import One from "../../../support/PageObject/One.cy"
const master=new One()

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

describe('QA-2421 - E2E_Calendario_CrearNuevaCita_CitaConCliente', () => {
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
  
  // Hacemos click en un día del mes
  it('step 4', () => {
    cy.contains('div','Día').click()
    cy.wait(1000)
    cy.get('div[class="cal-hour-segment cal-hour-start ng-star-inserted"]').eq(2).click().wait(3000)
  });
  
  // Hacemos click sobre el botón "Cita con cliente"
  it('step 5', () => {
    cy.get('body').then(el => {
      if(el.text().includes('Nueva')){
        cy.get('div[class="new-appointment"]').click()
        cy.wait(1000)
        cy.get('.btn__primary').contains('Cita con cliente').click()
        cy.wait(1000)
      }else{
        cy.get('.btn__primary').contains('Cita con cliente').click()
        cy.wait(1000)
      }
    })
  })

  // Rellenamos todos los campos necesarios y creamos la cita
  it('step 6', () => {
    master.citaestandarsinseleccionar()
    // cy.get(".mat-form-field-suffix > .mat-icon").click();
    // cy.wait(1000);

    // cy.get("mat-option").eq(0).click();
    // cy.wait(1000);
    // cy.get(".customer-card").eq(0).click();
    // cy.wait(1000);
    // cy.get(".col-12 > .btn__primary").click();
    // cy.wait(1000);

    // cy.get("svg.navigation__navs__next.ng-star-inserted").click();
    // cy.wait(1000);

    // cy.get("div.w-100 > .flex-wrap > :nth-child(3)").click();
    // cy.wait(1000);
    // cy.get(
    //   ":nth-child(5) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix"
    // ).as("add");
    // cy.get("@add").type("Test");
    // cy.wait(1000);
    // cy.get("form.ng-untouched > .btn__secondary").click();
    // cy.wait(1000);

    // cy.get(".mat-select-arrow").click();
    // cy.wait(1000);
    // cy.get(".mat-option").eq(1).click();
    // cy.wait(1000);
    // cy.get(".col-12 > .btn__primary").click();
    // cy.wait(1000);

    // cy.get(".mat-select-arrow").click();
    // cy.wait(1000);
    // cy.get(".mat-option").eq(1).click();
    // cy.wait(1000);
    // cy.get(".col-12 > .btn__primary").click();
    // cy.wait(1000);

    // cy.get(
    //   ".cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix"
    // ).as("time");
    // cy.get("@time").clear().type("1");
    // cy.wait(1000);
    // cy.get(".col-12 > .btn__primary").click();
    // cy.wait(1000);
    // cy.get("svg.navigation__navs__next.ng-star-inserted").click();
    // cy.wait(1000);

    // cy.get("svg.navigation__navs__next.ng-star-inserted").click();
    // cy.wait(1000);
    
    // cy.get('.btn__secondary.m-2.ng-star-inserted').eq(2).click()
    // cy.wait(1000);
    // cy.get('.btn__secondary.m-2.ng-star-inserted').eq(5).click()
    // cy.wait(1000);
    // cy.get('svg.navigation__navs__next.ng-star-inserted').click()
    // cy.wait(1000)

    // cy.get('input[data-placeholder="Selecciona un asesor..."]').click()
    // cy.wait(1000)
    // cy.get('mat-option').eq(0).click()
    // cy.wait(5000)
    // cy.get('h5.m-0.bold.pointer').click({ force: true })
    // cy.wait(3000)
    // cy.get('.mat-calendar-period-button').click()
    // cy.wait(1000)
    // cy.get('.mat-calendar-content').contains(year).click()
    // cy.wait(1000)
    // cy.get('.mat-calendar-content').contains(month).click()
    // cy.wait(1000)
    // cy.get('.mat-calendar-content').contains(dia).click()
    // cy.wait(1000)
    // cy.contains(hora[4]).click()
    // cy.wait(1000)
    // cy.get('.ng-untouched > .row > .col-12').should('be.ok')
    // cy.wait(1000)
    // cy.get('.navigation__navs > .btn__primary').click()
    // cy.wait(1000)
    
    // cy.get('.mat-snack-bar-container').should('be.ok')
    // cy.wait(1000)
    // cy.get('.mat-snack-bar-container').should('have.text', 'Cita creada correctamente')
    // cy.wait(1000)
  });
    
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
