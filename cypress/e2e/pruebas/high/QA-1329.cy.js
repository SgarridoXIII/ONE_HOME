Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

function generateRandomNumber() {
  const characters = '0123456789';
  return Array.from({length: 7}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}
function generateRandomNumberOne() {
  const characters = '1234';
  return Array.from({length: 1}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

describe('QA-1329 - Recepciones_Detalle del pedido_Intervenciones_Añadir intervención_otras intervenciones', ()=>{
  // Accedemos a la URL de ONE - Volkswagen
  before(() => {
        cy.task("generateOTP", "42SITBH2CBZTZDO3");
        cy.clearCookies()
        cy.clearLocalStorage()
      })

    it('Step 1 ', () => {
    cy.visit("/")
    cy.wait(1000) 
  })

  // Introducimos usuario o email y contraseña y pulsamos Acceder
  it('step 2', () => {
    cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
    cy.wait(1000)
  });

  // Desde la pantalla "Home", pulsamos sobre el botón Recepciones
  it('step 3', () => {
    cy.get(':nth-child(2) > .shortcut').click()
    cy.wait(1000)
  });
  
  // Pulsamos sobre la flecha > de uno de los pedidos del listado
  it('step 4', () => {
    cy.get('mat-icon').should('have.text', 'close').click()
    cy.wait(3000)
    cy.get('one-card-appointment').eq(generateRandomNumberOne()).click()
    cy.wait(1000)
    console.log('generateRandomNumberOne', generateRandomNumberOne());
  });
  
  // Nos situamos en la pestaña Intervenciones
  it('step 5', () => {
    cy.get('.sidebar > :nth-child(7)').click()
    cy.wait(1000)
  });
  
  // Pulsamos el botón Añadir intervención
  it('step 6', () => {
    cy.get('.btn__secondary').eq(1).should('include.text', 'Añadir intervención').click()
    cy.wait(1000)
  });
  
  // Añadimos manualmente una intervención (Añadir otras intervenciones)
  it('step 7', () => {
    cy.get('input[formcontrolname="createPackage"]').type(`test${generateRandomNumber()}`)
    cy.wait(1000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
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
  });
  
  // Rellenamos los apartados de recambios, mano de obra y fluidos
  it('step 8', () => {  
    cy.get('mat-expansion-panel-header').eq(0).click()
    cy.wait(1000)
    
    cy.get('h6').eq(0).should('have.text', 'Recambios').click()
    cy.wait(1000)
    cy.get('svg[matTooltip="Añadir"]').eq(0).click()
    cy.wait(1000)
    cy.get('one-card-package-expansion-v2-content-parts').find('tbody').then($e => {
      let validate = $e.find('.cdk-column-referenceNumber').length
      if(validate > 1){
        cy.get($e.find('.cdk-column-referenceNumber')).eq(validate - 1).type('ZTW315401VPSWM{enter}')
        cy.wait(10000)
      } else {
        cy.get($e.find('.cdk-column-referenceNumber')).eq(0).type('ZTW315401VPSWM{enter}')
        cy.wait(10000)
      }
    })

    // cy.get('mat-option').eq(1).click()
    // cy.wait(1000)
    cy.get('.d-flex > mat-icon').click()
    cy.wait(1000)
    cy.get('.mat-menu-item').eq(0).click()
    cy.wait(1000)
    cy.reload()
    cy.wait(1000)

    cy.get('.sidebar > :nth-child(7)').click()
    cy.wait(1000)
    cy.get('mat-expansion-panel-header').eq(0).click()
    cy.wait(1000)
    cy.get('h6').eq(2).should('have.text', 'Fluidos').click()
    cy.wait(1000)
    cy.get('svg[matTooltip="Añadir"]').eq(2).click()
    cy.wait(1000)
    cy.get('one-card-package-expansion-v2-content-fluids').find('tbody').then($e => {
      let validate = $e.find('.cdk-column-referenceNumber').length
      if(validate > 1){
        cy.get($e.find('.cdk-column-referenceNumber')).eq(validate - 1).type(`Test${generateRandomNumber()}`)
        cy.wait(1000)
        cy.get($e.find('.mat-column-name')).eq(validate - 1).type(`Test${generateRandomNumber()}`)
        cy.wait(1000)
        cy.get($e.find('.mat-column-quantityLiters')).eq(validate - 1).clear().type(1)
        cy.wait(1000)
        cy.get($e.find('.mat-column-price')).eq(validate - 1).clear().type(1)
        cy.wait(1000)
        cy.get('.d-flex > mat-icon').click()
        cy.wait(1000)
        cy.get('.mat-menu-item').eq(0).click()
        cy.wait(1000)
        cy.get($e.find('.mat-column-price')).eq(validate - 1).type(1)
        cy.wait(1000)
      } else {
        cy.get($e.find('.cdk-column-referenceNumber')).eq(0).type(`Test${generateRandomNumber()}`)
        cy.wait(1000)
        cy.get($e.find('.mat-column-name')).eq(0).type(`Test${generateRandomNumber()}`)
        cy.wait(1000)
        cy.get($e.find('.mat-column-quantityLiters')).eq(0).clear().type(1)
        cy.wait(1000)
        cy.get($e.find('.mat-column-price')).eq(0).clear().type(1)
        cy.wait(1000)
        cy.get('.d-flex > mat-icon').click()
        cy.wait(1000)
        cy.get('.mat-menu-item').eq(0).click()
        cy.wait(1000)
        cy.get($e.find('.mat-column-price')).eq(0).type(1)
        cy.wait(1000)
      }
    })
    // cy.get('mat-option').eq(1).click()
    // cy.wait(1000)

    cy.get('.d-flex > mat-icon').click()
    cy.wait(1000)
    cy.get('.mat-menu-item').eq(0).click()
    cy.wait(1000)
    
    cy.get('mat-expansion-panel').should('not.have.class', 'mat-expanded')
    cy.wait(1000)
  });
  
  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })  
})