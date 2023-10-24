//POM para alojar todos los elementos comunes a Login y procesos similares

class OneLog {

    //Login estandar con usuario con rol de superadmin
    login() {   
        cy.visit("/",)
        cy.get("#username").type("sergio.garrido@siigroup-spain.com")
        cy.get("#password").type("Godella21!con")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
    }
    //Fin login estandar
    
    
    //Login para las pruebas de iSport
    loginiSport() {
        cy.visit("/",)
        cy.get("#username").type("")
        cy.get("#password").type("")
        cy.get('#passwordTab > form > :nth-child(4) > .btn').should("be.visible").click()
    }
    //Fin login Isport


    // Logout común para todas las pruebas
    logout() {
        cy.visit('/')
        cy.get('.top-navigation-bar__actions > .userIcon').click()
        cy.get('.mat-menu-content > :nth-child(2)').click()
    }
    // Fin logout



    //Selector de instalacion  54AG0 (se usa para las pruebas iSport)
    Inst54AG0(){
        cy.get('.top-navigation-bar__actions > .m-0').click({ force:true })
        cy.xpath("//button[@class='mat-focus-indicator mat-menu-item'][contains(.,'54AG0 - AUDI CENTER CAMPO DE GIBRALTAR')]").scrollIntoView().click()
    }
    //Fin selector instalacion


    //Selector instalacion 0311X (se usa para el resto de las pruebas)
    Inst0311X(){
        cy.get('.top-navigation-bar__actions > .m-0').click({ force:true })
        cy.xpath("//button[@class='mat-focus-indicator mat-menu-item'][contains(.,'0311X - M. CONDE')]").scrollIntoView().click()
    }
    //Fin selector
}

export default OneLog;