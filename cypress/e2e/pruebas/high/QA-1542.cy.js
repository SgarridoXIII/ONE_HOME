Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const video = 'test.mp4'



describe('Test QA-1542	Recepciones_Detalle del pedido_Información general_Iniciar recepción_Pestaña Estado del vehículo_Añadir vídeo_Añadir intervenciones', () => {


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

    it("Step 5", () => {
        cy.wait(3000)
        cy.get('.sidebar__option').children('.sidebar__option__text').wait(3000).contains('Información general').click()
    })
    it("Step 6", () => {
        cy.wait(1000)
        cy.get('.btn__primary').click()
        cy.wait(3000)


    })
    it("Step 7", () => {
        cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
        cy.wait(2000)

    })
    it("Step 8", () => {

        cy.get(':nth-child(3) > .damages__add-damage').click()
        cy.get('.fileInput').attachFile({
            filePath: video,      
            mimeType: 'video/mp4',      
            encoding: 'base64'      
          })
        cy.wait(15000);

    })

    it('Step 9', () => {

        cy.xpath("//button[contains(.,'Añadir intervenciones')]").click({force:true})
        cy.wait(3000)

    })

    it('Step 10',()=>{

        cy.get(':nth-child(3) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').scrollIntoView().type("test")
        cy.wait(1000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
        cy.wait(1000)
        cy.get('.mat-select-arrow').click()
        cy.wait(1000)
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Cliente propietario')]").click()
        cy.wait(1000)
        cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
        cy.wait(1000)
        cy.get('.mat-select-arrow').click()
        cy.wait(1000)
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Tren de rodaje')]").click()
        cy.wait(1000)
        cy.xpath("//button[@class='btn__primary w-100'][contains(.,'Aceptar')]").click()
        cy.wait(1000)
        cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').as('time')
        cy.get('@time').clear().type('1')
        cy.wait(1000)
        cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
        cy.wait(1000)

    })

    it("Logout", () => {
        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000)
    })//Fin logout

})