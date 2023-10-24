Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import { clickOnAvailableSlot } from '../../../support/PageObject/Hooks';
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe("Test QA-2631 E2E Recepción sin cita", () => {

    before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {

        cy.visit("/",)
        cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
        cy.wait(2000) //Fin login
        cy.contains('Recepción sin cita').click()
        cy.wait(3000)

    })

    it("Step 2", () => {

        cy.get('#mat-input-3').click().type('1111MMM{enter}')
        cy.wait(10000)
        cy.contains('1111MMM').click({ force: true })
        cy.wait(1000)

    })


    it('Step 3', () => {
        cy.get('.customer-card').contains('Sergio').click()
        cy.get('.btn__primary.w-100').click()
        cy.get('svg.navigation__navs__next').click();
        // End Cliente/Vehículo

    })

    it('Step 4', () => {

        // Motivo de la visita
        cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
        cy.get(':nth-child(5) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('test').wait(8000)
        // cy.get('#mat-input-7').type('test').wait(8000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)

        //

        cy.get('.mat-select-arrow').click().wait(2000)
        // cy.get('#mat-option-28 > .mat-option-text').click().wait(1000)
        cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
        cy.xpath("//button[contains(.,'Aceptar')]").click()


        cy.get('.mat-select-arrow-wrapper').click().wait(3000)
        cy.contains(' Inspección y Mantenimiento ').click()
        cy.xpath("//button[contains(.,'Aceptar')]").click()
        cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
        cy.get('.col-12 > .btn__primary').contains(' Guardar ').click()
        cy.get(".navigation").click(1075, 75)

    })

    it('Step 5', () => {

        // Intervenciones 
        cy.get('#mat-expansion-panel-header-1 > .mat-expansion-indicator').click()
        cy.wait(1000)
        cy.get('#mat-input-22').click().clear().type('10')
        cy.wait(1000)
        cy.get('#mat-expansion-panel-header-1 > .mat-expansion-indicator').click()
        cy.wait(1000)
        cy.get('svg.navigation__navs__next').click();
        cy.wait(1000)
        // End Intervenciones

    })

    it('Step 6', () => {

        // Servicios adicionales
        cy.get('one-checkin-type-appointment.ng-star-inserted > .align-items-start > .w-100 > :nth-child(1) > :nth-child(2) > :nth-child(1)').click()
        cy.get('svg.navigation__navs__next').click();
        cy.wait(1000)
        // End Servicios adicionales

    })

    it('Step 7', () => {

        // Estado del vehículo
        //const photo = 'polo.png'
        cy.get(':nth-child(2) > .damages__add-damage').click()
        cy.get('.fileInput').attachFile(photo)
        cy.wait(8000)
        cy.get(':nth-child(4) > .btn__primary').click()
        cy.wait(2000)

        cy.get('svg.navigation__navs__next').click();
        // End Estado del vehículo

    })

    it('Step 8', () => {

        // Check list
        cy.get(':nth-child(1) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
        cy.get(':nth-child(2) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
        cy.get(':nth-child(3) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
        cy.wait(1000)
        cy.contains('Exterior').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
        cy.get(':nth-child(2) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
        cy.get(':nth-child(3) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
        cy.get(':nth-child(4) > .checklistItems__checklistItem__statuses > .checklistItems__checklistItem__statuses__status--green').click()
        cy.wait(1000)
        cy.get('svg.navigation__navs__next').click();
        // End Check list

    })

    it('Step 9', () => {

        // Dia y Hora (Entrega)

        cy.get('.ng-untouched.ng-star-inserted > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.contains('Cualquier asesor').click()
        clickOnAvailableSlot()

    })

    it('Step 10', () => {
        cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').scrollIntoView()
        cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50);
        cy.get(':nth-child(2) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50);
        cy.get('.navigation__navs > .btn__primary').click()


    }) // End recepción sin cita


    it("Logout", () => {
        cy.visit("/")
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000)

    })//Fin logout


})
