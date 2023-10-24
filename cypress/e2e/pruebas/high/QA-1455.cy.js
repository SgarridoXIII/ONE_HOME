Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'
const video = 'test.mp4'
const pdf = 'pdf.pdf'

describe('Test QA-1455 - Recepciones_Detalle del pedido_Multimedia_Añadir documento_Guardar', ()=>{
  // Accedemos a la URL de ONE - Volkswagen
  before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {
    cy.visit("/")
    cy.wait(1000) 
  })

  // Introducimos usuario o email y contraseña y pulsamos Acceder
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
  });
  
  // Pulsamos sobre la flecha > de uno de los pedidos del listado
  it('step 4', () => {
    cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
    cy.wait(5000)
    cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(5000)
    cy.get(".card-vehicle__content").first().click()
    cy.contains(" Sergio Garrido Benitez ").first().click().wait(5000)
  });

  // Nos situamos en la pestaña Multimedia
  it('step 5', () => {
    cy.get('.sidebar > :nth-child(11)').click()
    cy.wait(1000)
  });
  
  // Pulsamos sobre el botón Añadir documento
  it('step 6', () => {
    cy.get('.icon-doc').click()
    cy.wait(1000)
  });

  // Seleccionamos un documento
  it('step 7', () => {
    cy.get('.fileInput').attachFile(pdf)
    cy.wait(1000)
  });
  
  // Rellenamos, si procede, el campo Categoría y Comentarios y pulsamos el botón Guardar
  it('step 8', () => {
    cy.xpath("//textarea[contains(@maxlength,'500')]").type("Test").wait(1000)
    cy.xpath("//button[@class='btn__primary w-100 ng-star-inserted'][contains(.,'Guardar')]").click({force: true})
    cy.wait(2000)
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })   
})