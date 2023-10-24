//POM para los componentes de creacion de cita en One

import { clickOnAvailableSlot } from "./Hooks"

class One{


  //Creacion de cita estandar
citaestandar(){
    cy.get('body > app-root > main > one-layout-application > div > div > gopa-home > div > div:nth-child(1) > div').click()
    cy.wait(1000)
    cy.xpath('//button[@class="btn__secondary ng-star-inserted"][contains(.,"0311X - M. CONDE")]').scrollIntoView().click()
    cy.wait(1000)
    cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(5000).type('1111MMM{enter}')
    cy.wait(5000)
    cy.contains(' Audi A3 ').click({ force: true })
    cy.get('.customer-card').first().click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.wait(2500)
    cy.get(".navigation").click(1075, 75)
    cy.wait(2500)

    cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
    cy.get('input[formcontrolname="createPackage"]').type('test').wait(2000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)

    cy.get('.mat-select-arrow').click().wait(2000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.xpath("//button[contains(.,'Aceptar')]").click()

    cy.get('.mat-select-arrow-wrapper').click().wait(3000)
    cy.contains(' Inspección y Mantenimiento ').click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
    cy.xpath("//button[contains(.,'Guardar')]").click()
    cy.get(".navigation").click(1075, 75)
    cy.wait(1000)
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
    cy.get('.cdk-column-discount > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('50')
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
    cy.get(".navigation").click(1075, 75).wait(2000)

    cy.xpath("(//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')])[1]")
      .click().wait(1000)
    cy.xpath("//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')]")
      .click().wait(1000)

    cy.get(".navigation").click(1075, 75)
    cy.get('.ng-valid > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click()
    cy.contains('Cualquier asesor').click()
    cy.wait(8000)
    clickOnAvailableSlot()
    clickOnAvailableSlot('entrega')
    cy.get('.navigation__navs > .btn__primary').wait(3000).click()
    cy.wait(2000)
    cy.visit("/")
    }
    //Fin creacion cita estandar


    //Creacion cita con cliente con PPSO
    citaPPSO(){
    cy.get('body > app-root > main > one-layout-application > div > div > gopa-home > div > div:nth-child(1) > div').click()
    cy.wait(1000)
    cy.xpath('//button[@class="btn__secondary ng-star-inserted"][contains(.,"0311X - M. CONDE")]').scrollIntoView().click()
    cy.wait(1000)
    cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(5000).type('8399JZZ{enter}')
    cy.wait(5000)
    cy.contains(' Volkswagen T-ROC T-Roc Gasolina 1.5 TFSI ').click({ force: true })
    cy.get('.customer-card').first().click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.wait(2500)
    cy.get(".navigation").click(1075, 75)
    cy.wait(2500)

    cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
    cy.get('div[class="mat-form-field-wrapper ng-tns-c114-27"]').scrollIntoView().type('test').wait(2000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)

    cy.get('.mat-select-arrow').click().wait(2000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.xpath("//button[contains(.,'Aceptar')]").click()

    cy.get('.mat-select-arrow-wrapper').click().wait(3000)
    cy.contains(' Inspección y Mantenimiento ').click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
    cy.xpath("//button[contains(.,'Guardar')]").click()
    cy.get(".navigation").click(1075, 75)
    cy.wait(1000)
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
    cy.get('.cdk-column-discount > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('50')
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
    cy.get(".navigation").click(1075, 75).wait(2000)

    cy.xpath("(//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')])[1]")
      .click().wait(1000)
    cy.xpath("//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')]")
      .click().wait(1000)

    cy.get(".navigation").click(1075, 75)
    cy.get('.ng-valid > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click()
    cy.contains('Cualquier asesor').click()
    cy.wait(8000)
    clickOnAvailableSlot()
    clickOnAvailableSlot('entrega')
    cy.get('.navigation__navs > .btn__primary').wait(3000).click()
    cy.wait(2000)
    cy.visit("/")

  }
  // Fin creacion cita con cliente con PPSO

  // Citas desde diferidos
  citaestandarsinseleccionar(){
    cy.xpath('//button[@class="btn__secondary ng-star-inserted"][contains(.,"0311X - M. CONDE")]').scrollIntoView().click()
    cy.wait(1000)
    cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(5000).type('1111MMM{enter}')
    cy.wait(5000)
    cy.contains(' Audi A3 ').click({ force: true })
    cy.get('.customer-card').first().click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.wait(2500)
    cy.get(".navigation").click(1075, 75)
    cy.wait(2500)

    cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
    cy.get('input[formcontrolname="createPackage"]').type('test').wait(2000)
    cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)

    cy.get('.mat-select-arrow').click().wait(2000)
    cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
    cy.xpath("//button[contains(.,'Aceptar')]").click()

    cy.get('.mat-select-arrow-wrapper').click().wait(3000)
    cy.contains(' Inspección y Mantenimiento ').click()
    cy.xpath("//button[contains(.,'Aceptar')]").click()
    cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
    cy.xpath("//button[contains(.,'Guardar')]").click()
    cy.get(".navigation").click(1075, 75)
    cy.wait(1000)
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
    cy.get('.cdk-column-discount > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('50')
    cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
    cy.get(".navigation").click(1075, 75).wait(2000)

    cy.xpath("(//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')])[1]")
      .click().wait(1000)
    cy.xpath("//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')]")
      .click().wait(1000)

    cy.get(".navigation").click(1075, 75)
    cy.get('.ng-valid > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click()
    cy.contains('Cualquier asesor').click()
    cy.wait(8000)
    clickOnAvailableSlot()
    clickOnAvailableSlot('entrega')
    cy.get('.navigation__navs > .btn__primary').wait(3000).click()
    cy.wait(2000)
    cy.visit("/")
    }


}

export default One;