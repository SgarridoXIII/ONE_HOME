Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import One from '../../../support/PageObject/One.cy';
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'
const master= new One
describe('QA-1322	Recepciones_Detalle del pedido_Resumen pedido_Intervenciones descartadas', () => {


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
        master.citaestandar()
        cy.get(':nth-child(2) > .shortcut').click()
       

    })
    it("Step 4", () => {
        cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
        cy.wait(5000)
        cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(5000)
        cy.get(".card-vehicle__content").first().click().wait(3000)
        cy.get('.card-appointment__content').last().scrollIntoView().click().wait(2000)

        
    })
    
    it("Step 5", () => {
        cy.wait(2000)
    })
    it("Step 6", () => {
        cy.get('.sidebar__option').children('.sidebar__option__text').contains('Intervenciones').click()
        cy.get('svg[matTooltip="Descartar"]').first().click()
        cy.xpath("//button[contains(.,'Sí')]").click().wait(3000)
        cy.get('.sidebar__option').children('.sidebar__option__text').contains('Descartadas').click()
        cy.get('.package').should("be.visible");  
    })
   
    
    it("Logout", () => {
        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) 
      })//Fin logout

})