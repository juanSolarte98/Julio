/// <reference types='Cypress' />

describe("Test cases for the purchase_flow", () => {
  let dataUser; // Variable para almacenar los datos cargados desde el JSON

  before(() => {
    // Cargar los datos desde el archivo JSON
    cy.fixture("DataJulio.json").then((data) => {
      dataUser = data;
    });
  });

  beforeEach(() => {
    cy.visit("https://mcstaging.julio.com/");
  });

  context("purchase flow", () => {
    // Test case #1: Verificar flujo de compra para usuarios guest con método de envio domicilio
    it("PF-001: Verify purchase flow for guest users with home delivery method", () => {
      // Obtener el valor inicial del contador del carrito a través de comando getInitialCartCount (Revisar archivo commands.js)
      cy.getInitialCartCount().then((initialCount) => {
        // Hacer clic en una talla en el detalle del producto (PDP)
        cy.visit(
          "https://mcstaging.julio.com/zapatos/flats-y-mocasines/mocasin-cadeena-animal-print-piel"
        );

        // Hacer clic en el botón "Agregar al carrito"
        cy.get("#product-addtocart-button").click();

        //Verificar mensaje de confirmación
        cy.get(".message-success").should("be.visible");

        // Utilizar el comando personalizado para verificar que el contador del carrito se ha actualizado

        // Hacer clic en una talla en el detalle del producto (PDP)
        cy.visit(
          "https://mcstaging.julio.com/abrigo-con-textura-largo-3-4-botones-metalicos-825025"
        );

        // Hacer clic en el botón "Agregar al carrito"
        cy.get("#product-addtocart-button").click();

        //Verificar mensaje de confirmación
        cy.get(".message-success").should("be.visible");

        initialCount = initialCount + 2;

        //Utiliza el comando personalizado para verificar que el contador del carrito se ha actualizado
        cy.checkCartCounter(initialCount);

        //Abre el MiniCart
        cy.get(".showcart").click();

        //Acceder al Carrito de compras
        cy.contains("span", "Ir a la Bolsa").click();

        //Acceder a Paso 1
        cy.wait(5000);
        cy.get(".action.primary.checkout").click();
        //Ingresar nombre
        cy.get("#customer-email").type(dataUser.email[0]);
        //Ingresar nombre
        cy.get('[name="shippingAddress.firstname"]').type(dataUser.nombre[0]);
        //Ingresar apellido
        cy.get('[name="shippingAddress.lastname"]').type(dataUser.apellido[0]);
        //Ingresar apellido
        //Ingresar dirección

        cy.get('[name="shippingAddress.street.0"').type(dataUser.street[0]);

        //Selección de Departamente
        cy.get('select[name="custom_attributes[state_custom]"]').then(
          ($select) => {
            // Obtiene todas las opciones excepto la primera (asumiendo que es un placeholder)
            const $options = $select.find("option").not(":first-child");
            // Calcula un índice aleatorio basado en la cantidad de opciones
            const randomIndex = Math.floor(Math.random() * $options.length);
            // Obtiene el valor de la opción en el índice aleatorio
            const randomValue = $options.eq(randomIndex).val();
            // Selecciona la opción en el select
            cy.get('select[name="custom_attributes[state_custom]"]').select(
              randomValue
            );
          }
        );
        cy.wait(1000);
        //Selección de Ciudad
        cy.get('select[name="custom_attributes[city_custom]"]').then(
          ($select) => {
            // Obtiene todas las opciones excepto la primera (asumiendo que es un placeholder)
            const $options = $select.find("option").not(":first-child");
            // Calcula un índice aleatorio basado en la cantidad de opciones
            const randomIndex = Math.floor(Math.random() * $options.length);
            // Obtiene el valor de la opción en el índice aleatorio
            const randomValue = $options.eq(randomIndex).val();
            // Selecciona la opción en el select
            cy.get('select[name="custom_attributes[city_custom]"]').select(
              randomValue
            );
          }
        );

        cy.wait(1000);
        //Selección de Zona
        cy.get('select[name="custom_attributes[zone_custom]"]').then(
          ($select) => {
            // Obtiene todas las opciones excepto la primera (asumiendo que es un placeholder)
            const $options = $select.find("option").not(":first-child");
            // Calcula un índice aleatorio basado en la cantidad de opciones
            const randomIndex = Math.floor(Math.random() * $options.length);
            // Obtiene el valor de la opción en el índice aleatorio
            const randomValue = $options.eq(randomIndex).val();
            // Selecciona la opción en el select
            cy.get('select[name="custom_attributes[zone_custom]"]').select(
              randomValue
            );
          }
        );

        //Ingresar Codigo postal
        cy.get('[name="shippingAddress.postcode"]').type(dataUser.postcode);
        //Ingresar Telefono
        cy.get('[name="shippingAddress.telephone"]').type(dataUser.celular);
        //Click en botón "Siguiente"
        cy.get('button[id="shipping-next-mobile-trigger"] span').click();
        cy.get("#checkmo").click({ force: true });
        cy.get("#place-order-trigger").click();
        cy.wait(10000);
        cy.contains("Gracias por tu compra").should("exist");
      });
    });
    // Test case #4: Verificar flujo de compra para usuarios logueados con método de envio retiro en tienda
    it("PF-002: Verify purchase flow for guest users with shipping method pick up in store", () => {
      // Obtener el valor inicial del contador del carrito a través de comando getInitialCartCount (Revisar archivo commands.js)
      cy.getInitialCartCount().then((initialCount) => {
        // Hacer clic en una talla en el detalle del producto (PDP)
        cy.visit(
          "https://mcstaging.julio.com/zapatos/flats-y-mocasines/mocasin-cadeena-animal-print-piel"
        );

        // Hacer clic en el botón "Agregar al carrito"
        cy.get("#product-addtocart-button").click();

        //Verificar mensaje de confirmación
        cy.get(".message-success").should("be.visible");

        // Utilizar el comando personalizado para verificar que el contador del carrito se ha actualizado

        // Hacer clic en una talla en el detalle del producto (PDP)
        cy.visit(
          "https://mcstaging.julio.com/abrigo-con-textura-largo-3-4-botones-metalicos-825025"
        );

        // Hacer clic en el botón "Agregar al carrito"
        cy.get("#product-addtocart-button").click();

        //Verificar mensaje de confirmación
        cy.get(".message-success").should("be.visible");

        initialCount = initialCount + 2;

        //Utiliza el comando personalizado para verificar que el contador del carrito se ha actualizado
        cy.checkCartCounter(initialCount);

        //Abre el MiniCart
        cy.get(".showcart").click();

        //Acceder al Carrito de compras
        cy.contains("span", "Ir a la Bolsa").click();

        //Acceder a Paso 1

        cy.wait(5000);
        cy.get("div.field.store")
          .find('input[type="radio"]:enabled')
          .first()
          .check({ force: true });
        cy.get(".action-primary").click();
        cy.wait(15000);
        cy.get(".action.primary.checkout").click();
        //Ingresar nombre
        cy.get("#customer-email").type(dataUser.email[0]);
        //Ingresar nombre
        cy.get('[name="shippingAddress.firstname"]').type(dataUser.nombre[0]);
        //Ingresar apellido
        cy.get('[name="shippingAddress.lastname"]').type(dataUser.apellido[0]);
        //Ingresar apellido
        //Ingresar dirección

        cy.get('[name="shippingAddress.street.0"').type(dataUser.street[0]);

        //Selección de Departamente
        cy.get('select[name="custom_attributes[state_custom]"]').then(
          ($select) => {
            // Obtiene todas las opciones excepto la primera (asumiendo que es un placeholder)
            const $options = $select.find("option").not(":first-child");
            // Calcula un índice aleatorio basado en la cantidad de opciones
            const randomIndex = Math.floor(Math.random() * $options.length);
            // Obtiene el valor de la opción en el índice aleatorio
            const randomValue = $options.eq(randomIndex).val();
            // Selecciona la opción en el select
            cy.get('select[name="custom_attributes[state_custom]"]').select(
              randomValue
            );
          }
        );
        cy.wait(1000);
        //Selección de Ciudad
        cy.get('select[name="custom_attributes[city_custom]"]').then(
          ($select) => {
            // Obtiene todas las opciones excepto la primera (asumiendo que es un placeholder)
            const $options = $select.find("option").not(":first-child");
            // Calcula un índice aleatorio basado en la cantidad de opciones
            const randomIndex = Math.floor(Math.random() * $options.length);
            // Obtiene el valor de la opción en el índice aleatorio
            const randomValue = $options.eq(randomIndex).val();
            // Selecciona la opción en el select
            cy.get('select[name="custom_attributes[city_custom]"]').select(
              randomValue
            );
          }
        );

        cy.wait(1000);
        //Selección de Zona
        cy.get('select[name="custom_attributes[zone_custom]"]').then(
          ($select) => {
            // Obtiene todas las opciones excepto la primera (asumiendo que es un placeholder)
            const $options = $select.find("option").not(":first-child");
            // Calcula un índice aleatorio basado en la cantidad de opciones
            const randomIndex = Math.floor(Math.random() * $options.length);
            // Obtiene el valor de la opción en el índice aleatorio
            const randomValue = $options.eq(randomIndex).val();
            // Selecciona la opción en el select
            cy.get('select[name="custom_attributes[zone_custom]"]').select(
              randomValue
            );
          }
        );

        //Ingresar Codigo postal
        cy.get('[name="shippingAddress.postcode"]').type(dataUser.postcode);
        //Ingresar Telefono
        cy.get('[name="shippingAddress.telephone"]').type(dataUser.celular);
        //Click en botón "Siguiente"
        cy.get('button[id="shipping-next-mobile-trigger"] span').click();
        cy.get("#checkmo").click({ force: true });
        cy.get("#place-order-trigger").click();
        cy.wait(10000);
        cy.contains("Gracias por tu compra").should("exist");
      });
    });

    // Test case #3: Verificar logueado flujo de compra para usuarios guest con método de envio domicilio
    it.only("PF-003: Verify purchase flow for login users with home delivery method", () => {
      
      // Hacer clic en el botón "Iniciar sesión"
      cy.get('div.login-julio span').click({ force: true })
      // Llenar formulario de "Clientes registrados"
      cy.get('#email').type(dataUser.email[0])
      cy.get('#pass').type(dataUser.password[0])   
      //Hacer clic en botón "Iniciar sesión"
      cy.get('#send2').click() 
      // Obtener el valor inicial del contador del carrito a través de comando getInitialCartCount (Revisar archivo commands.js)
      cy.getInitialCartCount().then((initialCount) => {
        // Hacer clic en una talla en el detalle del producto (PDP)
        cy.visit(
          "https://mcstaging.julio.com/zapatos/flats-y-mocasines/mocasin-cadeena-animal-print-piel"
        );

        // Hacer clic en el botón "Agregar al carrito"
        cy.get("#product-addtocart-button").click();

        //Verificar mensaje de confirmación
        cy.get(".message-success").should("be.visible");

        // Utilizar el comando personalizado para verificar que el contador del carrito se ha actualizado

        // Hacer clic en una talla en el detalle del producto (PDP)
        cy.visit(
          "https://mcstaging.julio.com/abrigo-con-textura-largo-3-4-botones-metalicos-825025"
        );

        // Hacer clic en el botón "Agregar al carrito"
        cy.get("#product-addtocart-button").click();

        //Verificar mensaje de confirmación
        cy.get(".message-success").should("be.visible");

        initialCount = initialCount + 2;

        //Utiliza el comando personalizado para verificar que el contador del carrito se ha actualizado
        cy.checkCartCounter(initialCount);

        //Abre el MiniCart
        cy.get(".showcart").click();

        //Acceder al Carrito de compras
        cy.contains("span", "Ir a la Bolsa").click();

        //Acceder a Paso 1
        cy.wait(5000);
        cy.get(".action.primary.checkout").click();
        //Ingresar nombre
        cy.get("#customer-email").type(dataUser.email[0]);
        //Ingresar nombre
        cy.get('[name="shippingAddress.firstname"]').type(dataUser.nombre[0]);
        //Ingresar apellido
        cy.get('[name="shippingAddress.lastname"]').type(dataUser.apellido[0]);
        //Ingresar apellido
        //Ingresar dirección

        cy.get('[name="shippingAddress.street.0"').type(dataUser.street[0]);

        //Selección de Departamente
        cy.get('select[name="custom_attributes[state_custom]"]').then(
          ($select) => {
            // Obtiene todas las opciones excepto la primera (asumiendo que es un placeholder)
            const $options = $select.find("option").not(":first-child");
            // Calcula un índice aleatorio basado en la cantidad de opciones
            const randomIndex = Math.floor(Math.random() * $options.length);
            // Obtiene el valor de la opción en el índice aleatorio
            const randomValue = $options.eq(randomIndex).val();
            // Selecciona la opción en el select
            cy.get('select[name="custom_attributes[state_custom]"]').select(
              randomValue
            );
          }
        );
        cy.wait(1000);
        //Selección de Ciudad
        cy.get('select[name="custom_attributes[city_custom]"]').then(
          ($select) => {
            // Obtiene todas las opciones excepto la primera (asumiendo que es un placeholder)
            const $options = $select.find("option").not(":first-child");
            // Calcula un índice aleatorio basado en la cantidad de opciones
            const randomIndex = Math.floor(Math.random() * $options.length);
            // Obtiene el valor de la opción en el índice aleatorio
            const randomValue = $options.eq(randomIndex).val();
            // Selecciona la opción en el select
            cy.get('select[name="custom_attributes[city_custom]"]').select(
              randomValue
            );
          }
        );

        cy.wait(1000);
        //Selección de Zona
        cy.get('select[name="custom_attributes[zone_custom]"]').then(
          ($select) => {
            // Obtiene todas las opciones excepto la primera (asumiendo que es un placeholder)
            const $options = $select.find("option").not(":first-child");
            // Calcula un índice aleatorio basado en la cantidad de opciones
            const randomIndex = Math.floor(Math.random() * $options.length);
            // Obtiene el valor de la opción en el índice aleatorio
            const randomValue = $options.eq(randomIndex).val();
            // Selecciona la opción en el select
            cy.get('select[name="custom_attributes[zone_custom]"]').select(
              randomValue
            );
          }
        );

        //Ingresar Codigo postal
        cy.get('[name="shippingAddress.postcode"]').type(dataUser.postcode);
        //Ingresar Telefono
        cy.get('[name="shippingAddress.telephone"]').type(dataUser.celular);
        //Click en botón "Siguiente"
        cy.get('button[id="shipping-next-mobile-trigger"] span').click();
        cy.get("#checkmo").click({ force: true });
        cy.get("#place-order-trigger").click();
        cy.wait(10000);
        cy.contains("Gracias por tu compra").should("exist");
      });
    });
  });
});
