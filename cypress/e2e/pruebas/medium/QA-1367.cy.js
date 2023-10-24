Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
import One from "../../../support/PageObject/One.cy"
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'
const master=new One()

function generateRandomNumber() {
    const characters = '0123456789';
    return Array.from({ length: 7 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

describe("Test QA-1367 - Recepciones_Detalle del pedido_Checklist_Lunas_Intervenciones sugeridas_Diferir", () => {
    // Accedemos a la URL de ONE - Volkswagen
    before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
    })

    it('Step 1 ', () => {
        cy.visit("/",)
        cy.wait(1000)
    })

    // Introducimos usuario o email y contraseña y pulsamos Acceder.
    it("Step 2", () => {
        cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
        // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()

        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        // });

        // cy.get('.btn').click({ force: true })
        cy.wait(2000) //Fin login
    })

    // Desde la pantalla "Home", pulsamos sobre el botón Recepciones
    it("Step 3", () => {
        master.citaPPSO()
        cy.get(':nth-child(2) > .shortcut').click()
    })

    // Pulsamos sobre la flecha > de uno de los pedidos del listado con estado recepcionado o iniciamos recepcion de uno
    it("Step 4", () => {
        cy.get('mat-icon').should('have.text', 'close').click()
        cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.xpath("//input[contains(@formcontrolname,'search')]").type("8399JZZ").wait(5000)
        cy.get(".card-vehicle__content").first().click({ force: true }).wait(5000)
        cy.get('.card-appointment__content').first().click().wait(5000)
    })

    // Nos situamos en la pestaña Check list
    it('Step 5', () => {
        cy.xpath("//button[contains(.,'Iniciar recepción')]").click()
        cy.xpath("//button[contains(.,'Aceptar')]").click().wait(2000)
        cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
        cy.get('.flex-auto > :nth-child(3)').then($button => {
            if ($button.is(':disabled')) {
              cy.wait(1000)
            } else {
              $button.click()
              cy.wait(3000)
            }
          })
        cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()

    })

    // Pulsamos sobre la pestaña Lunas (aparece esta pestaña por defecto)
    it('Step 6', () => {
        cy.get('.checklistGroups__group').eq(0).should('include.text', 'Lunas')
        cy.wait(1000)
    })

    // Sobre uno de los módulos, seleccionamos el color rojo o amarillo
    it('Step 7', () => {
        cy.get('.checklistItems__checklistItem__statuses__status--red').eq(0).click()
        cy.wait(1000)
        cy.get('mat-dialog-container').then(el => {
            if (el.text().includes('Intervenciones sugeridas')) {
                cy.get('svg[class="icon ng-star-inserted"]').click()
                cy.wait(1000)
            } else {
                cy.wait(1000)
            }
        })
    })

    // Cambiamos uno de los módulos de color rojo a amarillo o viceversa
    it('Step 8', () => {
        cy.get('.checklistItems__checklistItem__statuses__status--yellow').eq(0).click()
        cy.wait(1000)
    })

    it('Step 9',()=>{       //Pulsamos sobre los 3 puntos de una de las intevenciones
        cy.get('div[class="package__actions ng-star-inserted"]').first().click()
    })

    it('Step 10',()=>{      //Pulsamos diferir
       cy.xpath("//button[contains(.,'Diferir')]").click() 
    })

    it('Step 11',()=>{      //Selecionamos fecha y diferir
        cy.get('.col > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').click()
        for(let i = 0 ; i < 2; i++){
            cy.get('button[aria-label="Next year"]').click({force:true})
          }
        cy.xpath("//div[@class='mat-calendar-body-cell-content mat-focus-indicator'][contains(.,'MAR.')]").click()
        cy.xpath("//div[@class='mat-calendar-body-cell-content mat-focus-indicator'][contains(.,'13')]").click() 
        cy.xpath("//button[@class='btn__primary'][contains(.,'Diferir')]").click()
        cy.get('.mat-select-arrow').click().wait(2000)
        cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
        cy.xpath("//button[contains(.,'Aceptar')]").click()
        cy.get('svg[class="icon ng-star-inserted"]').click({force:true})
        
    })

      it('Logout', () => {
        cy.visit('http://one-pre.kube.vged.es/home')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) //Fin logout
    })
})
