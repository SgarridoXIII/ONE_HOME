Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />

const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'
const pdf = 'pdf.pdf'

describe('Test QA-2196 Ampliaciones pedidos_NúmeroDePedido', () => {


      before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })


    it('Step 1', () => { //URL
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
    // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
    
    // cy.task("generateOTP").then(token => {
    //     cy.get('#otp').type(token);
    //   });

    // cy.get('.btn').click({force:true})

    })

    it('Step 3',()=>{   //Pulsamos en ampliaciones pedidos
        cy.contains("Ampliaciones pedidos").click()
        cy.xpath("//div[@class='row mt-3']").should("have.text","Pedidos")
        cy.xpath("//div[@class='mat-tab-label-container']").should("be.visible").wait(3000)
    })

    it('Step 4',()=>{   //Buscamos un pedido
        cy.visit("/")
        cy.contains('Recepciones').click()
        cy.wait(2000)
        cy.xpath("//span[@class='mat-button-wrapper'][contains(.,'close')]").click()
        cy.wait(3000)
        cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator > .mat-button-wrapper > .mat-datepicker-toggle-default-icon').click()
        cy.wait(5000)
        cy.get('.mat-calendar-body-today').click()
        cy.get('.mat-calendar-body-today').click()
        cy.wait(8000)
        cy.get('.card-appointment__content__appointment-info').last().click({force:true})
        cy.wait(3000)
        let inputValue;
        cy.xpath("//input[contains(@formcontrolname,'serviceNumber')]").invoke("val").then((value)=>{
            inputValue = value
        })
        cy.visit("/")
        cy.contains("Ampliaciones pedidos").click()
        cy.xpath("//div[@class='row mt-3']").should("have.text","Pedidos")
        cy.xpath("//div[@class='mat-tab-label-container']").should("be.visible").wait(3000)
        cy.xpath("//div[@class='mat-tab-label-content'][contains(.,'Pedidos en curso')]").click()
        cy.xpath("//input[contains(@formcontrolname,'search')]").type(inputValue).wait(2000)


       
    })


    it("logout", () => {
        cy.visit("/")
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000)
    })



})