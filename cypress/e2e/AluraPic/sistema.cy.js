describe('User flow page', () => {
    const usuarioValido = require('../../fixtures/users.json')
    beforeEach(() => {
        cy.visit('alura-fotos.herokuapp.com')
        cy.login(usuarioValido.username, usuarioValido.password)
        cy.request({
            method: 'GET',
            url: `https://apialurapic.herokuapp.com/${usuarioValido.username}/photos?`
        }).then((res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body).is.not.empty
        })

    })

    context('Check a avaible post', () => {
        it('Like a post', () => {
            cy.get('.col-4').first().click()
            cy.get('.fa-heart-o').click()
        })

        it.only('Comment seccion', () => {
            cy.get('.col-4').first().click()
            cy.get('[formcontrolname="comment"]').type('Cypress achou sua imagem linda!')
            cy.contains('Publish').click()
            cy.reload()
            cy.get('.list-unstyled li').eq(1).first().should('contain.text', 'Cypress achou sua imagem linda!')
            //cy.contains('Cypress achou sua imagem linda!').should('exist')
        })
    })

})