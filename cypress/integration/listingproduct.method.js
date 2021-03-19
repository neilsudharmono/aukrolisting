
let FilterProduct = (category,filter) => {

  //click category
  cy.get('a')
  .contains(category)
  .click()
  .wait(2000)

  //assert filter title is present
  cy.get('[class="filter-title"]')
  .contains('Parametry nabídky')
  .scrollIntoView()
  .should('exist')

  //assert filter listing value is exist
  cy.get('[class="mat-checkbox-label"]')
  .contains(filter)
  .scrollIntoView()
  .should('exist')

  //check filter value
  cy.get('[id="mat-checkbox-9-input"]')
  .scrollIntoView()
  .check({force:true}) 

}

let AssertFilteredProduct = (filter)  => {

  //Assert each product tile after filter is applied

  cy.get('list-card')
  .then((data)=>{
    
    for(var i = 0; i < data.length ; i++)
    {
      
      CloseModalWindow();

      cy.get('list-card')
      .eq(i)
      .scrollIntoView()
      .wait(2000)
      .contains(filter)
      .should('exist')
         
    }
    cy.wait(2000)
    VisitProductDetailPage(data)

    
  })
}

let VisitProductDetailPage = (data) => {

  //visit product detail page

  cy.wait(3000)
  
  if(data.length%2==1)
  {

    // If total product is odd we will visit 
    var select_data = (data.length/2)+1
    cy.get('list-card')
    .eq(select_data)
    .scrollIntoView()
    .within(()=>
    {
      cy.get('[class="doNotTrackViewCount"]')
      .first()
      .scrollIntoView()
      .click()
    })
  }
  else{
    var select_data= Math.floor(Math.random() * data.length); 
    cy.get('list-card')
    .eq(select_data)
    .scrollIntoView()
    .within(()=>
    {
      cy.get('[class="doNotTrackViewCount"]')
      .first()
      .scrollIntoView()
      .click()
    })

  }
}

let AssertProductDetailPage = () => {

  //assert element in product detail page and 3 blue shield icons
  cy.get('[class="sidebar-title h2 ng-star-inserted"]')
  .should('exist')

  cy.get('[class="sidebar-title h2 ng-star-inserted"]')
  .within(()=>
  {
    cy.get('[id="payment-via-aukro"]')
    .should('exist')

  })

  cy.get('delivery-info')
  .within(()=>
  {
    cy.get('[id="payment-via-aukro"]')
    .should('exist')

  })

  cy.get('[class="block-description"]')
  .within(()=>
  {
    cy.get('[id="payment-via-aukro"]')
    .should('exist')

  })

  cy.get('detail-images')
  .should('exist')
}




let CloseModalWindow = () => {
  
  cy.get("body").then($body => {
    if ($body.find('[class="material-icons big cursor-pointer vertical-bottom"]').length > 0) {   

  cy.get('[class="material-icons big cursor-pointer vertical-bottom"]')
  .contains('close')
  .click();

    }


})
}

let ClickBidOrBuy = () => {

  cy.get("body").then($body => {

    
    if($body.find('[class="btn-primary big fluid is-auction"]').length > 0) { 
      
      //If product only allow bid

        cy.get('[class="btn-primary big fluid is-auction"]')
        .click();

        cy.wait(1000)

        cy.get('login')
        .should('exist')

        cy.get('h1')
        .contains('Vítejte na Aukru!')

        cy.get('[formcontrolname="username"]')
        .should('exist')

        cy.get('[formcontrolname="password"]')
        .should('exist')

        cy.get('[type="submit"]')
        .contains('Přihlásit se')
        .should('exist')

    }
    else if($body.find('[class="btn-primary big fluid"]').length > 0)
    {
      //If product only allow buy

        cy.get('[class="btn-primary big fluid"]')
        .click();

        cy.get('[class="item-name"]')
        .invoke('text')
        .then((text)=>
        {
            cy.get('[class="sidebar-title h2 ng-star-inserted"]')
            .contains(text.trim())
        })

        

    }
    else
    {

      //If product only allow bid or buy

      cy.get('[class="btn-primary big fluid bidding-with-buy-now"]')
      .should('exist')

      cy.get('[class="btn-primary big fluid bidding-with-buy-now is-auction"]')
      .should('exist')

      var select_data= Math.floor(Math.random() * 1)

      if(select_data==0)
      {
        cy.get('[class="btn-primary big fluid bidding-with-buy-now"]')
      .click();

      cy.get('[class="item-name"]')
      .invoke('text')
      .then((text)=>
      {
          cy.get('[class="sidebar-title h2 ng-star-inserted"]')
          .contains(text.trim())
      })
      }
      else
      {
        cy.get('[class="btn-primary big fluid bidding-with-buy-now is-auction"]')
      .click();

      cy.get('login')
      .should('exist')

      cy.get('h1')
      .contains('Vítejte na Aukru!')

      cy.get('[formcontrolname="username"]')
      .should('exist')

      cy.get('[formcontrolname="password"]')
      .should('exist')

      cy.get('[type="submit"]')
      .contains('Přihlásit se')
      .should('exist')
      }

    }


})}


export { 
  FilterProduct,AssertFilteredProduct,ClickBidOrBuy,CloseModalWindow,AssertProductDetailPage,VisitProductDetailPage
};
