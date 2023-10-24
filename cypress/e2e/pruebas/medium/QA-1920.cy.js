Cypress.on('uncaught:exception', (err, runnable) => { return false; });
/// <reference types="cypress" />

const asesor = 'Alberto Chicote'
const dia = '18'
const photo = 'polo.png'

describe('Test QA-1920 Recepciones_Iniciar recepción_pedido en estado Cita preparada ', () => {


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

    it('Step 4',()=>{   //Seleccionamos un pedido en estado recepcionado
        cy.xpath('/html/body/app-root/main/one-layout-application/div/div/one-your-work/div[1]/div[2]/one-filters-container-responsive/div/div/div[3]/mat-form-field/div/div[1]/div[4]/button/span/mat-icon').click();
        cy.get('.row > :nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.xpath("//input[contains(@formcontrolname,'search')]").type("1111MMM").wait(3000)
        cy.get(".card-vehicle__content").first().click()
        cy.contains(" Sergio Garrido Benitez ").first().click().wait(5000)
        cy.get('#mat-select-1 > .mat-select-trigger > .mat-select-value').then($estado=>{
            if($estado.text().includes("Cita preparada")){
                cy.wait(1000) 
            }else{$estado.click()
                cy.contains("Cita preparada").click().wait(1000)
                cy.xpath("//button[@class='btn__secondary mr-2'][contains(.,'Guardar cambios')]").click()           
            }
        })
        
        
    })

    it('Step 5',()=>{   //Añadimos una intervencion
        cy.contains("Intervenciones").click()
        cy.xpath("//button[contains(.,'Añadir intervención')]").click()
        cy.get(':nth-child(6) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').scrollIntoView().type('test').wait(2000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
        cy.get('.mat-select-arrow').click()
        cy.get('.mat-option-text').contains('Cliente').click()
        cy.get('.col-12 > .btn__primary').click()
    
    
        cy.get('.mat-select-arrow-wrapper').click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Inspección y Mantenimiento')]").click()
        cy.get('.col-12 > .btn__primary').click()
        cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').clear().type('2').wait(2000)
        cy.get('.col-12 > .btn__primary').click().wait(2000)
        cy.contains("Intervenciones").click({force:true})

        cy.get('.alert').then($button => {
            if ($button.is(':disabled')) {
                cy.wait(1000)
            } else {
                $button.click()
                
            }
        })
    })

    it('Step 6',()=>{   //En diferidos añadimos, descartamos y eliminamos intervenciones
        cy.contains("Intervenciones").click()

        for(let x=0; x<3; x++){
        cy.xpath("//button[contains(.,'Añadir intervención')]").click()
        cy.get(':nth-child(6) > .col > .row > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').scrollIntoView().type('test').wait(2000)
        cy.xpath("//button[contains(.,'Añadir intervención manual')]").scrollIntoView().click().wait(1000)
        cy.get('.mat-select-arrow').click()
        cy.get('.mat-option-text').contains('Cliente').click()
        cy.get('.col-12 > .btn__primary').click()
    
    
        cy.get('.mat-select-arrow-wrapper').click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Inspección y Mantenimiento')]").click()
        cy.get('.col-12 > .btn__primary').click()
        cy.get('.table--scroll > .mat-table > tbody > .mat-row > .cdk-column-quantityTime > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').clear().type('2').wait(2000)
        cy.get('.col-12 > .btn__primary').click().wait(2000)
        
        }
        cy.contains("Intervenciones").click({force:true})
        cy.get('.alert').then($button => {
            if ($button.is(':disabled')) {
                cy.wait(1000)
            } else {
                $button.click()
                
            }
        })

        //descartamos intervencion

        cy.get('svg[matTooltip="Descartar"]').first().click()
        cy.xpath("//button[@class='btn__primary ng-star-inserted'][contains(.,'Sí')]").click().wait(2000)
        //fin descartar intervemncion

        //eliminamos intervencion
        cy.get('svg[matTooltip="Eliminar"]').first().click()
        cy.xpath("//button[@class='btn__primary ng-star-inserted'][contains(.,'Sí')]").click().wait(2000)
        //fin eliminar intervencion



    }) 

    it('Step 7',()=>{ //Iniciamos recepcion
        cy.get('.btn__primary').click()      
    })

    it('Step 8',()=>{ //Actualizamos Km y aceptamos
        cy.get(':nth-child(2) > .col-12 > .btn__primary').click().wait(2000)
    })

    it('Step 9',()=>{ // Rellenamos pestañas
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
        cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()
        cy.get('#mat-checkbox-3 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()
        cy.get('#mat-checkbox-4').click();
        cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').scrollIntoView().click(50, 50);
        cy.get(':nth-child(2) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50);

    })

    it('Step 10',()=>{  //Email
        cy.wait(2000)
    })
    
    it("logout", () => {
        cy.visit("/")
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
        cy.wait(1000)
    })
})