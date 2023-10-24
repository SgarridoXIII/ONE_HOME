Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1525 Recepciones_Detalle del pedido_Recepción', () => {

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

        cy.contains('Recepciones').click()
        cy.wait(2000)

    })

    it('Step 4', ()=>{

        cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
        cy.wait(5000)
        cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(5000)
        cy.get(".card-vehicle__content").first().click()
        cy.contains(" Sergio Garrido Benitez ").first().click().wait(5000)

    })

    it('Step 5', ()=>{

        cy.xpath("//span[@class='sidebar__option__text'][contains(.,'Recepción')]").click()
        cy.xpath("//button[contains(.,'Cancelar recepción')]").should('be.enabled')
        cy.xpath("//button[contains(.,'Reasignar recepción')]").should('be.enabled')
        cy.xpath("//div[@formgroupname='checkType']").should('be.visible')
        cy.get(':nth-child(5) > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').should('be.visible')
        cy.get(':nth-child(5) > :nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').should('be.visible')
        cy.get(':nth-child(5) > .ng-invalid > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').should('be.visible')


    })

    it("Logout", () => {

        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) 
    
      })//Fin logout


})