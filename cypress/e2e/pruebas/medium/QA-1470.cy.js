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

describe('QA-1470 - Recepciones_Detalle del pedido_Multimedia_Eliminar imagen_Sí', () => {
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
  
  // Pulsamos sobre la flecha > de uno de los pedidos del listado
  it('step 4', () => {
    cy.get('mat-icon').should('have.text', 'close').click()
    cy.wait(1000)
    cy.get('one-card-appointment').eq(1).click()
    cy.wait(1000)
  });
  
  // Nos situamos en la pestaña Multimedia
  it('step 5', () => {
    cy.get('.sidebar__option__text').contains('Multimedia').click()
    cy.wait(1000)
    cy.get('one-extensions-cam-service').should('be.ok')
    cy.wait(1000)
  });
  
  // Pulsamos sobre una de las imágenes
  it('step 6', () => {
    cy.get('svg[class="mat-tooltip-trigger icon-photo ml-3 pointer"]').click()
    cy.wait(1000)
    cy.get('.fileInput').attachFile(photo)
    cy.wait(1000)
    cy.get('.p-0 > :nth-child(3) > .btn__primary').click()
    cy.wait(1000)
    cy.get('one-card-photo').eq(0).click()
    cy.wait(1000)
  });
  
  // Pulsamos Eliminar imagen
  it('step 7', () => {
    cy.get('.pr-3 > .btn__primary').click()
    cy.wait(1000)
  });
  
  // Pulsamos Sí
  it('step 8', () => {
    cy.get('.row > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.mat-snack-bar-container').should('be.ok')
    cy.wait(1000)
    cy.get('.mat-snack-bar-container').should('have.text', 'Información actualizada correctamente')
    cy.wait(1000)
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
