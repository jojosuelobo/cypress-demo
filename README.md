## before()
Executada apenas uma vez, antes de todos os testes do arquivo de teste. Ela é útil para configurar o ambiente de teste antes que qualquer caso de teste seja executado.  Essa função é útil quando você tem uma configuração que é comum a todos os testes do arquivo e não precisa ser repetida várias vezes.

## beforeEach()
Executada antes de cada caso de teste individualmente. Ela é útil quando você precisa de uma configuração fresca para cada teste, garantindo que o estado do teste anterior não afete o próximo. 

Em resumo:
`before()` é executado apenas uma vez, antes de todos os testes no arquivo.
`beforeEach()` é executado antes de cada caso de teste individualmente.