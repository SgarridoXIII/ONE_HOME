//POM para los componentes comunes al flujo de recepción

class OneRecep{


    //Firma de cliente y asesor en los procesos de recepción (común a ambos, recespcion normal y recepcion sin cita)
    firmaRecepcion(){
        cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').scrollIntoView()
        cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50);
        cy.get(':nth-child(2) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50);
    
        cy.xpath("//button[@class='btn__primary ng-star-inserted'][contains(.,'Finalizar')]").should("be.enabled").click()
        cy.intercept("POST","https://apim-pre.kube.vged.es/one-1.0/one/signatures").as("signaturesPOST");
        cy.wait("@signaturesPOST").then((interception)=>{
          expect(interception.response.statusCode).to.eq(200);
        })
    }
    //Fin de firma

    // Firma recepcion en PRO
    firmaRecepcionPro(){
      cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').scrollIntoView()
      cy.get('.row > :nth-child(1) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50);
      cy.get(':nth-child(2) > .signature > one-signature-box > section > .signature-container > .ng-star-inserted > canvas').click(50, 50);
  
      cy.xpath("//button[@class='btn__primary ng-star-inserted'][contains(.,'Finalizar')]").should("be.enabled").click()
      cy.intercept("POST","https://apim.vged.es/one-1.0/one/signatures").as("signaturesPOST");
      cy.wait("@signaturesPOST").then((interception)=>{
        expect(interception.response.statusCode).to.eq(200);
      })
  }


}

export default OneRecep