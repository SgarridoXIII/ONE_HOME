Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
/// <reference types="cypress" />
require("cypress-plugin-tab");
require("cypress-xpath");
import "cypress-file-upload";
const asesor = "Alberto Chicote";
const photo = "polo.png";
const fecha = new Date();
const hora = ["13:30", "15:30", "16:30", "17:30", "18:30","09:30"];
const year = fecha.getFullYear();
const dia = fecha.getDate();
const monthNumber = fecha.getMonth();
const month = parserMonth();
let matricula = "";
import One from "../../../support/PageObject/One.cy"
const master=new One()
import { clickOnAvailableSlot }  from "../../../support/PageObject/Hooks"

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
  const characters = "0123456789";
  return Array.from(
    { length: 7 },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
}

describe("QA-2440 - Gestionar diferidos_Detalle de un diferido_Pestaña Datos diferido_Crear cita", () => {
  // Accedemos a la pantalla "Home" de la aplicación ONE
  before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {
    // Accedemos a la URL de ONE - Volkswagen
    cy.visit("/");
    cy.wait(1000);
  });

  // Introducimos usuario o email y contraseña y pulsamos Acceder.
  it("step 2", () => {
    cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
        cy.wait(2000) //Fin login
  });

  // Desde la pantalla  principal "Home", pulsamos en el botón "Gestionar diferidos"
  it("step 3", () => {
    cy.get(":nth-child(8) > .shortcut").click();
    cy.wait(1000);
  });

  // Hacemos click sobre uno de los registros
  it("step 4", () => {
    cy.get("one-card-package-deferred").eq(0).click();
    cy.wait(1000);
  });

  // Nos situamos en la pestaña Datos diferido
  it("step 5", () => {
    cy.get(".mat-tab-label-content")
      .eq(0)
      .should("have.text", "Datos diferido");
    cy.wait(1000);
  });

  // Pulsamos el botón Crear cita
  it("step 6", () => {
    cy.get(".btn__secondary").contains("Crear cita").click();
    cy.wait(1000);
  });

  // Rellenamos el resto de pestañas y pulsamos Confirmar cita
  it("step 7", () => {

    cy.get(".navigation").click(1075, 75).wait(2000)

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

    cy.get('input[formcontrolname="license"]').then(e => {
      expect(e.val()).not.null
      matricula = e.val()
      console.log('val',e.val())
    })
    cy.wait(1000)
  });
  
  // Comprobamos que se han creado dos registros: uno de recepción y otro de entrega de la cita
  it('step 8', () => {
    cy.visit("/");
    cy.wait(1000)
    cy.get('.top-navigation-bar__options__navs > :nth-child(2)').click()
    cy.wait(1000)
    cy.get('mat-icon').should('have.text', 'close').click()
    cy.wait(1000)
    cy.get('.mat-form-field-autofill-control').eq(0).click()
    cy.wait(1000)
    cy.get('input[formcontrolname="search"]').type(matricula)
    cy.wait(3000)
    cy.get('.card-vehicle__content').eq(0).click()
    cy.wait(1000)
    cy.get('button[aria-label="Open calendar"]').eq(1).click()
    cy.wait(1000)
    cy.get('.mat-calendar-content').contains(month).click()
    cy.wait(1000)
    cy.get('.mat-calendar-content').contains(dia).click()
    cy.wait(1000)
    cy.get('.mat-tab-label-content').eq(1).should('have.text', 'Recepciones').click()
    cy.wait(1000)
    cy.get('one-card-appointment').should('be.ok')
    cy.wait(1000)
    cy.get('.mat-tab-label-content').eq(2).should('have.text', 'Entregas').click()
    cy.wait(1000)
    cy.get('one-card-appointment').should('be.ok')
    cy.wait(1000)
  });
  
  it("logout", () => {
    cy.visit("/");
    cy.get(".top-navigation-bar__actions > .userIcon").click();
    cy.get(".mat-menu-content > :nth-child(2)").click();
    cy.wait(1000);
  });
});
