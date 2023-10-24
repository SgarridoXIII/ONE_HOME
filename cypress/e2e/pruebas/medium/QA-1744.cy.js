Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />

const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'
const video = 'test.mp4'

describe('Test QA-1744 Recepciones_Detalle del pedido_Información general_Iniciar recepción_Pestaña Estado del vehículo_Eliminar vídeo', () => {

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

    it('Step 3',()=>{   //Pulsamos Recepciones
        cy.contains("Recepciones").click()
    })

    it('Step 4',()=>{   //Elegimos un pedido
        cy.xpath("//span[@class='mat-button-wrapper'][contains(.,'close')]").click()
        cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(3000)
        cy.get(".card-vehicle__content").first().click()
        
        
    })

    it('Step 5',()=>{   //Pestaña informacion general
        cy.contains(" Sergio Garrido Benitez ").first().click()
    })

    it('Step 6',()=>{   //iniciamos recepcion
        cy.xpath("//button[contains(.,'Iniciar recepción')]").click()
        cy.xpath("//button[contains(.,'Aceptar')]").click()
    })

    it('Step 7',()=>{   //Comprobamos información
        cy.get('h3[class="my-5 bold"]').should("be.visible").should("have.text","Estado del vehículo")
        //cy.xpath("//div[@class='damages__add-damage'][contains(.,'*Capturar cuadro de instrumentos')]").should("be.visible").and("be.enabled")
        cy.get('p[class="damages__add-info__info-text"]').should("be.visible")
        cy.get('svg[class="damages__add-damage__icon"]').first().should("be.visible")
        cy.get('svg[class="damages__add-damage__icon"]').last().should("be.visible")

    })

    it('Step 8',()=>{   //Añadimos video
        cy.get('svg[class="damages__add-damage__icon"]').last().click()
        cy.get('.fileInput').attachFile(video)
        cy.xpath("//button[contains(.,'Guardar')]").click()
    })

    it('Step 9',()=>{   //Pulsamos sobre el video
        cy.get('video[id="video"]').click()
    })

    it('Step 10',()=>{  //Pulsamos eliminar
        cy.contains(" Eliminar ").click()
    })

    it('Step 11',()=>{  //No
        cy.xpath("//button[contains(.,'No')]").click()
    })

    it('Step 12',()=>{  // Eliminar y si
        cy.contains(" Eliminar ").click()
        cy.xpath("//button[contains(.,'Sí')]").click()
    })

    it('Logout', () => {
        cy.visit('http://one-pre.kube.vged.es/home')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000) //Fin logout
    })


})