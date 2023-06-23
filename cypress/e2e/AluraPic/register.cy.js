function generateUserName(length) {
    let r = (Math.random() + 1).toString(36).substring(7);
    return r
}

let userName = generateUserName()

describe('user registration flow', () => {
    beforeEach(() => {
        cy.visit('alura-fotos.herokuapp.com')
        cy.contains('Register now').click()
    })

    context('Register a invalid new user' , () => {
        it('Check the ap-vmessages', () => {
            cy.get('[formcontrolname="email"]').click()
            cy.get('[formcontrolname="fullName"]').click()
            cy.get('[formcontrolname="userName"]').click()
            cy.get('[formcontrolname="password"]').click()
            cy.get('body').click()
            cy.contains('ap-vmessage', 'Email is required!').should('be.visible')
            cy.contains('ap-vmessage', 'Full name is required!').should('be.visible')
            cy.contains('ap-vmessage', 'User name is required!').should('be.visible')
            cy.contains('ap-vmessage', 'Password is required!').should('be.visible')
        })
    
        it('Check error message for E-mail field', () => {
            cy.get('[formcontrolname="email"]').click().type('teste')
            cy.contains('button', 'Register').click()
            cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible')
            cy.get('[formcontrolname="email"]').click().type('@gmail.com')
            cy.contains('ap-vmessage').should('not.exist')
        })

        it('Check error message for fullName field', () => {
            cy.get('[formcontrolname="fullName"]').click().type('t')
            cy.contains('button', 'Register').click()
            cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible')
            cy.get('[formcontrolname="fullName"]').click().type('este da silva')
            cy.contains('ap-vmessage').should('not.exist')
        })

        it('Check error message for userName field', () => {
            cy.get('[formcontrolname="userName"]').click().type('f')
            cy.contains('button', 'Register').click()
            cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible')
            cy.get('[formcontrolname="userName"]').click().type('lavio')
            cy.contains('ap-vmessage', 'Username already taken').should('be.visible')
            cy.get('[formcontrolname="userName"]').click().type('O')
            cy.contains('ap-vmessage', 'Must be lower case').should('be.visible')
            cy.get('[formcontrolname="userName"]').click().clear().type('username')
            cy.contains('User available').should('be.visible')
            cy.contains('ap-vmessage').should('not.exist')
        })

        it('Check error message for password field', () => {
            cy.get('[formcontrolname="password"]').click().type('1')
            cy.contains('button', 'Register').click()
            cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible')
            cy.get('[formcontrolname="password"]').click().type('2345678')
            cy.contains('ap-vmessage').should('not.exist')
            cy.get('[formcontrolname="userName"]').click().type('12345678')
            cy.contains('button', 'Register').click()
            cy.contains('ap-vmessage', 'Username and password must be different').should('be.visible')
            cy.get('[formcontrolname="userName"]').click().type('x')
            cy.contains('ap-vmessage').should('not.exist')
        })
    })

    context('Register a valid new user', () =>{
        let userName = generateUserName(8) 
        it('Register a valid new user', () =>{
            cy.get('[formcontrolname="email"]').click().type('teste@gmail.com')
            cy.get('[formcontrolname="fullName"]').click().type(userName)
            cy.get('[formcontrolname="userName"]').click().type(userName)
            cy.get('[formcontrolname="password"]').click().type('123456789')
            cy.contains('button', 'Register').should('be.enabled').click()
            //cy.contains('Please, login!').click()
            //cy.get('[formcontrolname="userName"]').click().type(userName)
            //cy.get('[formcontrolname="password"]').click().type('123456789')
            //cy.contains('button', 'Login').click()





        })
    })


})