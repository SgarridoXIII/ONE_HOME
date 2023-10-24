Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

function generateRandomNumber() {
  const characters = '01234';
  return Array.from({length: 1}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

describe('QA-2990 - Edición de los datos de un vehículo', () => {
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

  // Introducimos usuario o email y contraseña y pulsamos Acceder    
    cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
    cy.wait(1000)
  })

  // Pulsamos en el botón "Vehículos".
  it('step 2', () => {
    // Desde la pantalla  principal "Home", pulsamos en el botón "Más" en la barra superior de la página y pulsamos "Vehículos"
    cy.get('.top-navigation-bar__options__navs > .mat-menu-trigger').click()
    cy.wait(1000)
    cy.get('.top-navigation-bar__options__navs__more-item').eq(1).click()
    cy.wait(1000)
  });

  // Seleccionamos un "Vehículo" del listado.
  it('step 3', () => {
    cy.get('.card-vehicle__content').eq(generateRandomNumber()).click()
    cy.wait(1000)

  });
  
  // Desde la ficha "Vehículo" editamos algunos campos de esta pantalla.
  it('step 4', () => {
    cy.get('input[formcontrolname="bodyColor"]').clear().type(`Edit ${generateRandomNumber()}`)
    cy.wait(1000)
    cy.get('input[formcontrolname="description"]').clear().type(`Tets Edit ${generateRandomNumber()}`)
    cy.wait(1000)
    cy.get('.btn__primary').click()
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
