Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />
require('cypress-plugin-tab')
require('cypress-xpath')
import 'cypress-file-upload'
const asesor = 'Alberto Chicote'
const photo = 'polo.png'

const fecha = new Date()
const hora = ['13:30', '15:30', '16:30', '17:30', '18:30']
const year = fecha.getFullYear()
const dia = fecha.getDate()
const monthNumber = fecha.getMonth()
const month = parserMonth()
let matricula = ''

function parserMonth() {
  switch (monthNumber) {
    case 0:
        return 'ENE'
    case 1:
       return 'FEB'
    case 2:
       return 'MAR'
    case 3:
       return 'ABR'
    case 4:
       return 'MAY'
    case 5:
       return 'JUN'
    case 6:
       return 'JUL'
    case 7:
       return 'AGO'
    case 8:
       return 'SEP'
    case 9:
       return 'OCT'
    case 10:
       return 'NOV'
  
    default:
       return 'DIC'
  }
}

function generateRandomNumber() {
  const characters = '01234';
  return Array.from({length: 3}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

describe('QA-2905 - ONE - Diferidos', () => {
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

  // Introducimos usuario o email y contraseña y pulsamos Acceder    
    cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
       // cy.get('#passwordTab > form > .col-xs-12 > .btn').should("be.visible").click()
        
        // cy.task("generateOTP").then(token => {
        //     cy.get('#otp').type(token);
        //   });

        // cy.get('.btn').click({force:true})
    cy.wait(1000)
  })

  // Pulsamos en el botón "Tablero" 
  it('step 2', () => {
    // Desde la pantalla  principal "Home", pulsamos en el botón "Más" en la barra superior de la página y pulsamos "Clientes"
    cy.get('.top-navigation-bar__options__navs > :nth-child(4)').click()
    cy.wait(1000)
  });
  
  // Desde la pantalla Tablero, seleccionamos una cita.
  it('step 3', () => {
    cy.get('.mat-icon.notranslate.material-icons.mat-icon-no-color').eq(0).click()
    cy.wait(1000)
    cy.get('.mat-icon.notranslate.material-icons.mat-icon-no-color').eq(0).click()
    cy.wait(1000)
    cy.get('.mat-icon.notranslate.material-icons.mat-icon-no-color').eq(0).click()
    cy.wait(1000)
    cy.get('.board__column__content__card').eq(0).click()
    cy.wait(1000)
  });
  
  // Desde el "Detalle del pedido" accedemos a la sección "Diferidos".
  it('step 4', () => {
    cy.get('.sidebar > :nth-child(8)').click()
    cy.wait(1000)
  });
  
  // Desde la pantalla "Diferidos" pulsamos en el botón "Añadir diferido".
  it('step 5', () => {
    cy.get('.btn__secondary').click()
    cy.wait(1000)
  });
  
  // Desde la pantalla Añadir intervenciones, agregamos una intervención.
  it('step 6', () => {
    cy.get('input[formcontrolname="createPackage"]').type(`test ${generateRandomNumber()}`)
    cy.wait(1000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
    cy.wait(1000)
    cy.get('.mat-select-arrow').click()
    cy.wait(1000)
    cy.get('mat-option').eq(0).click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.mat-select-arrow').click()
    cy.wait(1000)
    cy.get('mat-option').eq(1).click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').as('time')
    cy.get('@time').clear().type('1')
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    
    cy.get('.col > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.wait(1000)
    cy.contains(parserMonth()).click()
    cy.wait(1000)
    cy.get(':nth-child(4) > [data-mat-col="3"]').click()
    cy.wait(1000)
    cy.get(':nth-child(3) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.mat-snack-bar-container').should('have.text', 'Información actualizada correctamente')
    cy.wait(1000)

    cy.get('.btn__secondary').click()
    cy.wait(1000)
    cy.get('input[formcontrolname="createPackage"]').type(`test ${generateRandomNumber()}`)
    cy.wait(1000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
    cy.wait(1000)
    cy.get('.mat-select-arrow').click()
    cy.wait(1000)
    cy.get('mat-option').eq(0).click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.mat-select-arrow').click()
    cy.wait(1000)
    cy.get('mat-option').eq(1).click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').as('time')
    cy.get('@time').clear().type('1')
    cy.wait(1000)
    cy.get(':nth-child(2) > .col-12 > .btn__primary').click()
    cy.wait(1000)

    cy.get('.col > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.wait(1000)
    cy.contains(parserMonth()).click()
    cy.wait(1000)
    cy.get(':nth-child(4) > [data-mat-col="3"]').click()
    cy.wait(1000)
    cy.get(':nth-child(3) > .col-12 > .btn__primary').click()
    cy.wait(1000)
    cy.get('.mat-snack-bar-container').should('have.text', 'Información actualizada correctamente')
    cy.wait(1000)
  });
  
  // Seleccionamos el botón "Añadir" del diferido.
  it('step 7', () => {
    cy.get('mat-icon').eq(0).click({ force: true })
    cy.wait(1000)
    cy.get('button[role="menuitem"]').eq(0).click()
    cy.wait(1000)
    cy.get('.col-12 > .btn__primary').click()
    cy.wait(1000)
  });
  
  // Seleccionamos el botón "Descartar" del diferido.
  it('step 8', () => {
    cy.get('.sidebar > :nth-child(8)').click()
    cy.wait(1000)
    cy.get('mat-icon').eq(0).click({ force: true })
    cy.wait(1000)
    cy.get('button[role="menuitem"]').eq(1).click()
    cy.wait(1000)
    cy.get('.sidebar > :nth-child(4)').click()
    cy.wait(1000)
    cy.get('input[formcontrolname="license"]').then(e => {
      matricula = e.val()
      console.log('e.val()', e.val());
    })
    cy.wait(1000)
    cy.visit("/")
  });
  
  // Accedemos a la pantalla "Gestión de diferidos" y podemos visualizar el diferido al 
  // que tenemos asociado al pedido que estamos gestionando.
  it('step 9', () => {
    cy.get('.top-navigation-bar__options__navs > .mat-menu-trigger').click()
    cy.wait(1000)
    cy.get('.top-navigation-bar__options__navs__more-item').eq(6).click()
    cy.wait(1000)
    // cy.get('input[formcontrolname="license"]').type(matricula)
    cy.wait(1000)
    cy.get('.scroll-area > .ng-trigger').should('be.ok')
    cy.wait(1000)
  });

  it("logout", () => {
    cy.visit("/")
    cy.get('.top-navigation-bar__actions > .userIcon').click()
    cy.get('.mat-menu-content > :nth-child(2)').click()
    cy.wait(1000)
  })
})
