describe('User flow login page', () => {
    beforeEach(() => {
        cy.visit('alura-fotos.herokuapp.com')
    })

    const usuarioValido = require('../../fixtures/users.json')

    context('User login', () => {
        it('Invalid login', ()=>{
            cy.login('teste', 'teste')
            cy.on('window:alert', (alert) =>{
                expect(alert).to.contains('Invalid user name or password')
            })
        })
        
        it('Invalid Password', () =>{
            cy.login(usuarioValido.username, 'teste')
            cy.on('window:alert', (alert) =>{
                expect(alert).to.contains('Invalid user name or password')
            })
        })

        it('Valid login', () => {
            cy.login(usuarioValido.username, usuarioValido.password)
            cy.request({
                method: 'GET', 
                url: `https://apialurapic.herokuapp.com/${usuarioValido.username}/photos?`
            }).then((res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body).is.not.empty
            })
        })  
        


    })
})