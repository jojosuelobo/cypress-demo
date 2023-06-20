describe('Querying', () => {

  before(() => {
    cy.visit('https://example.cypress.io')
  })

  it('cyGet', () => {
    // Para acessar o Querying, foi preciso alterar o Display do <ul.dropdown-menu> para Block
    // Uma forma mais fácil de acessar a mesma tela seria fazer somente um " cy.contains('get').click() "
    cy.get('ul.dropdown-menu').invoke('css', 'display', 'block') // Altera a propriedade CSS 'display' do elemento pai para 'block'
    cy.contains('Querying').click()

    // Busca pelo componente com o ID "query-btn", e clica nele
    cy.get('#query-btn').click()

    // Busca pela classe "query-list", e onde contém "bananas", checa se possui classe chamada "third"
    cy.get('.query-list').contains('bananas').should('have.class', 'third')

    // Busca pela classe "query-form" e checa se ela possui via arrow function os campos específicos, além disso, checa se tem o atributo "placeholder" como "Email"
    cy.get('.query-form').within(() => {
      cy.get('input')
      cy.get('input:first').should('have.attr', 'placeholder', 'Email')
      cy.get('input:last').should('have.attr', 'placeholder', 'Password')
    })

  })



})

