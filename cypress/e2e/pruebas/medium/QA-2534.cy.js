Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const photo = 'polo.png'
const fecha = new Date()
const dia = fecha.getDate()

function generateRandomNumber() {
  const characters = '0123456789';
  return Array.from({length: 7}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

describe('QA-2534 - Calendario_Crear evento personal', () => {
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
    cy.get('.scroll-area > .col').contains(dia).click()
    cy.wait(1000)
  });

  // Pulsamos Evento personal 
  it('step 5', () => {
    cy.get('body').then(el => {
      if(el.text().includes('Nueva')){
        cy.get('div[class="new-appointment"]').click()
        cy.wait(1000)
        cy.get('.btn__primary').contains('Evento personal').click()
        cy.wait(1000)
        cy.get('.col > .m-0').should('have.text', 'Nuevo evento personal')
        cy.wait(1000)
        cy.get('one-dialog-structure').should('be.ok')
        cy.wait(1000)
      }else{
        cy.get('.btn__primary').contains('Evento personal').click()
        cy.wait(1000)
        cy.get('.col > .m-0').should('have.text', 'Nuevo evento personal')
        cy.wait(1000)
        cy.get('one-dialog-structure').should('be.ok')
        cy.wait(1000)
      }
    }) 
  });
  

  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
