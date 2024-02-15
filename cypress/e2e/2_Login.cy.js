/// <reference types='Cypress' />

describe('Test cases for Login flow', () => {
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
    
    context('Login flow', () => {
    // Test case #1: Verificar que un usuario registrado pueda iniciar sesión
    it('LOG-001: Verify that an unregistered user can create an account', () => {
        // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Llenar formulario de "Clientes registrados"
        cy.get('#email').type(dataUser.email[0])
        cy.get('#pass').type(dataUser.password[0])
        //Hacer clic en botón "Iniciar sesión"
        cy.get('#send2').click()
        cy.get('span[data-ui-id="page-title-wrapper"]').contains('Mi cuenta')
    })
    // Test case #2: Verificar que no permita iniciar sesión cuando las credenciales son invalidas
    it('LOG-002: Verify that it does not allow logging in when credentials are invalid', () => {
        // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Llenar formulario de "Clientes registrados"
        cy.get('#email').type(dataUser.email[0])
        cy.get('#pass').type(dataUser.password[1])
        //Hacer clic en botón "Iniciar sesión"
        cy.get('#send2').click()
        //Verificar que aparezca mensaje de error
        cy.get('.message-error').should('exist')
    })
    // Test case #3: Verificar que no permita iniciar sesión con un email no registrado
    it('LOG-003: Verify that it does not allow logging in with an unregistered email address', () => {
        // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Llenar formulario de "Clientes registrados"
        cy.get('#email').type('noexiste@yopmail.com')
        cy.get('#pass').type(dataUser.password[0])
        //Hacer clic en botón "Iniciar sesión"
        cy.get('#send2').click()
        //Verificar que aparezca mensaje de error
        cy.get('.message-error').should('exist')
        })

              // Test case #4: Verificar que permita realizar la recuperación de contraseña
      it('LOG-004: Verify that it allows password recovery', () => {
        // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Hacer clic en el botón ¿Olvidaste tu contraseña?
        cy.get('#login-form > fieldset > div.actions-toolbar > div.secondary > a > span').click()
        // Ingresar correo electrónico en la cuenta que se quiere recuperar
        cy.get('#email_address').type(dataUser.email[0])
        // Hacer clic en el botón "Restablecer mi contraseña"
        cy.contains('span', 'Restablecer mi contraseña').click()
        cy.get('.message-success').should('exist')
        //
      })
    // Test case #5: Verificar que un usuario logueado pueda cerrar sesión
    it('LOG-005: Verify that a logged-in user can log off', () => {
        // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Llenar formulario de "Clientes registrados"
        cy.get('#email').type(dataUser.email[0])
        cy.get('#pass').type(dataUser.password[0])
        // Hacer clic en botón "Iniciar sesión"
        cy.get('#send2').click()
        // Hacer clic en el botón "Cerrar sesión"
        cy.get('.custom-logout').click()
        // Verificar que aparezca información de cierre de sesión
        cy.get('.base').should('exist').and('have.text','Has cerrado la sesión')
        cy.get('.column > p').should('exist').and('have.text','Usted ha cerrado la sesión y irá a su página de inicio en 5 segundos.')
    })      
    // Test case #6: Verificar que un usuario pueda cambiar su contraseña y loguearse nuevamente
    it('LOG-006: Verify that a user can change his password and log in again.', () => {
        // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Llenar formulario de "Clientes registrados"
        cy.get('#email').type(dataUser.email[0])
        cy.get('#pass').type(dataUser.password[0])
        // Hacer clic en botón "Iniciar sesión"
        cy.get('#send2').click()
        // Hacer clic en botón "Cambiar la contraseña"
        cy.get('.change-password').click()
        // Llenar formulario de "Cambiar la contraseña"
        cy.get('#current-password').type(dataUser.password[0])
        cy.get('#password').type(dataUser.password[1])
        cy.get('#password-confirmation').type(dataUser.password[1])
        // Hacer clic en botón "Guardar"
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
        //Verificar que aparezca mensaje de error
        cy.get('.message-success').should('exist')
        // Llenar formulario de "Clientes registrados"
        cy.get('#email').type(dataUser.email[0])
        cy.get('#pass').type(dataUser.password[1])
        // Hacer clic en botón "Iniciar sesión"
        cy.get('#send2').click()
    })  
})
})
