
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
  })

  it('Creating a tip works correctly with valid data', function () {
    cy.contains('Create')
    cy.get('#title').type('Cy_testi2')
    cy.get('#url').type('https://github.com/tkt-sankarikoodaajat-2020/sankaristoorit')
    cy.get('#create-button').click()
    cy.contains('Cy_testi2')
    cy.contains('https://github.com/tkt-sankarikoodaajat-2020/sankaristoorit')
  })

  it('Creating a tip fails with incorrect url', function () {
    cy.contains('Create')
    cy.get('#title').type('Cy_testi2')
    cy.get('#url').type('hps://github.com/tkt-sankarikoodaajat-2020/sankaristoorit')
    cy.get('#create-button').click()
    cy.contains('url is incorrect')
  })

  it('Creating a tip fails without title with correct url', function () {
    cy.contains('Create')
    cy.get('#url').type('https://github.com/tkt-sankarikoodaajat-2020/sankaristoorit')
    cy.get('#create-button').click()
    cy.contains('title missing')
  })

  it('Deleting a tip works correctly', function () {
    cy.contains('Cy_testi').within(() => {
      cy.contains('Delete').click()
    })
    cy.visit('http://localhost:3000')
    cy.contains('Cy_testi').should('not.exist')
  })
})
