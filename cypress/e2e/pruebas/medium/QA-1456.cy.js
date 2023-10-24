Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
import One from "../../../support/PageObject/One.cy";
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'
const video = 'test.mp4'
const master = new One

describe('Test QA-1456 Recepciones_Detalle del pedido_Multimedia_Añadir vídeo', () => {


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
        cy.contains("Recepciones").click()
    })

    it('Step 4', () => {   //Elegimos un pedido 
        cy.get('.mat-icon').click()
    cy.wait(1000)
    cy.get('.card-appointment__content').eq(2).click()
    cy.wait(1000)
    })

    it('Step 5', () => {   //Nos colocamos en Multimedia
        cy.contains("Multimedia").click()
    })

    it('Step 6', () => {   //Pulsamos añadir video
        cy.get('svg[class="mat-tooltip-trigger icon-video ml-2 pointer"]').click()
    })

    it('Step 7', () => {   //Comprobamos boton guardar desactivado
        cy.xpath("//button[contains(.,'Guardar')]").should("be.disabled")   
    })

    it('Step 8', () => {   //Añadimos video
        cy.get('.fileInput').attachFile({
            filePath: video,      
            mimeType: 'video/mp4',      
            encoding: 'base64'      
        })  
        cy.get('.mt-3 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.get('mat-option[role="option"]').eq(2).click()
        cy.xpath("//button[contains(.,'Guardar')]").should("be.enabled")  


    })

    it('Logout', () => {
        cy.visit('http://one-pre.kube.vged.es/home')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) //Fin logout
    })

})