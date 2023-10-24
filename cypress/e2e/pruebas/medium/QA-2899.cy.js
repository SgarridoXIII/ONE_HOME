Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

function generateRandomNumber() {
  const characters = '0123456789';
  return Array.from({length: 7}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

describe('QA-2899 - Creación de un cliente Particular', () => {
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

  // Pulsamos en el botón "Crear cliente" 
  it('step 2', () => {
  // Desde la pantalla "Home", pulsamos sobre el botón + y Pulsamos en la opción "Crear  Cliente"
    cy.get('svg.mat-menu-trigger.top-navigation-bar__actions__icon').click()
    cy.wait(1000)
    cy.contains(" Crear cliente ").click()
    cy.wait(1000)
  });
  
  // Desde la pantalla "Crear cliente". Seleccionamos la opción "Particular"
  it('step 3', () => {
    cy.get('.btn__secondary.mr-2.ng-star-inserted').eq(0).click()
    cy.wait(1000)
  });
  
  // Editamos algunos de los campos del cliente Empresa.
  it('step 4', () => {
    cy.get('input[formcontrolname="documentValue"]').type(`Y${generateRandomNumber()}K`)
    cy.wait(1000)
    cy.get('input[formcontrolname="name"]').type(`Nombre${generateRandomNumber()}`)
    cy.wait(1000)
    cy.get('input[formcontrolname="firstSurname"]').type(`1Apellido${generateRandomNumber()}`)
    cy.wait(1000)
    cy.get('input[formcontrolname="phone1"]').type(`tel${generateRandomNumber()}`)
    cy.wait(1000)
    cy.get('input[formcontrolname="email"]').type(`email${generateRandomNumber()}@test.com`)
    cy.wait(1000)
    cy.get('.btn__primary').click()
    cy.wait(1000)
    cy.get('.mat-snack-bar-container').should('have.text', 'Cliente creado correctamente')
    cy.wait(1000)
  });

  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
