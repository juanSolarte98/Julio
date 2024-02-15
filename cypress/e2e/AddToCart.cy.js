/// <reference types='Cypress' />

describe('Test cases for Add To Cart flow', () => {
    let dataUser;

    before(() => {
      cy.fixture('DataJulio.json').then((data) => {
        dataUser = data;
      });
    });

    beforeEach(() => {
        cy.visit('https://mcstaging.julio.com/')
        })

    context('Add to cart flow', () => {
    //Test case #2: Verificar que permita añadir un Producto al Carrito desde la Página de Detalle de Producto (PDP) - Guest
      it('ADDP-002: Verify that you can add a Product to the Cart from the Product Detail Page (PDP) - Guest', () => {

        // Obtener el valor inicial del contador del carrito a través de comando getInitialCartCount (Revisar archivo commands.js)
        cy.getInitialCartCount().then((initialCount) => {

        
          // Hacer clic en una talla en el detalle del producto (PDP)
          cy.visit("https://mcstaging.julio.com/zapatos/flats-y-mocasines/mocasin-cadeena-animal-print-piel")

          // Hacer clic en el botón "Agregar al carrito"
          cy.get('#product-addtocart-button').click()
          
          //Verificar mensaje de confirmación
          cy.get('.message-success').should("be.visible")


          // Utilizar el comando personalizado para verificar que el contador del carrito se ha actualizado
          cy.checkCartCounter(initialCount + 1)
        });
      });

      // ADDP-005: Verificar que permita añadir un Producto al Carrito y Continuar Comprando - Guest
      it.only('ADDP-005: Verify that it allows you to add a Product to the Cart and Continue Shopping - Guest', () => {

        cy.getInitialCartCount().then((initialCount) => {

            // Hacer clic en una talla en el detalle del producto (PDP)
            cy.visit("https://mcstaging.julio.com/zapatos/flats-y-mocasines/mocasin-cadeena-animal-print-piel")

            // Hacer clic en el botón "Agregar al carrito"
            cy.get('#product-addtocart-button').click()
          
            //Verificar mensaje de confirmación
            cy.get('.message-success').should("be.visible")

            //Utiliza el comando personalizado para verificar que el contador del carrito se ha actualizado
            cy.checkCartCounter(initialCount + 1)

            //Abre el MiniCart
            cy.get('.showcart').click()

            //Clic en botón "Ver carrito"
            cy.get('.continue-shopping-button').click()
            
        })
    })

    })
})