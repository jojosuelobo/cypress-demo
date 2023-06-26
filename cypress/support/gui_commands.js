Cypress.Commands.add('login', (nome, senha) => {
    cy.get('[formcontrolname=userName]').type(nome)
    cy.get('[formcontrolname=password]').type(senha)
    cy.contains('button', 'login').click()
})