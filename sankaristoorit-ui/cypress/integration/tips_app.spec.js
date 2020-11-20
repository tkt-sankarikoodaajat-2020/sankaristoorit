
describe('Tips app ', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('Page is rendered correctly', function () {
    cy.contains('Sankaristoorit')
    cy.contains('Create a new tip')
  })

  it('Tips are rendered correclty', function () {
    cy.contains('Tips')
    cy.contains('First')
  })
})
