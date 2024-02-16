/// <reference types='Cypress' />

describe('Test cases for Shopping Cart', () => {
    let dataUser;

    before(() => {
      cy.fixture('DataJulio.json').then((data) => {
        dataUser = data;
      });
    });

    beforeEach(() => {
        cy.visit('https://mcstaging.julio.com/')
        })

    context('Shopping Cart', () => {
    //Test CART-001: Verificar que se pueda eliminar un producto del CART y se realice la actualización del SUMMARY
      it('CART-001: Verify that a product can be removed from the CART and the SUMMARY is updated accordingly.', () => {

        // Obtener el valor inicial del contador del carrito a través de comando getInitialCartCount (Revisar archivo commands.js)
        cy.getInitialCartCount().then((initialCount) => {

        
          // Hacer clic en una talla en el detalle del producto (PDP)
          cy.visit("https://mcstaging.julio.com/zapatos/flats-y-mocasines/mocasin-cadeena-animal-print-piel")

          // Hacer clic en el botón "Agregar al carrito"
          cy.get('#product-addtocart-button').click()
          
          //Verificar mensaje de confirmación
          cy.get('.message-success').should("be.visible")

          // Utilizar el comando personalizado para verificar que el contador del carrito se ha actualizado
          
          // Hacer clic en una talla en el detalle del producto (PDP)
          cy.visit("https://mcstaging.julio.com/abrigo-con-textura-largo-3-4-botones-metalicos-825025")

          // Hacer clic en el botón "Agregar al carrito"
          cy.get('#product-addtocart-button').click()
          
          //Verificar mensaje de confirmación
          cy.get('.message-success').should("be.visible")
          
          initialCount= initialCount+2

          //Utiliza el comando personalizado para verificar que el contador del carrito se ha actualizado
          cy.checkCartCounter(initialCount)

          //Abre el MiniCart
          cy.get('.showcart').click()
          
          //Acceder al Carrito de compras
          cy.contains('span', 'Ir a la Bolsa').click()
          
          
          //Eliminar el primer producto que esta en el carrito
          cy.get('a.action-delete').first().click();

          //Utiliza el comando personalizado para verificar que el contador del carrito se ha actualizado
          cy.checkCartCounter(initialCount-1)

        });
      });

      //Test CART-002: Verificar que se puedan eliminar todos los productos del CART y se realice la actualización del SUMMARY
      it('CART-002: Verify that all products can be removed from the CART and the SUMMARY is updated accordingly.', () => {

        // Obtener el valor inicial del contador del carrito a través de comando getInitialCartCount (Revisar archivo commands.js)
        cy.getInitialCartCount().then((initialCount) => {

        
          // Hacer clic en una talla en el detalle del producto (PDP)
          cy.visit("https://mcstaging.julio.com/zapatos/flats-y-mocasines/mocasin-cadeena-animal-print-piel")

          // Hacer clic en el botón "Agregar al carrito"
          cy.get('#product-addtocart-button').click()
          
          //Verificar mensaje de confirmación
          cy.get('.message-success').should("be.visible")

          // Utilizar el comando personalizado para verificar que el contador del carrito se ha actualizado
          
          // Hacer clic en una talla en el detalle del producto (PDP)
          cy.visit("https://mcstaging.julio.com/abrigo-con-textura-largo-3-4-botones-metalicos-825025")

          // Hacer clic en el botón "Agregar al carrito"
          cy.get('#product-addtocart-button').click()
          
          //Verificar mensaje de confirmación
          cy.get('.message-success').should("be.visible")
          
          initialCount= initialCount+2

          //Utiliza el comando personalizado para verificar que el contador del carrito se ha actualizado
          cy.checkCartCounter(initialCount)

          //Abre el MiniCart
          cy.get('.showcart').click()
          
          //Acceder al Carrito de compras
          cy.contains('span', 'Ir a la Bolsa').click()
          
          cy.eliminarTodosLosProductos();

          //Validar Carrito Vacio
          cy.get('.cart-empty > h1').should('exist');

        });
      });


      //Test CART-003: Verificar que se puede reducir la cantidad a comprar de un producto y se realice la actualización del SUMMARY 
      it('CART-003: .', () => {

        // Obtener el valor inicial del contador del carrito a través de comando getInitialCartCount (Revisar archivo commands.js)
        cy.getInitialCartCount().then((initialCount) => {

        
          // Hacer clic en una talla en el detalle del producto (PDP)
          cy.visit("https://mcstaging.julio.com/zapatos/flats-y-mocasines/mocasin-cadeena-animal-print-piel")

          // Hacer clic en el botón "Agregar al carrito"
          cy.get('#product-addtocart-button').click()
          
          //Verificar mensaje de confirmación
          cy.get('.message-success').should("be.visible")

          // Hacer clic en el botón "Agregar al carrito"
          cy.get('#product-addtocart-button').click()
          
          //Verificar mensaje de confirmación
          cy.get('.message-success').should("be.visible")

          // Utilizar el comando personalizado para verificar que el contador del carrito se ha actualizado
          
          // Hacer clic en una talla en el detalle del producto (PDP)
          cy.visit("https://mcstaging.julio.com/abrigo-con-textura-largo-3-4-botones-metalicos-825025")

          // Hacer clic en el botón "Agregar al carrito"
          cy.get('#product-addtocart-button').click()
          
          //Verificar mensaje de confirmación
          cy.get('.message-success').should("be.visible")
          
          initialCount= initialCount+3

          //Utiliza el comando personalizado para verificar que el contador del carrito se ha actualizado
          cy.checkCartCounter(initialCount)

          //Abre el MiniCart
          cy.get('.showcart').click()
          
          //Acceder al Carrito de compras
          cy.contains('span', 'Ir a la Bolsa').click()
          
          // Usar el comando ajustado para reducir la cantidad del primer producto y verificar el total del carrito
          cy.reducirCantidadPrimerProductoYVerificar('.total-carrito');
        });
      });


      // ADDP-005: Verificar que permita añadir un Producto al Carrito y Continuar Comprando - Guest
      it('ADDP-005: Verify that it allows you to add a Product to the Cart and Continue Shopping - Guest', () => {

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