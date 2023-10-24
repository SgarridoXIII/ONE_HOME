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

describe('QA-2548 - Calendario_Detalle evento personal_Vista rápida_Ir al detalle_Editar_Guardar', () => {
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
  
  // Hacemos click en un evento personal del calendario
  it('step 4', () => {
    cy.get('.scroll-area > .col').contains(dia).click()
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
        cy.get('.scroll-area > .col').contains(dia).click()
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
    cy.get('.legend__item__color').eq(2).click()
    cy.wait(1000)
    cy.get('.legend__item__color').eq(2).click()
    cy.wait(1000)
    cy.get('.cal-events.ng-star-inserted').eq(0).click()
    cy.wait(1000)
    cy.get('.cal-event-title').eq(0).click()
    cy.wait(1000)
  });
  
  // Pulsamos Ir al detalle - Editamos desde el icono de lapiz
  it('step 5', () => {
    cy.get('svg[matTooltip="Editar evento"]').click()
    cy.wait(1000)
  });
  
  // Editamos algunos de los campos y pulsamos Guardar
  it('step 6', () => {
    cy.get('input[formcontrolname="name"]').clear().type('Edit Test Evento personal')
    cy.wait(1000)
    cy.get('div[class="mat-checkbox-inner-container"]').click()
    cy.wait(1000)
    cy.get('.btn__primary').click()
    cy.wait(1000)
  });
  
  // En el calendario, abrimos el evento - Validamos mensaje de confirmacion
  it('step 7', () => {
    cy.get('.mat-snack-bar-container').should('have.text', 'Evento personal actualizado correctamente')
    cy.wait(1000)
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
