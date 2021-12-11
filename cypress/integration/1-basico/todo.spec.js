describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress inicia com uma folha em branco para cada teste
    // então devemos dizer a ele para visitar nosso website com o comando `cy.visit ()`.
    // Como queremos visitar o mesmo URL no início de todos os nossos testes,
    // nós o incluímos em nossa função beforeEach para que seja executado antes de cada teste
    cy.visit('http://localhost:3000/')
  })

  it('displays two todo items by default', () => {
    // Usamos o comando `cy.get ()` para obter todos os elementos que correspondem ao seletor.
    // Então, usamos `deveria` para afirmar que existem dois itens correspondentes,
    // quais são os dois itens padrão.
    cy.get('tr').should('have.length', 3)

    // Podemos ir ainda mais longe e verificar se cada padrão todos contém
    // o texto correto. Usamos as funções `primeiro` e` último`
    // para obter apenas o primeiro e o último elemento correspondido individualmente,
    // e então realizar uma asserção com `deveria`.
    cy.get('tr').first().should('have.text', 'Buy Milk')
    cy.get('tr').last().should('have.text', 'Fill Gas')
  })

  it('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    const newItem = 'Feed the cat'

    // Vamos pegar o elemento de entrada e usar o comando `type` para
    // insira nosso novo item de lista. Depois de digitar o conteúdo do nosso item,
    // também precisamos digitar a chave enter para enviar a entrada.
    // Esta entrada tem um atributo data-cy, então usaremos isso para selecionar o
    // elemento de acordo com as melhores práticas:
    // https://on.cypress.io/selecting-elements
    cy.get('[data-cy=newItemField]').type(`${newItem}{enter}`)
    cy.get('#addBtn').click()

    // Agora que digitamos nosso novo item, vamos verificar se ele realmente foi adicionado à lista.
    // Por ser o item mais recente, ele deve existir como o último elemento da lista.
    // Além disso, com os dois itens padrão, devemos ter um total de 3 elementos na lista.
    // Como as asserções geram o elemento que foi afirmado,
    // podemos encadear essas duas afirmações em uma única instrução.
    cy.get('tr')
      .should('have.length',4)
      .first()
      .should('have.text', newItem)
  })

  it('can check off an item as completed', () => {
  // Além de usar o comando `get` para obter um elemento por seletor,
    // também podemos usar o comando `contains` para obter um elemento por seu conteúdo.
    // No entanto, isso resultará em <label>, que é o elemento de nível mais baixo que contém o texto.
    // Para verificar o item, encontraremos o elemento <input> para este <label>
    // percorrendo o dom até o elemento pai. A partir daí, podemos `encontrar`
    // o elemento <input> da caixa de seleção filho e use o comando `check` para verificá-lo.
    cy.contains('My Todo list')
      .parent()
      .find('h1')
      .should('have.text', 'My Todo list')
  })

})
