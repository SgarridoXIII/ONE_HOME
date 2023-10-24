Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
import One from "../../../support/PageObject/One.cy";
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'
const video = 'test.mp4'
const master = new One

describe('Test QA-1538 Recepciones_Detalle del pedido_Información general_Iniciar recepción_Pestaña Estado del vehículo_Capturar cuadro de instrumentos_Añadir intervenciones', () => {


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

    it('Step 4', () => {   //Elegimos un pedido 
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
    })

    it('Step 5', () => {   //Verificamos los campos
        cy.get(':nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').should("be.visible")
        cy.get(':nth-child(3) > :nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').should("be.visible")
        cy.get(':nth-child(3) > :nth-child(3) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').should("be.visible")
        cy.get(':nth-child(3) > :nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').should("be.visible")
        cy.get(':nth-child(3) > :nth-child(5) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').should("be.visible")
        cy.get(':nth-child(6) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').should("be.visible")

    })

    it('Step 6', () => {   //Iniciamos recepcion
        cy.xpath("//button[contains(.,'Iniciar recepción')]").click()
        cy.xpath("//button[contains(.,'Aceptar')]").click().wait(2000)

    })

    it('Step 7', () => {   //Estado del vehiculo
        cy.xpath("//h3[@class='my-5 bold']").should("have.text", "Estado del vehículo")
        cy.get('div[class="damages__add-damage"]').should("be.visible")

    })

    it('Step 8', () => {   //Pulsamos cuadro de instrumentos
        cy.xpath("//div[@class='damages__add-damage'][contains(.,'*Capturar cuadro de instrumentos')]").click()
    })

    it('Step 9', () => {   //Añadimos foto
        cy.get('.fileInput').attachFile(photo).wait(3000)
    })

    it('Step 10',()=>{  //Añadimos intervencion
        cy.xpath("//button[contains(.,'Añadir intervenciones')]").scrollIntoView().click().wait(3000)
        cy.contains("Añadir otras intervenciones").scrollIntoView()
        cy.xpath("//input[contains(@formcontrolname,'createPackage')]").type('test1538').wait(2000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000).wait(1000)
        cy.get('.mat-select-arrow').click().wait(2000)
        cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
        cy.xpath("//button[contains(.,'Aceptar')]").click()
        cy.get('.mat-select-arrow-wrapper').click().wait(3000)
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Inspección y Mantenimiento')]").click()
        cy.xpath("//button[contains(.,'Aceptar')]").click()        
        cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').clear().type('2').wait(2000)
        cy.xpath("//button[@class='btn__primary'][contains(.,'Guardar')]").click().wait(3000)   
        cy.xpath("//button[contains(.,'Guardar')]").click()
        cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
        cy.get('span[class="bold px-0"]').last().should("contain.text","test1538")
    })

    it('Logout', () => {
        cy.visit('http://one-pre.kube.vged.es/home')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) //Fin logout
    })

})