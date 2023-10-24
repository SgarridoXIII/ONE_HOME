Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />

const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1572 E2E_Recepciones_Detalle del pedido_Cliente_Reasignar cliente_Iniciar recepción_Finalizar', () => {


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

    it("Step 3", () => { //Acceder a crear cita

        cy.get('body > app-root > main > one-layout-application > div > div > gopa-home > div > div:nth-child(1) > div').click()
        cy.wait(1000)
    })

    it("Step 4", () => { //Crear cita

        cy.xpath('//button[@class="btn__secondary ng-star-inserted"][contains(.,"0311X - M. CONDE")]').scrollIntoView().click()
        cy.wait(1000)
        cy.get('div.w-100 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click().wait(5000).type('1111MMM{enter}')
        // cy.get('#mat-input-3').type('1111MMM{enter}')
        cy.wait(5000)
        cy.contains(' Audi A3 ').click({ force: true })
        cy.get('.customer-card').first().click()
        cy.get('.col-12 > .btn__primary').click()
        cy.wait(2500)
        cy.get(".navigation").click(1075, 75)
        cy.wait(2500)

        cy.get('div.w-100 > .flex-wrap > :nth-child(1)').click()
        cy.get(':nth-child(5) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').type('test').wait(2000)
        // cy.get('#mat-input-7').type('test').wait(8000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000).wait(1000)

        //

        cy.get('.mat-select-arrow').click().wait(2000)
        // cy.get('#mat-option-28 > .mat-option-text').click().wait(1000)
        cy.get('.mat-option-text').contains('Cliente').click().wait(1000)
        cy.get('.col-12 > .btn__primary').click()


        cy.get('.mat-select-arrow-wrapper').click().wait(3000)
        cy.contains(' Inspección y Mantenimiento ').click()
        cy.get('.col-12 > .btn__primary').click()
        cy.get('.cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('2').wait(2000)
        cy.get('.col-12 > .btn__primary').click()
        cy.get(".navigation").click(1075, 75)
        cy.wait(1000)
        cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
        cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
        cy.get('.cdk-column-discount > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').clear().type('50')
        cy.get('#mat-expansion-panel-header-2 > .mat-expansion-indicator').click()
        cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click()
        cy.get(".navigation").click(1075, 75).wait(2000)

        //test
        cy.xpath("(//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')])[1]")
            .click().wait(1000)
        cy.xpath("//button[@class='btn__secondary m-2 ng-star-inserted'][contains(.,'Clásica')]")
            .click().wait(1000)

        cy.get(".navigation").click(1075, 75)
        cy.get('.ng-valid > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > input').click()
        cy.contains('Cualquier asesor').click()
        cy.wait(8000)
        cy.xpath("//div[@class='appointment-hours__hour ng-star-inserted']").first().click()
        cy.wait(2000)
        cy.xpath("//div[@class='appointment-hours__hour ng-star-inserted']").last().click()
        cy.wait(2000)
        cy.get('.navigation__navs > .btn__primary').wait(3000).click()
        cy.wait(2000)
        //Fin crear cita
    })

    it('Step 5',()=>{   //Desde la home pulsamos en Recepciones

        cy.visit("/")
        cy.contains('Recepciones').click()
        cy.wait(2000)

    })

    it('Step 6', () => {  //Seleccionamos nuestra cita

        cy.xpath("//span[@class='mat-button-wrapper'][contains(.,'close')]").click()
        cy.wait(3000)
        cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator > .mat-button-wrapper > .mat-datepicker-toggle-default-icon').click()
        cy.wait(5000)
        cy.get('.mat-calendar-body-today').click()
        cy.get('.mat-calendar-body-today').click()
        cy.wait(8000)
        cy.get('.card-appointment__content__appointment-info').last().click()
        cy.wait(3000)

    })

    it('Step 7', () => {    //Nos colocamos en la pestaña Cliente  y pulsamos reasignar
        cy.contains("Cliente").click()
        cy.wait(1000)
        cy.contains("Reasignar cliente").should("be.enabled").click()
        
        
    })


    it('Step 8', () => {   // Seleccionamos cliente e iniciamos recepcion
        cy.xpath("//input[@formcontrolname='search']").wait(5000).type("Edu").wait(12000)
        cy.contains(" edu diaz  ").click().wait(1000)
        cy.xpath("//button[contains(.,'Iniciar recepción')]").click()  
        
    })

    it('Step 9',()=>{   // Actualizamos km 
        cy.xpath("//button[contains(.,'Aceptar')]").click().wait(2000)
    })

    it('Step 10',()=>{  //Rellenamos pestañas
        cy.get('svg.navigation__navs__next').click().wait(2000)
        cy.get('.flex-auto > :nth-child(3)').then($button => {
            if ($button.is(':disabled')) {
                cy.wait(1000)
            } else {
                $button.click()
                cy.wait(3000)
            }
        })
        cy.get('svg.navigation__navs__next').click().wait(2000)
        cy.get('svg.navigation__navs__next').click().wait(2000)
        cy.get('svg.navigation__navs__next').click().wait(2000)
        cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').scrollIntoView().click(50, 50);
        cy.get(':nth-child(2) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50)
    })
    

    it('Step 11',()=>{   //Comprobar email
        cy.wait(2000)        
    })

    it("logout", () => {
        cy.visit("/")
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000)
    })



})