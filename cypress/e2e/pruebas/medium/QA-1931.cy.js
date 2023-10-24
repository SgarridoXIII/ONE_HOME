Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
import One from "../../../support/PageObject/One.cy";
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'
const master = new One

describe('Test QA-1931 Recepciones_pedido en estado Cancelado', () => {


    before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
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
        cy.wait(1000) //Fin login

    })

    it('Step 3', () => {   //Accedemos a recepciones 
        master.citaestandar()
        cy.contains("Recepciones").click()
    })

    it('Step 4', () => {   //Elegimos un pedido y cambiamos el estado a cancelado
        cy.xpath("//span[@class='mat-button-wrapper'][contains(.,'close')]").click()
        cy.wait(1000)
        cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator > .mat-button-wrapper > .mat-datepicker-toggle-default-icon').click()
        cy.wait(1000)
        cy.get('.mat-calendar-body-today').click().wait(2000)
        cy.get('.mat-calendar-body-today').click()
        cy.wait(1000)
        cy.get(':nth-child(5) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator > .mat-button-wrapper > .mat-datepicker-toggle-default-icon').click()
        cy.wait(5000)
        cy.get('.mat-calendar-body-today').click().wait(2000)
        cy.get('.mat-calendar-body-today').click()
        cy.get('.card-appointment__content').contains(" Sergio Garrido Benitez ").last().click().wait(2000)
        cy.get('mat-select[formcontrolname="serviceState"]').click({force:true})
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Cancelado')]").scrollIntoView().click({force:true})
        cy.xpath("//button[contains(.,'Guardar cambios')]").click()
    })

    it('Step 5',()=>{   //Validamos que aparecen deshabilitados los campos
        cy.get('.mat-form-field w-100 ng-tns-c114-129 mat-primary mat-form-field-type-mat-select mat-form-field-appearance-outline mat-form-field-can-float mat-form-field-has-label mat-form-field-disabled ng-untouched ng-pristine ng-valid mat-form-field-should-float').should("be.disabled")
        cy.get('mat-select[formcontrolname="serviceState"]').should("be.disabled")
        cy.get('mat-select[formcontrolname="appointmentType"]').should("be.disabled")
        cy.get('mat-select[formcontrolname="deliveryType"]').should("be.disabled")
        cy.get('mat-select[formcontrolname="mobilityService"]').should("be.disabled")
        
    })

    it('Logout',()=>{
        cy.visit('http://one-pre.kube.vged.es/home')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) //Fin logout
    })

})