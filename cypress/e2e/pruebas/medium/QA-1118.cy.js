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

describe('QA-1118	Perfil_Editar', () => {

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

 it('Step 3',()=>{    //Pulsamos mas 
  cy.contains(" Más ").click()
  })

  it('Step 4',()=>{   //Elegimos Configuracion
    cy.get('div[class="top-navigation-bar__options__navs__more-item ng-tns-c81-2 ng-star-inserted"]').eq(5).click()
  })

  it('Step 5',()=>{   // Pulsamos perfil
    cy.xpath("//div[@class='shortcut'][contains(.,'Perfil')]").click({force:true})
  })

  it('Step 6 ',()=>{    //Editamos algun campo
    cy.get('input[formcontrolname="secondSurname"]').type("Benítez").wait(1000)
    cy.get('svg[class="app-bar__back__icon"]').click()
    cy.go("forward")
    cy.get('div[class="userIcon"]').should("include.text", "SG")
    cy.xpath("//input[@formcontrolname='secondSurname']").clear().wait(1000)
    cy.get('svg[class="app-bar__back__icon"]').click()
  })

  it("Logout", () => {
    masterLogin.logout()
  })//Fin logout
})