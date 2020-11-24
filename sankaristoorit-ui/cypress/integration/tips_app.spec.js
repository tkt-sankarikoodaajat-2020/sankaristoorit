
describe('Tips app ', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('Testmies')
    cy.get('#password').type('123456789')
    cy.get('#login-button').click()
  })

  it('Can log in', function () {
    cy.get('Login').should('not.exist')
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
    cy.contains('Create').click()
    cy.get('#title').type('Cy_testi')
    cy.get('#create-button').click()

    cy.contains('Cy_testi')
  })

  it('Deleting a tip works correctly', function () {
    cy.contains('Cy_testi').within(() => {
      cy.contains('Delete').click()
    })
    cy.visit('http://localhost:3000')
    cy.contains('Cy_testi').should('not.exist')
  })

  it('Can log out', function() {
    cy.get('#logout-button').click()
    cy.contains('Login')
  })
})
