Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1925 Recepciones_pedido en estado Listo para entregar',()=>{

      before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })


    it('Step 1', () => { //URL
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {

        cy.visit("/")
       

    })

    it('Step 2', () => { // Login

       cy.get("#username").type("sergio.garrido@siigroup-spain.com")
    cy.get("#password").type("Godella21!con")
    cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
    // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
    
    // cy.task("generateOTP").then(token => {
    //     cy.get('#otp').type(token);
    //   });

    // cy.get('.btn').click({force:true})

    })

    it('Step 3', () => { 

        cy.contains('Recepciones').should('be.visible').click()
        cy.xpath("//mat-icon[@role='img'][contains(.,'close')]").click({force: true}) // Borrar asesor
        cy.wait(1500)

    })

    it('Step 4', () => { 

        cy.wait(1500)
        cy.xpath("//input[contains(@data-placeholder,'Buscar cliente...')]").click({force: true}).wait(2000).type('Sergio Garrido {enter}')
        cy.wait(10000)
        cy.contains(' Sergio Garrido Benitez ').click()
        cy.wait(1500)
        cy.get(':nth-child(3) > :nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix')
            .then(element => {
                 if (element.text().includes('Listo para entregar')) {
                    cy.get('.btn__primary').click();
                } else {
                    cy.get('#mat-select-1 > .mat-select-trigger > .mat-select-arrow-wrapper').click();
                    cy.contains(' Listo para entregar ').scrollIntoView().click()
                    cy.get('.btn__secondary').click()
                    cy.get('.btn__primary').click();

                 }
        });

    }) 
    

    it('Step 5', () => { 

        cy.xpath("//button[contains(.,'Aceptar')]").click()
        cy.wait(1500)
    })


    it('Step 6', () => { 
        cy.get('.signature-container').click(25,25)
        cy.get('.btn__primary').click()

    })



    it("Logout", () => {

        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) 
    
      })//Fin logout


    
})