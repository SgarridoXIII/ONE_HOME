Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1543	Recepciones_Detalle del pedido_Información general_Iniciar recepción_Pestaña Intervenciones', () => {


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
        cy.get(':nth-child(2) > .shortcut').click()
    })

    it("Step 4", () => {
        cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
        cy.wait(5000)
        cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(5000)
        cy.get(".card-vehicle__content").first().click()
        cy.contains(" Sergio Garrido Benitez ").first().click().wait(5000);

    })

    it('Step 5', () => {   //Nos colocamos en información general
        cy.xpath("//div[@class='col-md-6 mb-2 d-flex align-items-center']").should("have.text", "Información general")
    })

    it('Step 6', () => {   //Iniciamos recepcion
        cy.xpath("//button[contains(.,'Iniciar recepción')]").click()
        cy.xpath("//button[contains(.,'Aceptar')]").click().wait(2000)
        cy.get('svg.navigation__navs__next').click().wait(2000)
    })

    it('Step 7', () => {     // En intervenciones comprobamos informacion 
       cy.xpath("//button[@class='btn__secondary mt-2 mb-2']").should("be.visible").and("have.text"," Editar descuentos ")
       cy.xpath("//button[contains(@class,'btn__primary mt-2 mb-2')]").should("be.visible").and("have.text"," Añadir nuevas intervenciones ")
       cy.xpath("//button[contains(@class,'btn__secondary mt-2 mb-2 alert-dms')]").should("be.visible").and("have.text"," Enviar a planificar ")  
    })

    it("logout", () => {
        cy.visit("/")
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000)
    })

})
