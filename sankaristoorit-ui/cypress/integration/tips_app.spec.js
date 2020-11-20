describe('Tips app ', function () {

  it('Page is rendered correctly', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Sankaristoorit')
    cy.contains('Create a new tip')
    cy.contains('Tips')
  })

  it('Tips are rendered correclty', function () {
    cy.visit('http://localhost:3000')
    cy.contains('First test title')
  })
})
