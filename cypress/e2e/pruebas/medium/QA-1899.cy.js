Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />

const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1899 Recepciones_Detalle del pedido_Información general_cambio campo estado ', () => {

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

    it('Step 3',()=>{   //Pulsamos Recepciones
        cy.contains("Recepciones").click()
    })

    it('Step 4',()=>{   //Elegimos un pedido
        cy.xpath("//span[@class='mat-button-wrapper'][contains(.,'close')]").click()
        cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(3000)
        cy.get(".card-vehicle__content").first().click()
        cy.contains(" Sergio Garrido Benitez ").first().click().wait(5000)
               

    })

    it('Step 5',()=>{
        cy.get('#mat-select-1 > .mat-select-trigger > .mat-select-value').click()
       
    })

    it('Step 6',()=>{
        cy.contains("Recepcionado").click().wait(1000)
        cy.xpath("//button[@class='btn__secondary mr-2'][contains(.,'Guardar cambios')]").click() 
    })

    it('Logout',()=>{
        cy.visit('http://one-pre.kube.vged.es/home')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) //Fin logout
    })
})