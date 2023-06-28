# Comandos básicos

### Criar um projeto

```markdown
npm init --yes
```

```markdown
npm install -D cypress
```

### Inicializar dashboard Cypress

```markdown
npx cypress open
```

### Relatório de testes

```markdown
npx cypress run
```

### Relatório de testes com Mochawesome

```markdown
npm i -D mochawesome
```

```markdown
npx cypress run --reporter mochawesome
```

# Estrutura de código

```jsx
/* Habilita o auto complete do Cypress */
/// <reference types="cypress" />

/* Funciona como o 'Main' do código, dentro dele que estarão todos os testes referentes
a descrição da mesma, exemplo: Fluxo de registro de novo usuário */
describe('TELA DE REGISTRO DE NOVO USUÁRIO', () => {
/* Significa que irá executar está instrução antes de cada caso de teste */
	beforeEach(() => {
    cy.visit('https://www.site.com.br') // Entrar na URL do site
	  cy.contains('Registrar-se').click() // Clicar em registrar-se
	})
	
/* Um sub 'Main', onde os testes deste contexto especificos são feitos*/
	context('Registro de usuário inválido' , () => {
		/* Teste em si deste caso em especifico */
		it('Verifica ap-vmessages', () => { 
			[...]
		})

		it('Checa mensagens de erro de input Email', () => { 
			[...]
		})

		[...]
	})

	context('Registro de usuário VÁLIDO' , () => {
		/* Teste em si deste caso em especifico */
		it('Cadastro de usuário', () => { 
			[...]
		})
	})
	
})
```

### Diferença entre `before()` e o **`beforeEach()`**

O `before()` é executado apenas uma vez, antes de todos os testes do arquivo de teste. Ela é útil para configurar o ambiente de teste antes que qualquer caso de teste seja executado. É útil quando se faz necessário uma configuração que é comum a todos os testes do arquivo e não precisa ser repetida várias vezes.

O **`beforeEach()` é e**xecutada antes de cada caso de teste individualmente. Ela é útil quando você precisa de uma configuração fresca para cada teste, garantindo que o estado do teste anterior não afete o próximo.

Em resumo: `before()` é executado apenas uma vez, antes de todos os testes no arquivo. Já o `beforeEach()` é executado antes de cada caso de teste individualmente.

### Melhores formas de dar Target num componente

| cy.get('button').click() | Nunca! | Péssimo! Muito genérico |
| --- | --- | --- |
| cy.get('.btn.btn-large').click() | Nunca! | Ruim! Muito possível de quebrar em futuras alterações |
| cy.get('#main').click() | Talvez… | Melhor.. Porém há formas mais elegantes sem necessitar usar os listeners do JS |
| cy.get('[name="submission"]').click() | Talvez… | Coupled to the name attribute which has HTML semantics. |
| cy.contains('Submit').click() | Depende | Bem melhor, porém, ainda subjetivo a quebrar em futuras mudanças |
| cy.get('[data-cy="submit"]').click() | Correta! | Perfeito! Isolado de qualquer alteração no sistema |

### Criação de funções globais

```jsx
Cypress.Commands.add('login', (nome, senha) => {
    cy.get('[formcontrolname=userName]').type(nome)
    cy.get('[formcontrolname=password]').type(senha)
    cy.contains('button', 'login').click()
})
```

Após isso, é feito a importação do arquivo que está alocada 

```jsx
import './commands'
import './gui_commands'
```

Pronto! Agora é só chamar no código, exemplo: `cy.login('josue123', '12345')`

### Importar arquivos JSON

```json
{
    "username": "flavio",
    "password": "123"
}
```

Agora é só importar no código pelo diretório e usa-los ao seu gosto

```jsx
const usuarioValido = require('../../fixtures/users.json')
cy.login(usuarioValido.username, usuarioValido.password)
```

# Estruturas com padrões com Cypress

### Como checar um alert

```jsx
/* Caso de entrar com senha inválida */
it('Senha inválida', () => {
    cy.login('ADMIN', 'SENHA123')
    cy.on('window:alert', (alert) => {
        expect(alert).to.contains('Invalid user name or password')
    })
})
```

### Request com Cypress

```jsx
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
```
