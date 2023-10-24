Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = new Date().getDate().toString()
const photo = 'polo.png'


describe('Test QA-2541 Calendario_Crear evento personal_Obligatoriedad campos', () => {


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
    })
    
    it("Step 3", () => {
        cy.get('.top-navigation-bar__options__navs > :nth-child(3)').click().wait(1000)
    })
    
    it("Step 4", () => {
        cy.get('.cal-today > .cal-cell-top').click()
    })
    
    it("Step 5", () => {
        cy.get('.ng-star-inserted > .btn__primary').click().wait(1000)
   
    })
    
    it("Step 6", () => {
        cy.xpath('//textarea[@formcontrolname="description"]').click().clear().type('Test event description').wait(1000)
        cy.get(':nth-child(5) > :nth-child(2) > .row > .mat-form-field mat-datepicker-toggle').click()
        cy.get('.mat-calendar-content').click()//.type('{enter}').wait(2000)
        cy.xpath("//div[@class='mat-calendar-body-cell-content mat-focus-indicator mat-calendar-body-today']").click().wait(1000)
        cy.contains('Ok').click().wait(1000)
        cy.xpath('//input[contains(@formcontrolname,"appointmentTimeEnd")]').click().wait(1000);
        cy.get('[style="height: 85px; transform: rotateZ(390deg) translateX(-50%);"] > span').click()
        cy.contains('Ok').click().wait(1000)
        
        cy.get('.btn__primary').click().wait(3000)
        cy.get('.btn__secondary').click()
    })
    
    it("Step 7", () => {
        cy.get('.cal-today > .cal-cell-top').click()

        cy.get('.ng-star-inserted > .btn__primary').click().wait(1000)

        cy.xpath('//input[contains(@formcontrolname,"name")]').click().clear().type('Test Event').wait(1000)

        // cy.get(':nth-child(5) > :nth-child(2) > .row > .mat-form-field mat-datepicker-toggle').click()
        // cy.get('.mat-calendar-content').click().type('{enter}').wait(2000)
        cy.get(':nth-child(4) > :nth-child(2) > .row > .mat-form-field-hide-placeholder > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(1000)
        cy.contains('Ok').click().wait(1000)
        cy.xpath('//input[contains(@formcontrolname,"appointmentTimeEnd")]').click().wait(1000);
        cy.get('[style="height: 85px; transform: rotateZ(390deg) translateX(-50%);"] > span').click()
        cy.contains('Ok').click().wait(1000)
        cy.get('.btn__primary').click().wait(3000)
        cy.get('.btn__secondary').click()
    })
    
    it("Step 8", () => {
        cy.get('.cal-today > .cal-cell-top').click()

        cy.get('.ng-star-inserted > .btn__primary').click().wait(1000)

        cy.xpath('//input[contains(@formcontrolname,"name")]').click().clear().type('Test Event').wait(1000)
        cy.xpath('//textarea[@formcontrolname="description"]').click().clear().type('Test event description').wait(1000)

        cy.get(':nth-child(5) > :nth-child(2) > .row > .mat-form-field mat-datepicker-toggle').click()
        cy.get('.mat-calendar-content').click()//.type('{enter}').wait(2000)
        // cy.get(':nth-child(4) > :nth-child(2) > .row > .mat-form-field-hide-placeholder > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(1000)
        // cy.contains('Ok').click().wait(1000)
        // cy.xpath('//input[contains(@formcontrolname,"appointmentTimeEnd")]').click().wait(1000);
        // cy.get('[style="height: 85px; transform: rotateZ(390deg) translateX(-50%);"] > span').click()
        // cy.contains('Ok').click().wait(1000)
        cy.get('.btn__primary').click().wait(3000)
        cy.get('.btn__secondary').click()
    })
    
    it("Step 9", () => {
        cy.get('.cal-today > .cal-cell-top').click()

        cy.get('.ng-star-inserted > .btn__primary').click().wait(1000)

        cy.xpath('//input[contains(@formcontrolname,"name")]').click().clear().type('Test Event').wait(1000)
        cy.xpath('//textarea[@formcontrolname="description"]').click().clear().type('Test event description').wait(1000)
        cy.get(':nth-child(5) > :nth-child(2) > .row > .mat-form-field mat-datepicker-toggle').click()
        cy.get('.mat-calendar-content').click()//.type('{enter}').wait(2000)
        cy.get(':nth-child(4) > :nth-child(2) > .row > .mat-form-field-hide-placeholder > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(1000)
        cy.contains('Ok').click().wait(1000)
        // cy.xpath('//input[contains(@formcontrolname,"appointmentTimeEnd")]').click().wait(1000);
        // cy.get('[style="height: 85px; transform: rotateZ(390deg) translateX(-50%);"] > span').click()
        // cy.contains('Ok').click().wait(1000)
        cy.get('.btn__primary').click().wait(3000)
        cy.get('.btn__secondary').click()
    })
    it("Logout", () => {
        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000)
    })//Fin logout
    
})