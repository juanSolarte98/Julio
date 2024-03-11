// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- Custom Command to Get Initial Cart Count --
//Este comando obtiene el valor inicial del contador del carrito de compras. Verifica si el contador está presente en la página y devuelve su valor numérico. Si el contador no está presente o está vacío, devuelve 0.
const faker = require('faker');
Cypress.Commands.add('getInitialCartCount', () => {
    return cy.get('.counter.qty').then(($counter) => {
      if (!$counter.hasClass('empty')) {
        return cy.get('.counter-number').invoke('text').then((text) => {
          const cleanedText = text.trim(); // Eliminar espacios en blanco
          cy.log('Texto obtenido del contador: ' + cleanedText);
          const count = parseFloat(cleanedText);
          cy.log('Valor inicial del contador del carrito: ' + count);
          return !isNaN(count) ? count : 0; // Devuelve el número o 0 si no es un número
        });
      }
      cy.log('Contador del carrito vacío, devolviendo 0');
      return 0; // Devuelve 0 si el contador está vacío
    });
  });
  
  //Elimina todos los productos que hay en el carrito
  Cypress.Commands.add('eliminarTodosLosProductos', () => {
    const eliminarProductos = () => {
      cy.get('body').then($body => {
        // Verifica si existen enlaces de eliminación en la página
        if ($body.find('a.action-delete').length > 0) {
          // Hace clic en el primer enlace de eliminación encontrado y espera a que se complete la acción
          cy.get('a.action-delete').first().click();
          cy.wait(1000); // Ajusta este tiempo de espera según la respuesta de tu aplicación
  
          // Vuelve a llamar a eliminarProductos para comprobar si hay más productos para eliminar
          eliminarProductos();
        }
      });
    };
  
    eliminarProductos();
  });

  //Comando que ayuda a reducir cantidad y verificamonto
  Cypress.Commands.add('reducirCantidadPrimerProductoYVerificar', (selectorTotalCarrito) => {
    let totalAntes;
  
    // Captura el total del carrito antes de la acción
    if (selectorTotalCarrito) {
      cy.get(selectorTotalCarrito).invoke('text').then((textoTotal) => {
        totalAntes = textoTotal.trim();
      });
    }
  
    // Hacer clic en el botón para reducir la cantidad del primer producto específico
    cy.get('.control.button .action.primary.minus').first().click();
  
    // Asumiendo un breve retraso para la actualización del carrito
    cy.wait(1000); // Ajustar según la necesidad
  
    // Comparar el total del carrito antes y después de la acción
    if (selectorTotalCarrito) {
      cy.get(selectorTotalCarrito).invoke('text').then((textoTotalDespues) => {
        expect(textoTotalDespues.trim()).not.to.eq(totalAntes);
      });
    }
  });
  

  // -- Custom Command to Check Cart Counter --
  //Este comando verifica que el contador del carrito de compras se haya actualizado al valor esperado después de realizar una acción, como añadir un producto al carrito.
  Cypress.Commands.add('checkCartCounter', (expectedCount) => {
    cy.get('.counter-number').invoke('text').then((text) => {
      const cleanedText = text.trim(); // Eliminar espacios en blanco
      cy.log('Texto obtenido del contador para verificación: ' + cleanedText);
      const count = parseFloat(cleanedText);
      if (!isNaN(count)) {
        cy.log('Valor actual del contador del carrito: ' + count);
        expect(count).to.equal(expectedCount);
      } else {
        throw new Error("Contador del carrito no es un número válido. Valor obtenido: " + cleanedText);
      }
    });
  });

  // -- Custom Command to Fill Registration Form with Random Data --
Cypress.Commands.add('fillRegisterFormWithRandomData', () => {
  const nombreAleatorio = faker.name.firstName();
  const apellidoAleatorio = faker.name.lastName();
  const emailAleatorio = faker.internet.email();
 
  cy.get('#firstname').type(nombreAleatorio);
  cy.get('#lastname').type(apellidoAleatorio);
  //cy.get('#second_lastname').type(apellidoAleatorio);
  cy.get('#email_address').type(emailAleatorio);
  // Add more fields here if necessary
});