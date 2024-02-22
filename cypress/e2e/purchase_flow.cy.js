/// <reference types='Cypress' />

describe('Test cases for the purchase_flow', () => {
  let dataUser; // Variable para almacenar los datos cargados desde el JSON
  
  before(() => {

      // Cargar los datos desde el archivo JSON
      cy.fixture('DataJulio.json').then((data) => {
          dataUser = data;
      });
  });

  beforeEach(() => {
    cy.visit('https://mcstaging.julio.com/')
    })


  context('purchase flow', () => {        
      // Test case #1: Verificar flujo de compra para usuarios guest con método de envio domicilio
      it.only('PF-001: Verify purchase flow for guest users with home delivery method', () => {
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

          //Acceder a Paso 1 
          cy.get('.methods > :nth-child(2) > .action').click()
          cy.wait(2000)
          //Ingresar nombre
          

        cy.get('[name="shippingAddress.firstname"]').type(dataUser.nombre[0])
        //Ingresar apellido
        cy.get('[name="shippingAddress.lastname"]').type(dataUser.apellido[0])
        //Ingresar apellido
        //Ingresar dirección
        
        cy.get('[name="shippingAddress.street.0"').type(dataUser.street[0])
        //Selección de Departamente
        cy.get('select[name="shippingAddress.custom_attributes[state_custom]"]').children('option').then(options => {
          const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
          cy.get('select[name="shippingAddress.custom_attributes[state_custom]"]').select(firstRealOption);
        })
        //Selección de Ciudad         
        cy.get('select[name="shippingAddress.custom_attributes[city_custom]"]').children('option').then(options => {
          const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
          cy.get('select[name="shippingAddress.custom_attributes[city_custom]"]').select(firstRealOption);
        })
        //Selección de Zona
        cy.get('select[name="shippingAddress.custom_attributes[zone_custom]"]').children('option').then(options => {
          const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
          cy.get('select[name="shippingAddress.custom_attributes[zone_custom]"]').select(firstRealOption);
        })
        //Ingresar Codigo postal
        cy.get('[name="shippingAddress.postcode"]').type(dataUser.postcode)
        //Ingresar Telefono
        cy.get('[name="shippingAddress.telephone"]').type(dataUser.celular)
        //Click en botón "Siguiente"
        cy.get('.button').click()
        
        cy.get('.payment-method').each(($metodo) => {
          // Envolver el método de pago actual con Cypress para poder encadenar comandos de Cypress
          cy.wrap($metodo).find('input[type="radio"]').click();
      
          // Verificar que se muestra el contenido esperado para este método de pago
          cy.wrap($metodo).find('.payment-method-content').should('be.visible');
      
       });
      
    })
    // Test case #4: Verificar flujo de compra para usuarios logueados con método de envio retiro en tienda
    it('PF-004: Verify purchase flow for guest users with shipping method pick up in store', () => {
      // Hacer clic en el botón "Iniciar sesión"
      cy.contains('a', 'Iniciar sesión').click()
      // Llenar formulario de "Clientes registrados"
      <cy.get('#email').type(dataUser.email[1])
      cy.get('#pass').type(dataUser.password[0])
      //Hacer clic en ver contraseña
      cy.get('#show-password').click({ force: true })
      //Hacer clic en botón "Iniciar sesión"
      cy.get('#send2').click()
      //Acceder a un producto que se encuentra en el carrusel de home
      cy.get('a.product-item-link').eq(0).click({force : true })
      //Seleccionar primera talla
      cy.get('.swatch-attribute-options .swatch-option').first().then($firstOption => {
        if (!$firstOption.hasClass('selected')) {
            cy.wrap($firstOption).click();
          }
        });
      //Seleccionar método retiro en tienda
      cy.get('[id^="delivery-methods-Tienda"]').check();  
      //Añadir al carrito de compras
      cy.get('#product-addtocart-button').click()
      //Verificar mensaje
      cy.get('.message-success').should('be.visible')
      //Acceder al home
      cy.get('.logo').click()
      //Acceder a un producto que se encuentra en el carrusel de home
      cy.get('a.product-item-link').eq(1).click({force : true })
      //Seleccionar primera talla
      cy.get('.swatch-attribute-options .swatch-option').first().then($firstOption => {
        if (!$firstOption.hasClass('selected')) {
            cy.wrap($firstOption).click();
          }
        });    
      //Seleccionar método de envío
      cy.get('[id^="delivery-methods-Delivery"]').check();
      cy.get('button.action-accept').click()
      cy.get('button#product-addtocart-button').click()
      cy.get('.message-success').should('exist')        
      cy.get('.showcart').click()       
      //Click en botón "Pagar" ubicado en modal AñADISTE A TU CARRITO DE COMPRAS
      cy.get('button.checkout').click({force : true })
      //Ingresar nombre
      cy.get('[name="shippingAddress.firstname"]').type(dataUser.name[0])
      //Ingresar apellido
      cy.get('[name="shippingAddress.lastname"]').type(dataUser.lastName[0])
      //Ingresar apellido
      cy.get('[name="shippingAddress.company"]').type(dataUser.lastName[0])
      //Ingresar Numero de identifición
      cy.get('[name="shippingAddress.custom_attributes[identificacion]"').type(dataUser.identification_number[0])
      //Ingresar dirección
      cy.get('[name="shippingAddress.street[0]"').type(dataUser.street[0])
      //Selección de Departamente
      cy.get('select[name="shippingAddress.custom_attributes[state_custom]"]').children('option').then(options => {
        const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
        cy.get('select[name="shippingAddress.custom_attributes[state_custom]"]').select(firstRealOption);
      })
      //Selección de Ciudad         
      cy.get('select[name="shippingAddress.custom_attributes[city_custom]"]').children('option').then(options => {
        const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
        cy.get('select[name="shippingAddress.custom_attributes[city_custom]"]').select(firstRealOption);
      })
      //Selección de Zona
      cy.get('select[name="shippingAddress.custom_attributes[zone_custom]"]').children('option').then(options => {
        const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
        cy.get('select[name="shippingAddress.custom_attributes[zone_custom]"]').select(firstRealOption);
      })
      //Ingresar Codigo postal
      cy.get('[name="shippingAddress.postcode"]').type(dataUser.postcode)
      //Ingresar Telefono
      cy.get('[name="shippingAddress.telephone"]').type(dataUser.phone)
      //Click en botón "Siguiente"
      cy.get('.button').click()
      

      
      });
      
    })
    // Test case #2: Verificar flujo de compra para usuarios guest con método de envio retiro en tienda
    it('PF-002: Verify purchase flow for guest users with shipping method pick up in store', () => {
      //Acceder a un producto que se encuentra en el carrusel de home
      cy.get('a.product-item-link').eq(0).click({force : true })
      //Seleccionar primera talla
      cy.get('.swatch-attribute-options .swatch-option').first().then($firstOption => {
        if (!$firstOption.hasClass('selected')) {
            cy.wrap($firstOption).click();
          }
        });
      //Seleccionar método retiro en tienda
      cy.get('[id^="delivery-methods-Tienda"]').check();  
      //Añadir al carrito de compras
      cy.get('#product-addtocart-button').click()
      //Verificar mensaje
      cy.get('.message-success').should('be.visible')
      //Acceder al home
      cy.get('.logo').click()
      //Acceder a un producto que se encuentra en el carrusel de home
      cy.get('a.product-item-link').eq(1).click({force : true })
      //Seleccionar primera talla
      cy.get('.swatch-attribute-options .swatch-option').first().then($firstOption => {
        if (!$firstOption.hasClass('selected')) {
            cy.wrap($firstOption).click();
          }
        });    
      //Seleccionar método de envío
      cy.get('[id^="delivery-methods-Delivery"]').check();
      cy.get('button.action-accept').click()
      cy.get('button#product-addtocart-button').click()
      cy.get('.message-success').should('exist')        
      cy.get('.showcart').click()       
      //Click en botón "Pagar" ubicado en modal AñADISTE A TU CARRITO DE COMPRAS
      cy.get('button.checkout').click({force : true })
      //Ingresar correo electrónico
      cy.get('#customer-email').type(dataUser.email[0])
      //Ingresar nombre
      cy.get('[name="firstname"]').type(dataUser.name[0])
      //Ingresar apellido
      cy.get('[name="lastname"]').type(dataUser.lastName[0])
      //Ingresar apellido
      cy.get('[name="lastname"]').type(dataUser.lastName[0])
      //Ingresar Numero de identifición
      cy.get('[name="custom_attributes[identificacion]"').type(dataUser.identification_number[0])
      //Ingresar dirección
      cy.get('[name="street[0]"').type(dataUser.street[0])
      //Selección de Departamente
      cy.get('select[name="custom_attributes[state_custom]"]').children('option').then(options => {
        const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
        cy.get('select[name="custom_attributes[state_custom]"]').select(firstRealOption);
      })
      //Selección de Ciudad         
      cy.get('select[name="custom_attributes[city_custom]"]').children('option').then(options => {
        const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
        cy.get('select[name="custom_attributes[city_custom]"]').select(firstRealOption);
      })
      //Selección de Zona
      cy.get('select[name="custom_attributes[zone_custom]"]').children('option').then(options => {
        const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
        cy.get('select[name="custom_attributes[zone_custom]"]').select(firstRealOption);
      })
      //Ingresar Codigo postal
      cy.get('[name="postcode"]').type(dataUser.postcode)
      //Ingresar Telefono
      cy.get('[name="telephone"]').type(dataUser.phone)
      //Click en botón "Siguiente"
      cy.get('.button').click()
      
      cy.get('.payment-method').each(($metodo) => {
        // Envolver el método de pago actual con Cypress para poder encadenar comandos de Cypress
        cy.wrap($metodo).find('input[type="radio"]').click();
    
        // Verificar que se muestra el contenido esperado para este método de pago
        cy.wrap($metodo).find('.payment-method-content').should('be.visible');
    
     });
    
  })
      // Test case #3: Verificar flujo de compra para usuarios logueado con método de envio domicilio
      it('PF-003: Verify purchase flow for login users with home delivery method', () => {
        // Hacer clic en el botón "Iniciar sesión"
        cy.contains('a', 'Iniciar sesión').click()
        // Llenar formulario de "Clientes registrados"
        cy.get('#email').type(dataUser.email[0])
        cy.get('#pass').type(dataUser.password[1])
        //Hacer clic en ver contraseña
        cy.get('#show-password').click({ force: true })
        //Hacer clic en botón "Iniciar sesión"
        cy.get('#send2').click()
        //Acceder a un producto que se encuentra en el carrusel de home
        cy.get('a.product-item-link').eq(0).click({force : true })
        //Seleccionar primera talla
        cy.get('.swatch-attribute-options .swatch-option').first().then($firstOption => {
          if (!$firstOption.hasClass('selected')) {
              cy.wrap($firstOption).click();
            }
          });
        //Seleccionar método de envío
        cy.get('[id^="delivery-methods-Delivery"]').check();
        //Añadir al carrito de compras
        cy.get('#product-addtocart-button').click()
        //Verificar mensaje
        cy.get('.message-success').should('be.visible')
        //Acceder al home
        cy.get('.logo').click()
        //Acceder a un producto que se encuentra en el carrusel de home
        cy.get('a.product-item-link').eq(1).click({force : true })
        //Seleccionar primera talla
        cy.get('.swatch-attribute-options .swatch-option').first().then($firstOption => {
          if (!$firstOption.hasClass('selected')) {
              cy.wrap($firstOption).click();
            }
          });
        //Seleccionar método retiro en casa
        cy.get('[id^="delivery-methods-Tienda"]').check();   
        cy.get('button.action-accept').click()
        cy.get('button#product-addtocart-button').click()
        cy.get('.message-success').should('exist')        
        cy.get('.showcart').click()        
        //Click en botón "Pagar" ubicado en modal AñADISTE A TU CARRITO DE COMPRAS
        cy.get('button.checkout').click({force : true })
        //Ingresar nombre
        cy.get('[name="firstname"]').type(dataUser.name[0])
        //Ingresar apellido
        cy.get('[name="lastname"]').type(dataUser.lastName[0])
        //Ingresar apellido
        cy.get('[name="lastname"]').type(dataUser.lastName[0])
        //Ingresar Numero de identifición
        cy.get('[name="custom_attributes[identificacion]"').type(dataUser.identification_number[0])
        //Ingresar dirección
        cy.get('[name="street[0]"').type(dataUser.street[0])
        //Selección de Departamente
        cy.get('select[name="custom_attributes[state_custom]"]').children('option').then(options => {
          const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
          cy.get('select[name="custom_attributes[state_custom]"]').select(firstRealOption);
        })
        //Selección de Ciudad         
        cy.get('select[name="custom_attributes[city_custom]"]').children('option').then(options => {
          const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
          cy.get('select[name="custom_attributes[city_custom]"]').select(firstRealOption);
        })
        //Selección de Zona
        cy.get('select[name="custom_attributes[zone_custom]"]').children('option').then(options => {
          const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
          cy.get('select[name="custom_attributes[zone_custom]"]').select(firstRealOption);
        })
        //Ingresar Codigo postal
        cy.get('[name="postcode"]').type(dataUser.postcode)
        //Ingresar Telefono
        cy.get('[name="telephone"]').type(dataUser.phone)
        //Click en botón "Siguiente"
        cy.get('.button').click()
        
        cy.get('.payment-method').each(($metodo) => {
          // Envolver el método de pago actual con Cypress para poder encadenar comandos de Cypress
          cy.wrap($metodo).find('input[type="radio"]').click();
      
          // Verificar que se muestra el contenido esperado para este método de pago
          cy.wrap($metodo).find('.payment-method-content').should('be.visible');
      
       });
      
    })
    // Test case #4: Verificar flujo de compra para usuarios logueados con método de envio retiro en tienda
    it('PF-004: Verify purchase flow for guest users with shipping method pick up in store', () => {
      // Hacer clic en el botón "Iniciar sesión"
      cy.contains('a', 'Iniciar sesión').click()
      // Llenar formulario de "Clientes registrados"
      <cy.get('#email').type(dataUser.email[1])
      cy.get('#pass').type(dataUser.password[0])
      //Hacer clic en ver contraseña
      cy.get('#show-password').click({ force: true })
      //Hacer clic en botón "Iniciar sesión"
      cy.get('#send2').click()
      //Acceder a un producto que se encuentra en el carrusel de home
      cy.get('a.product-item-link').eq(0).click({force : true })
      //Seleccionar primera talla
      cy.get('.swatch-attribute-options .swatch-option').first().then($firstOption => {
        if (!$firstOption.hasClass('selected')) {
            cy.wrap($firstOption).click();
          }
        });
      //Seleccionar método retiro en tienda
      cy.get('[id^="delivery-methods-Tienda"]').check();  
      //Añadir al carrito de compras
      cy.get('#product-addtocart-button').click()
      //Verificar mensaje
      cy.get('.message-success').should('be.visible')
      //Acceder al home
      cy.get('.logo').click()
      //Acceder a un producto que se encuentra en el carrusel de home
      cy.get('a.product-item-link').eq(1).click({force : true })
      //Seleccionar primera talla
      cy.get('.swatch-attribute-options .swatch-option').first().then($firstOption => {
        if (!$firstOption.hasClass('selected')) {
            cy.wrap($firstOption).click();
          }
        });    
      //Seleccionar método de envío
      cy.get('[id^="delivery-methods-Delivery"]').check();
      cy.get('button.action-accept').click()
      cy.get('button#product-addtocart-button').click()
      cy.get('.message-success').should('exist')        
      cy.get('.showcart').click()       
      //Click en botón "Pagar" ubicado en modal AñADISTE A TU CARRITO DE COMPRAS
      cy.get('button.checkout').click({force : true })
      //Ingresar nombre
      cy.get('[name="firstname"]').type(dataUser.name[0])
      //Ingresar apellido
      cy.get('[name="lastname"]').type(dataUser.lastName[0])
      //Ingresar apellido
      cy.get('[name="lastname"]').type(dataUser.lastName[0])
      //Ingresar Numero de identifición
      cy.get('[name="custom_attributes[identificacion]"').type(dataUser.identification_number[0])
      //Ingresar dirección
      cy.get('[name="street[0]"').type(dataUser.street[0])
      //Selección de Departamente
      cy.get('select[name="custom_attributes[state_custom]"]').children('option').then(options => {
        const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
        cy.get('select[name="custom_attributes[state_custom]"]').select(firstRealOption);
      })
      //Selección de Ciudad         
      cy.get('select[name="custom_attributes[city_custom]"]').children('option').then(options => {
        const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
        cy.get('select[name="custom_attributes[city_custom]"]').select(firstRealOption);
      })
      //Selección de Zona
      cy.get('select[name="custom_attributes[zone_custom]"]').children('option').then(options => {
        const firstRealOption = options.get(1).value; // Suponiendo que el índice 0 es un placeholder
        cy.get('select[name="custom_attributes[zone_custom]"]').select(firstRealOption);
      })
      //Ingresar Codigo postal
      cy.get('[name="postcode"]').type(dataUser.postcode)
      //Ingresar Telefono
      cy.get('[name="telephone"]').type(dataUser.phone)
      //Click en botón "Siguiente"
      cy.get('.button').click()
      
      cy.get('.payment-method').each(($metodo) => {
        // Envolver el método de pago actual con Cypress para poder encadenar comandos de Cypress
        cy.wrap($metodo).find('input[type="radio"]').click();
    
        // Verificar que se muestra el contenido esperado para este método de pago
        cy.wrap($metodo).find('.payment-method-content').should('be.visible');
    
     });
    
    })
  })
  })