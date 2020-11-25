
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

  it('Creating a tip works correctly', function () {
    cy.contains('Create')
    cy.get('#title').type('Cy_testi2')
    cy.get('#create-button').click()
    cy.contains('Cy_testi2')
  })

  it('Deleting a tip works correctly', function () {
    cy.contains('Cy_testi').within(() => {
      cy.contains('Delete').click()
    })
    cy.visit('http://localhost:3000')
    cy.contains('Cy_testi').should('not.exist')
  })
})
