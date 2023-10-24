Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
import login from '../../../support/PageObject/Login.cy'
const masterLogin = new login

describe('QA-954 -Crear cita_Pestaña Intervenciones_Añadir nuevas intervenciones_Añadir intervenciones sugeridas', () => {
  
  // Accedemos a la pantalla "Home" de la aplicación ONE
  before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {
  // Accedemos a la URL de ONE - Volkswagen
    cy.visit("/")
    cy.wait(1000) 
  });
  
  // Introducimos usuario o email y contraseña y pulsamos Acceder.
  it('step 2', () => {
    masterLogin.login()
  });

  //Desde la pantalla principal "Home" pulsamos en el botón "Más" del menú superior
  it('step 3', () => {
    cy.get('svg.mat-menu-trigger.top-navigation-bar__actions__icon').click().wait(1000)
  });

  it('Step 4',()=>{   //seleccionamos crear cita. Seleccionamos cliente PPSO
    cy.xpath("//button[contains(.,'Crear cita')]").click().wait(1000)
    cy.xpath('//button[@class="btn__secondary ng-star-inserted"][contains(.,"0311X - M. CONDE")]').scrollIntoView().click()
    cy.wait(1000)
    cy.get('input[data-placeholder="Buscar cliente..."]').click().type('Serg{enter}').wait(10000)
    cy.get('svg[class="icon ng-star-inserted"]').eq(1).click().wait(1000)
    cy.get('div[class="vehicle mb-3 ng-tns-c380-15 ng-star-inserted"]').eq(0).click().wait(1000)
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.wait(1000)
    cy.get(".navigation").click(1075, 75)
    cy.wait(1000)

    cy.contains('button','Mantenimiento').click().wait(3000)
    cy.get('input[formcontrolname="searchPackage"]').type("Test").wait(1000)
    cy.get('input[formcontrolname="createPackage"]').type("Test").wait(1000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
    cy.get('.mat-select-arrow').click().wait(2000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.xpath("//button[contains(.,'Aceptar')]").click()

    cy.get('.mat-select-arrow-wrapper').click().wait(3000)
    cy.contains(' Inspección y Mantenimiento ').click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
    cy.xpath("//button[contains(.,'Guardar')]").click()

  })

  it('Step 5',()=>{   //Accedemos pestaña intervenciones
    cy.get(".navigation").click(1075, 75).wait(3000)
    cy.get('div[class="mat-step-label mat-step-label-active mat-step-label-selected"]').should("have.text","Intervenciones").and("be.visible")
    cy.get('button[class="btn__primary mt-4 mr-2 mb-2"]').should("have.text"," Añadir nuevas intervenciones ").and("be.enabled")
    cy.get('button[class="btn__secondary mt-4 mb-2"]').should("have.text"," Editar descuentos ").and("be.enabled")
    cy.get('button[class="btn__secondary summary"]').should("have.text"," Resumen de la cita ").and("be.enabled")
    cy.get('button[class="btn__secondary summary mt-2"]').should("have.text"," Comentario ").and("be.enabled")
    cy.get('button[class="btn__secondary summary d-none d-md-block mt-2"]').should("have.text"," Histórico de intervenciones ").and("be.enabled")
  })

  it('Step 6',()=>{   //Pulsamos añadir nuevas intervenciones
    cy.xpath("//button[contains(.,'Añadir nuevas intervenciones')]").click().wait(3000)
  })

  it('Step 7',()=>{   //Añadimos intervencion por desgaste

    //Pendiente resolver
    cy.get('form.ng-untouched > :nth-child(2) > .col').contains("Intervenciones por desgaste").should("be.visible")
    cy.get('#mat-checkbox-30 > .mat-checkbox-layout > .mat-checkbox-inner-container').click({force:true})
    // cy.get('#mat-checkbox-20 > .mat-checkbox-layout > .mat-checkbox-inner-container').click({ force: true })
    cy.xpath("//button[contains(.,'Añadir selección')]").click()    
  })

  it('Step 8',()=>{   //Seleccionamos valor
    cy.get('.mat-select-arrow').click().wait(2000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.get('.mat-select-arrow-wrapper').click().wait(3000)
    cy.xpath("//span[@class='mat-option-text'][contains(.,'Inspección y Mantenimiento')]").click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.wait(3000)
  })

  it('Step 9',()=>{   //comprobamos informacion añadida
    cy.xpath("cy.get('#mat-checkbox-30 > .mat-checkbox-layout > .mat-checkbox-inner-container')").should("be.visible")
  })

  it("logout", () => {
    masterLogin.logout()
  });
})