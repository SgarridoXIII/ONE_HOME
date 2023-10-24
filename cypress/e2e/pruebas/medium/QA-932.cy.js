Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'


describe('Test QA-932	Crear cita_Pestaña Motivo de la visita_Resumen de la cita', () => {


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
      masterLogin.login()
    })
    
    it("Step 3", () => {
      cy.get('svg.mat-menu-trigger.top-navigation-bar__actions__icon').click();
      cy.get('.mat-menu-content > :nth-child(1)').click().wait(1000)
    })
    it("Step 4", () => {
      cy.xpath("//button[@class='btn__secondary ng-star-inserted'][contains(.,'0311X - M. CONDE')]").click().wait(1000)
      cy.wait(3000)
      cy.get('#mat-input-3').click().type('1234ABC{enter}')
      cy.wait(10000)
      cy.contains('1234ABC').click({ force: true })
      cy.get('.customer-card').contains('Edu').click()
      cy.get('.btn__primary.w-100').click()
    })
    
    it("Step 5", () => {
      cy.get('svg.navigation__navs__next').click();
      cy.wait(1000)
    })

    it('Step 6',()=>{   //Seleccionamos motivo y avanzamos
      cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
      cy.get('.col > .icon').click()
      cy.get('svg.navigation__navs__next').click();
    })

    it('Step 7',()=>{   //comrpobamos los datos previos en resumen
      cy.get('.align-items-end > :nth-child(1)').click()
      cy.xpath("//section[@class='summary__item ng-star-inserted'][contains(.,'InstalaciónEditarM. CONDE')]").should("be.visible")
      cy.xpath("//section[@class='summary__item ng-star-inserted'][contains(.,'ClienteEditar E01 - Edu Diaz Marcos (E01)')]").should("be.visible")
      cy.xpath("//section[@class='summary__item ng-star-inserted'][contains(.,'VehículoEditar Volkswagen ID.3 Style Test')]").should("be.visible")
      cy.xpath("//section[@class='summary__item ng-star-inserted'][contains(.,'Motivo de la visitaEditar Mantenimiento')]").should("be.visible")

    })
 
    it("Logout", () => {
      masterLogin.logout()
      })//Fin logout
})