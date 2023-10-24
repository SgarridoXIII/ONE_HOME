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

describe("Test QA-1366 - Recepciones_Detalle del pedido_Checklist_Lunas_Intervenciones sugeridas_Añadir", () => {
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
        cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
        cy.wait(5000)
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

    // Añadimos una intervencion
    it('Step 9', () => {
        cy.get('input[formcontrolname="createPackage"]').type(`test${generateRandomNumber()}`)
        cy.wait(1000)
        cy.get('.btn__secondary.mb-3').click()
        cy.wait(1000)
        cy.get('mat-select[formcontrolname="payerType"]').click()
        cy.wait(1000)
        cy.get('mat-option').eq(0).click()
        cy.wait(1000)
        cy.get('.btn__primary').contains('Aceptar').click()
        cy.wait(1000)

        cy.get('mat-select[formcontrolname="taskType"]').click()
        cy.wait(1000)
        cy.get('mat-option').eq(1).click()
        cy.wait(1000)
        cy.get('.btn__primary').contains('Aceptar').click()
        cy.wait(1000)

        cy.get('one-dialog-structure').find('td[class="mat-cell cdk-cell cdk-column-quantityTime mat-column-quantityTime ng-star-inserted"]').find('input').clear().type(1)
        cy.wait(1000)
        cy.get('.btn__primary').contains('Guardar').click()
        cy.wait(1000)

        // Cerramos el dialogo
        cy.get('svg[class="icon ng-star-inserted"]').click()
        cy.wait(1000)

        cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
        cy.wait(1000)

        cy.get('svg[class="navigation__navs__next ng-star-inserted"]').click()
        cy.wait(1000)

        cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50)
        cy.wait(1000)
        cy.get(':nth-child(2) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50)
        cy.wait(1000)

        cy.get('.navigation__finish > .btn__primary').click()
        cy.wait(1000)
    })

    // Accedemos a ampliaciones/CAM
    it('Step 10', () => {
        cy.get('.sidebar__option__text').contains('Ampliaciones/CAM').click()
        cy.wait(1000)
        cy.get('.mat-tab-label-content').eq(0).should('have.text', 'Healthcheck CAM')
        cy.wait(1000)
        cy.get('.mat-tab-label-content').eq(1).should('have.text', 'Ampliaciones pedido')
        cy.wait(1000)
    })

    it('Logout', () => {
        cy.visit('http://one-pre.kube.vged.es/home')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) //Fin logout
    })
})
