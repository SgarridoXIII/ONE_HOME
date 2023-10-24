Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import { clickOnAvailableSlot } from '../../../support/PageObject/Hooks';
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'


describe('Test QA-1050	Crear cita_Pestaña Día y hora_Selecciona un asesor_Entrega', () => {


    before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    //   Accedemos a la URL de ONE - Volkswagen
    it('Step 1 ', () => {
  
      cy.visit("/",)
      cy.wait(1000)
  
    })
    
    // Introducimos usuario o email y contraseña y pulsamos Acceder.
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
    
    // Desde la pantalla "Home", pulsamos sobre el botón +
    it("Step 3", () => {
        cy.get('svg.mat-menu-trigger.top-navigation-bar__actions__icon').click();


        cy.get('.mat-menu-content > :nth-child(1)').click().wait(1000)
    })

    // Pulsamos en la opción "Crear cita".
    it("Step 4", () => {
        cy.xpath('//button[@class="btn__secondary ng-star-inserted"][contains(.,"0311X - M. CONDE")]').scrollIntoView().click()
        cy.wait(1000)
        cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(5000).type('1111MMM{enter}')
        // cy.get('#mat-input-3').type('1111MMM{enter}')
        cy.wait(5000)
        cy.contains(' Audi A3 ').click({ force: true })
        cy.get('.customer-card').first().click()
        cy.xpath("//button[contains(.,'Aceptar')]").click()
        cy.wait(2500)
        cy.get(".navigation").click(1075, 75)
        cy.wait(2500)
    
        cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
        cy.get(':nth-child(5) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('test').wait(8000)
        // cy.get('#mat-input-7').type('test').wait(8000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
    
        //
    
        cy.get('.mat-select-arrow').click().wait(2000)
        // cy.get('#mat-option-28 > .mat-option-text').click().wait(1000)
        cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
        cy.xpath("//button[contains(.,'Aceptar')]").click()
    
    
        cy.get('mat-select[formcontrolname="taskType"]').click().wait(3000)
        cy.contains(' Inspección y Mantenimiento ').click()
        cy.xpath("//button[contains(.,'Aceptar')]").click()
        cy.wait(1000)
        cy.get('#mat-input-9').type('1')
        cy.get('one-add-parts-fast.ng-star-inserted > one-dialog-structure > .mt-2 > :nth-child(1)').click()
        cy.wait(1000)
        cy.get('.mt-2 > :nth-child(2) > .col-12 > .btn__primary').click()
        cy.wait(1000)
        cy.get('svg.navigation__navs__next').click();
        cy.get('svg.navigation__navs__next').click();
        cy.xpath("(//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')])[1]").click().wait(2000)
        cy.xpath("//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')]").click().wait(2000)
        
    })
    
    // Accedemos a la pestaña Día y hora
    it("Step 5", () => {
        cy.get('svg.navigation__navs__next').click();
        
    })

    // Realizamos una búsqueda en el buscador de asesor
    it("Step 6", () => {
        cy.get('.ng-valid > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.wait(1000)
        cy.get('#mat-option-0').eq(0).click()
        cy.wait(5000)
    })

    // Seleccionamos un día y una hora
    it("Step 7", () => {
        clickOnAvailableSlot()
        clickOnAvailableSlot('entrega')
    })

    it("Logout", () => {
        cy.wait(3000)
        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) 
      })//Fin logout
    
    
    
})