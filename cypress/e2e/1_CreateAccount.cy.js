/// <reference types='Cypress' />

describe('Test cases for Create Account flow', () => {
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
    
    context('Account creation flow', () => {
    // Test case #1: Verificar que un usuario no registrado pueda crear una cuenta
    it('CRE-001: Verify that an unregistered user can create an account', () => {
        // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Hacer clic en el botón de "Crear una cuenta"
        cy.get('.login-container .block-new-customer .action.primary').click()
        // Rellenar el formulario de registro con datos de prueba
        cy.get('#firstname').type(dataUser.nombre[0])
        cy.get('#lastname').type(dataUser.apellido[0])
        cy.get('button.ui-datepicker-trigger.v-middle').click()
        cy.get('.ui-datepicker-year').should('be.visible').select(dataUser.fechaNacimiento[1])
        cy.get('.ui-datepicker-month').should('be.visible').select(dataUser.fechaNacimiento[0])
        cy.get('.ui-state-default:eq(1)').click()
        cy.get('#celular').type(dataUser.celular)
        cy.get('#email_address').type(dataUser.email[0])
        cy.get('#password').type(dataUser.password[0])
        cy.get('#password-confirmation').type(dataUser.password[0])
         //Hacer clic en botón "crear una cuenta" para confirmar el registro
        cy.contains('span', 'Registrarme').click().force
        //Verificar mensaje de registro exitoso
        cy.get('.message-success').should('exist')
    })
    // Test case #2: Verificar que un usuario registrado no pueda crear una cuenta
    it('CRE-002: Verify that a registered user cannot create an account', () => {
            // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Hacer clic en el botón de "Crear una cuenta"
        cy.get('.login-container .block-new-customer .action.primary').click()
        // Rellenar el formulario de registro con datos de prueba
        cy.get('#firstname').type(dataUser.nombre[0])
        cy.get('#lastname').type(dataUser.apellido[0])
        cy.get('button.ui-datepicker-trigger.v-middle').click().should('be.visible')
        cy.get('.ui-datepicker-year').should('be.visible').select(dataUser.fechaNacimiento[1])
        cy.get('.ui-datepicker-month').should('be.visible').select(dataUser.fechaNacimiento[0])
        cy.get('.ui-state-default:eq(1)').click()
        cy.get('#celular').type(dataUser.celular)
        cy.get('#email_address').type(dataUser.email[0])
        cy.get('#password').type(dataUser.password[0])
        cy.get('#password-confirmation').type(dataUser.password[0])
         //Hacer clic en botón "crear una cuenta" para confirmar el registro
        cy.contains('span', 'Registrarme').click({ force: true })
        //Verificar que aparezca mensaje de error
        cy.get('.message-error').should('exist')
    })
    // Test case #3: Verificar creación de cuenta sin suscribirse al boletín
    it('CRE-003: Verify account creation without subscribing to the newsletter', () => {
            // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Hacer clic en el botón de "Crear una cuenta"
        cy.get('.login-container .block-new-customer .action.primary').click()
            // Rellenar el formulario de registro con datos de prueba
            cy.get('#firstname').type(dataUser.nombre[0])
            cy.get('#lastname').type(dataUser.apellido[0])
            ///Hacer clic en checkbox "Suscribirse a boletín"
            cy.get('#is_subscribed').click()
            cy.get('button.ui-datepicker-trigger.v-middle').click().should('be.visible')
            cy.get('.ui-datepicker-year').should('be.visible').select(dataUser.fechaNacimiento[1])
            cy.get('.ui-datepicker-month').should('be.visible').select(dataUser.fechaNacimiento[0])
            cy.get('.ui-state-default:eq(1)').click()
            cy.get('#celular').type(dataUser.celular)
            cy.get('#email_address').type(dataUser.email[1])
            cy.get('#password').type(dataUser.password[0])
            cy.get('#password-confirmation').type(dataUser.password[0])
            //Hacer clic en botón "crear una cuenta" para confirmar el registro
            cy.contains('span', 'Registrarme').click({ force: true })
            //Verificar mensaje de registro exitoso
            cy.get('.message-success').should('exist')
    })
    // Test case #4: Verificar que no se pueda crear cuenta cuando haya un campo obligatorio sin diligenciar
    it('CRE-004: Verify that an account cannot be created when a mandatory field is not filled in', () => {
       // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Hacer clic en el botón de "Crear una cuenta"
        cy.get('.login-container .block-new-customer .action.primary').click()
        // Rellenar el formulario de registro con datos de prueba
        cy.get('#firstname').type(dataUser.nombre[0])
        cy.get('#lastname').type(dataUser.apellido[0])
        cy.get('button.ui-datepicker-trigger.v-middle').click().should('be.visible')
        cy.get('.ui-datepicker-year').should('be.visible').select(dataUser.fechaNacimiento[1])
        cy.get('.ui-datepicker-month').should('be.visible').select(dataUser.fechaNacimiento[0])
        cy.get('.ui-state-default:eq(1)').click()
        
        cy.get('#celular').type(dataUser.celular)
        
        //cy.get('#email_address').type(dataUser.email[0]) NO DILIGENCIAR CAMPO
        cy.get('#password').type(dataUser.password[0])
        cy.get('#password-confirmation').type(dataUser.password[0])
         //Hacer clic en botón "crear una cuenta" para confirmar el registro
        cy.contains('span', 'Registrarme').click({ force: true })
        //Verificar mensaje de error
        cy.get('#email_address-error').should('exist').should('have.text', 'Este es un campo obligatorio.')
})
    
    // Test case #5: Verificar que la contraseña este oculta por defecto
it('CRE-005: Verify that the password is hidden by default', () => {
    // Hacer clic en el botón "Iniciar sesión"
    cy.get('div.login-julio span').click({ force: true })
    // Hacer clic en el botón de "Crear una cuenta"
    cy.get('.login-container .block-new-customer .action.primary').click()
    // Rellenar el formulario de registro con datos de prueba
    cy.get('#firstname').type(dataUser.nombre[1])
    cy.get('#lastname').type(dataUser.apellido[1])
    cy.get('button.ui-datepicker-trigger.v-middle').click().should('be.visible')
    cy.get('.ui-datepicker-year').should('be.visible').select(dataUser.fechaNacimiento[1])
    cy.get('.ui-datepicker-month').should('be.visible').select(dataUser.fechaNacimiento[0])
    cy.get('.ui-state-default:eq(1)').click()
    cy.get('#celular').type(dataUser.celular)
    cy.get('#email_address').type(dataUser.email[2])
    cy.get('#password').type(dataUser.password[0]).should('have.attr', 'type', 'password')  
    cy.get('#password-confirmation').type(dataUser.password[0]).should('have.attr', 'type', 'password')  
})
    // Test case #6: Verificar que se pueda registrar con cliente asociado al programa loyalty
    it('CRE-006: Verify that it is possible to register with a client associated with the loyalty program.', () => {
        // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Hacer clic en el botón de "Crear una cuenta"
        cy.get('.login-container .block-new-customer .action.primary').click()
        // Rellenar el formulario de registro con datos de prueba
        cy.get('#firstname').type(dataUser.nombre[1])
        cy.get('#lastname').type(dataUser.apellido[1])
        cy.get('button.ui-datepicker-trigger.v-middle').click().should('be.visible')
        cy.get('.ui-datepicker-year').should('be.visible').select(dataUser.fechaNacimiento[1])
        cy.get('.ui-datepicker-month').should('be.visible').select(dataUser.fechaNacimiento[0])  
        cy.get('.ui-state-default:eq(1)').click()
        cy.get('#celular').type(dataUser.celular)
        cy.get('#email_address').type(dataUser.email[3])
        cy.get('#password').type(dataUser.password[0])
        cy.get('#password-confirmation').type(dataUser.password[0])
        cy.get('input#socio_loyalty').click()
        cy.get('input#tarjeta_loyalty')
        cy.get('#tarjeta_loyalty').type(dataUser.tarjeta_loyalty[0])
        //Hacer clic en botón "crear una cuenta" para confirmar el registro
        cy.contains('span', 'Registrarme').click({ force: true })
        //Verificar mensaje de registro exitoso
        cy.get('.message-success').should('exist')
    })
    
    // Test case #7: Verificar que se dar clic en desear ser socio loyalty
    it('CRE-007: Verify that it is possible to register a user who wants to enroll in the loyalty program.', () => {
        // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Hacer clic en el botón de "Crear una cuenta"
        cy.get('.login-container .block-new-customer .action.primary').click()
        // Rellenar el formulario de registro con datos de prueba
        cy.get('#firstname').type(dataUser.nombre[1])
        cy.get('#lastname').type(dataUser.apellido[1])
        cy.get('button.ui-datepicker-trigger.v-middle').click().should('be.visible')
        cy.get('.ui-datepicker-year').should('be.visible').select(dataUser.fechaNacimiento[1])
        cy.get('.ui-datepicker-month').should('be.visible').select(dataUser.fechaNacimiento[0])
        cy.get('.ui-state-default:eq(1)').click()
        cy.get('#celular').type(dataUser.celular)
        cy.get('#email_address').type(dataUser.email[5])
        cy.get('#password').type(dataUser.password[0])
        cy.get('#password-confirmation').type(dataUser.password[0])
        cy.get('#inscribir_programa').click()
        cy.contains('span', 'Registrarme').click({ force: true })
        //Verificar mensaje de registro exitoso
        cy.get('.message-success').should('exist')
    })
    // Test case #8: Verificar mensaje de error cuando la contraseña no coincide
    it('CRE-008: Verify error message when the password does not match', () => {
        // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Hacer clic en el botón de "Crear una cuenta"
        cy.get('.login-container .block-new-customer .action.primary').click()
        // Rellenar el formulario de registro con datos de prueba
        cy.get('#firstname').type(dataUser.nombre[0])
        cy.get('#lastname').type(dataUser.apellido[0])
        cy.get('button.ui-datepicker-trigger.v-middle').click().should('be.visible')
        cy.get('.ui-datepicker-year').should('be.visible').select(dataUser.fechaNacimiento[1])
        cy.get('.ui-datepicker-month').should('be.visible').select(dataUser.fechaNacimiento[0])
        cy.get('.ui-state-default:eq(1)').click()
        cy.get('#celular').type(dataUser.celular)
        cy.get('#email_address').type(dataUser.email[2])
        cy.get('#password').type(dataUser.password[0])
        cy.get('#password-confirmation').type(dataUser.password[1])
        //Hacer clic en botón "crear una cuenta" para confirmar el registro
        cy.contains('span', 'Registrarme').click({ force: true })
        //Verificar que aparezca mensaje de error
        cy.get('#password-confirmation-error').should('exist').should('have.text','Introduce el mismo valor otra vez.')
    })
        // Test case #9: Verificar que no se pueda crear cuenta con un email registrado
        it('CRE-009: Verify that it is not possible to create an account with a registered email address', () => {
            // Hacer clic en el botón "Iniciar sesión"
            cy.get('div.login-julio span').click({ force: true })
            // Hacer clic en el botón de "Crear una cuenta"
            cy.get('.login-container .block-new-customer .action.primary').click()
            // Rellenar el formulario de registro con datos de prueba
            cy.get('#firstname').type(dataUser.nombre[0])
            cy.get('#lastname').type(dataUser.apellido[0])
            cy.get('button.ui-datepicker-trigger.v-middle').click().should('be.visible')
            cy.get('.ui-datepicker-year').should('be.visible').select(dataUser.fechaNacimiento[1])
            cy.get('.ui-datepicker-month').should('be.visible').select(dataUser.fechaNacimiento[0])
            cy.get('.ui-state-default:eq(1)').click()
            cy.get('#celular').type(dataUser.celular)
            cy.get('#email_address').type(dataUser.email[2])
            cy.get('#password').type(dataUser.password[0])
            cy.get('#password-confirmation').type(dataUser.password[0])
            //Hacer clic en botón "crear una cuenta" para confirmar el registro
            cy.contains('span', 'Registrarme').click({ force: true })
            //Verificar que aparezca mensaje de error
            cy.get('.message-error').should('exist')   
        })
        // Test case #10: Verificar que se presente mensaje de error cuando la contraseña no cumpla con el mínimo de longitud
        it('CRE-010: Verify that an error message is displayed when the password does not meet the minimum length', () => {
            // Hacer clic en el botón "Iniciar sesión"
            cy.get('div.login-julio span').click({ force: true })
            // Hacer clic en el botón de "Crear una cuenta"
            cy.get('.login-container .block-new-customer .action.primary').click()
            // Rellenar el formulario de registro con datos de prueba
            cy.get('#firstname').type(dataUser.nombre[0])
            cy.get('#lastname').type(dataUser.apellido[0])
            cy.get('button.ui-datepicker-trigger.v-middle').click().should('be.visible')
            cy.get('.ui-datepicker-year').should('be.visible').select(dataUser.fechaNacimiento[1])
            cy.get('.ui-datepicker-month').should('be.visible').select(dataUser.fechaNacimiento[0])
            cy.get('.ui-state-default:eq(1)').click()
            cy.get('#celular').type(dataUser.celular)
            
            cy.get('#email_address').type(dataUser.email[2])
            cy.get('#password').type(dataUser.password[2])
            cy.get('#password-error').should('exist').and('contain','8')
        })
        // Test case #11: Verificar que se presente mensaje de error cuando la contraseña no cumpla con las diferentes clases de caracteres
        it('CRE-011: Verify that an error message is displayed when the password does not comply with the different character classes', () => {
            // Hacer clic en el botón "Iniciar sesión"
        cy.get('div.login-julio span').click({ force: true })
        // Hacer clic en el botón de "Crear una cuenta"
        cy.get('.login-container .block-new-customer .action.primary').click()
            // Rellenar el formulario de registro con datos de prueba
            cy.get('#firstname').type(dataUser.nombre[0])
            cy.get('#lastname').type(dataUser.apellido[0])
            cy.get('button.ui-datepicker-trigger.v-middle').click().should('be.visible')
            cy.get('.ui-datepicker-year').should('be.visible').select(dataUser.fechaNacimiento[1])
            cy.get('.ui-datepicker-month').should('be.visible').select(dataUser.fechaNacimiento[0])
            cy.get('.ui-state-default:eq(1)').click()
            cy.get('#celular').type(dataUser.celular)    
            cy.get('#email_address').type(dataUser.email[2])
            cy.get('#password').type(dataUser.password[3])
            cy.get('#password-error').should('exist').and('contain','3')
        })
        
})
})
