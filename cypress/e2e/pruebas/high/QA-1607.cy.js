Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import { clickOnAvailableSlot } from '../../../support/PageObject/Hooks';
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1607 E2E_Recepciones_Detalle del pedido_Iniciar recepción_Firma Renuncio presupuesto_Finalizar', () => {


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
        cy.get(':nth-child(1) > .shortcut').click().wait(1000)
    })
    it("Step 4", () => {

        cy.xpath('//button[@class="btn__secondary ng-star-inserted"][contains(.,"0311X - M. CONDE")]').scrollIntoView().click()
        cy.wait(1000)
        cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().type('1111MMM{enter}').wait(5000)
        // cy.get('#mat-input-3').type('1111MMM{enter}')
        cy.wait(10000)
        cy.contains(' Audi A3 ').click({ force: true })
        cy.get('.customer-card').first().click()
        cy.get('.col-12 > .btn__primary').click()
        cy.wait(2500)
        cy.get('svg.navigation__navs__next').click()
        cy.wait(2500)

        cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
        cy.get(':nth-child(5) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('test').wait(8000)
        // cy.get('#mat-input-7').type('test').wait(8000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)

        //

        cy.get('.mat-select-arrow').click().wait(2000)
        // cy.get('#mat-option-28 > .mat-option-text').click().wait(1000)
        cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
        cy.get('.col-12 > .btn__primary').click()


        cy.get('.mat-select-arrow-wrapper').click().wait(3000)
        cy.contains('Diagnosis').click()
        cy.get('.col-12 > .btn__primary').click()
        cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
        cy.get('.col-12 > .btn__primary').click()
        cy.get('svg.navigation__navs__next').click()
        cy.wait(1000)
        cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
        cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
        cy.get('.cdk-column-discount > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('50')
        cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
        cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
        cy.get('svg.navigation__navs__next').click().wait(2000)

        //test
        cy.xpath("(//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')])[1]")
            .click().wait(2000)
        cy.xpath("//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')]")
            .click().wait(2000)

        cy.get('svg.navigation__navs__next').click()
        cy.get('.ng-valid > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click()
        cy.contains('Cualquier asesor').click()
        cy.wait(8000)
        clickOnAvailableSlot()
        cy.get('.navigation__navs > .btn__primary').wait(5000).click()
        cy.wait(2000)


    })
    it("Step 5", () => {
        
        cy.visit("/",)
        cy.wait(4000)
        cy.get(':nth-child(2) > .shortcut').click()
        cy.wait(4000)
    })
    it("Step 6", () => {
        cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
        cy.wait(4000)
        cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator > .mat-button-wrapper > .mat-datepicker-toggle-default-icon').click()
        cy.get('.mat-calendar-body-active').click()
        cy.get('.mat-calendar-body-active').click()
        cy.contains('1111MMM').first().click().wait(5000)

    })
    it("Step 7", () => {
        cy.get('.btn__primary').click()
    })
    it("Step 8", () => {
        cy.get(':nth-child(2) > .col-12 > .btn__primary').click().wait(2000)
        cy.get('svg.navigation__navs__next').click().wait(2000)
        cy.get('.flex-auto > :nth-child(3)').then($button => {
            if ($button.is(':disabled')) {
                cy.wait(1000)
            } else {
                $button.click()
                cy.wait(3000)
            }
        })
        cy.get('svg.navigation__navs__next').click().wait(2000)
        cy.get('svg.navigation__navs__next').click().wait(2000)
        cy.get('svg.navigation__navs__next').click().wait(2000)
    })
    it("Step 9", () => {
        cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').scrollIntoView().click(50, 50);
        cy.get(':nth-child(2) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50);
    })
    it("Step 10", () => {
        cy.get('.navigation__finish > .btn__primary').click().wait(5000)

    })
    it("Step 11", () => {
        cy.wait(2000)
    })
    it("Logout", () => {
        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000)
    })//Fin logout


})