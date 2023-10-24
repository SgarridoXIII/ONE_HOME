//clickOnAvailableSlot: Valida para ambos casos recepcion y entrega los dias y horas disponibles Ejemplos: 
// clickOnAvailableSlot()
// clickOnAvailableSlot('entrega')
function clickOnAvailableSlot(action) {
  cy.get('.appointment-hours__hour').then($event => {
    if($event.hasClass('appointment-hours__hour ng-star-inserted')){
      action ? cy.xpath("//div[@class='appointment-hours__hour ng-star-inserted']").last().click({force:true})
      : cy.xpath("//div[@class='appointment-hours__hour ng-star-inserted']").first().click({force:true})
      cy.wait(1000)
    }else{
      cy.get('svg[class="day-selector__next"]').click()
      action ? clickOnAvailableSlot(action) : clickOnAvailableSlot()
    }
  })
}

export {
  clickOnAvailableSlot
}