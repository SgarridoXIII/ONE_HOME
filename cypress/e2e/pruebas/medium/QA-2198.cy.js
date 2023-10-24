Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />

const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'
const pdf = 'pdf.pdf'

describe('Test QA-2198 Ampliaciones pedidos_Cliente', () => {


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

    it('Step 4',()=>{   //Buscamos un cliente
        cy.get('one-customer-autocomplete > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').type("Sergio {enter}").wait(15000)
    })

    it('Step 5',()=>{   // Elegimos un cliente
        cy.contains(" Sergio Garrido Benitez ").click().wait(8000)
        //cy.get('.card-service').wrap().contains("Sergio")
        const datos=[];
        cy.get(".card-service").each(($el,index,$list)=>{
            datos[index]=$el.text()
        }).then(()=>{
            for(let x=0; x<=datos.lenght; x++){
                cy.get(".card-service").eq(x).should("contain","Sergio")
            }
        })
    })

    it("logout", () => {
        cy.visit("/")
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000)
    })



})