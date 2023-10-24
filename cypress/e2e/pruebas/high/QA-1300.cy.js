Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-downloadfile/lib/downloadFileCommand');
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1300	Recepciones_Detalle del pedido_Cliente_Reasignar Cliente_Seleccionar cliente', () => {


    before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {
  
      cy.visit("/",)
      cy.wait(1000)
  
    })
    
    it("Step 2", () => {
        cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
        cy.wait(2000) //Fin login
    })
    
    it("Step 3", () => {
        cy.get(':nth-child(2) > .shortcut').click()
       

    })
    it("Step 4", () => {
        cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
        cy.wait(3000)
        cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator > .mat-button-wrapper > .mat-datepicker-toggle-default-icon').click()
        cy.get('.mat-calendar-body-active').click()
        cy.get('.mat-calendar-body-active').click()
        // cy.xpath('(//span[@class="card-appointment__content__appointment-info__appointment-type col-md-3"][contains(.,"Clásica")])[7]').click();
        cy.contains('1111MMM').first().click().wait(5000);

        
    })
    
    it("Step 5", () => {
        cy.get('.sidebar__option').children('.sidebar__option__text').contains('Cliente').click().wait(5000)
    })
    it("Step 6", () => {
        cy.get('.justify-content-end > :nth-child(2)').click().wait(5000)
        cy.get('#mat-dialog-1 input').first().click().type('Edu{enter}').wait(10000)
        cy.contains('EduTT1').click().wait(5000)
        cy.wait(3000)
    })
  
    
    it("Logout", () => {
        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) 
      })//Fin logout

})