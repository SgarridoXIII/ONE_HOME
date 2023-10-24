Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />

const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-2472 Clientes', () => {


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

    it('Step 3',()=>{     //Accedemos a clientes
        
        cy.contains(" Más ").click()
        cy.xpath("//div[@class='top-navigation-bar__options__navs__more-item ng-tns-c81-2 ng-star-inserted'][contains(.,'Clientes')]").click({force:true})
        cy.xpath("//h3[contains(.,'Clientes')]").should("be.visible")
        cy.xpath("//input[contains(@formcontrolname,'search')]").should("be.visible").and("be.enabled")
        cy.xpath("//button[contains(.,'Búsqueda avanzada')]").should("be.visible").and("be.enabled")

    })

    it('Logout',()=>{
        cy.visit('http://one-pre.kube.vged.es/home')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) //Fin logout

    })

})