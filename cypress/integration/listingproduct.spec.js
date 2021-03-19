import {ListingParameter} from "../fixtures/input/parameters.js";
import {FilterProduct,AssertFilteredProduct,ClickBidOrBuy,CloseModalWindow,AssertProductDetailPage,VisitProductDetailPage} from "./listingproduct.method"

describe('Add New Job', function () {

  before(() => {     
    cy.viewport ('macbook-13');

      //visit baseURL parameter in cypress.json
      cy.visit('/')
      CloseModalWindow();
})
 
    it('Filter Product ', function () { 
      
      FilterProduct(ListingParameter.category,ListingParameter.filter);
      AssertFilteredProduct(ListingParameter.filter)
      AssertProductDetailPage()
      cy.wait(3000)
      ClickBidOrBuy();

    }) 



  
})