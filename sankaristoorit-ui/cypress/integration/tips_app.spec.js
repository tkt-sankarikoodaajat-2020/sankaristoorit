
describe('Tips app ', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('Page is rendered correctly', function () {
    cy.contains('Sankaristoorit')
    cy.contains('Tips')
    cy.contains('Login')
    cy.contains('Register')
  })

  it('Tips are rendered correctly', function () {
    cy.contains('Tips')
  })

  const loginHelper = () => {
    cy.contains('Login').click()
    cy.intercept('POST','/login').as('login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('passWord')
    cy.get('#login-button').click()
    cy.wait('@login')
    cy.wait(200)
    cy.get('#home-button').click()
  }

  it('Creating a tip works correctly with valid data', function () {
    loginHelper()
    cy.contains('Create')
    cy.get('#title').type('Cy_testi_2')
    cy.get('#url').type('https://github.com/tkt-sankarikoodaajat-2020/sankaristoorit')
    cy.get('#create-button').click()
    cy.contains('Cy_testi_2')
    cy.contains('https://github.com/tkt-sankarikoodaajat-2020/sankaristoorit')
  })

  it('Creating a tip fails with incorrect url', function () {
    loginHelper()
    cy.contains('Create')
    cy.get('#title').type('Cy_testi_2')
    cy.get('#url').type('hps://github.com/tkt-sankarikoodaajat-2020/sankaristoorit')
    cy.get('#create-button').click()
    cy.contains('url is incorrect')
  })

  it('Creating a tip gets title with correct url', function () {
    loginHelper()
    cy.contains('Create')
    cy.get('#url').type('https://google.com')
    cy.wait(200)
    cy.get('#title').should('have.value', 'Google')
    cy.get('#create-button').click()
    cy.contains('Google')
  })

  it('Editing a tip works correctly', function () {
    loginHelper()
    cy.contains('h2', 'Cy_testi_2').within(() => {
      cy.contains('Edit tip').click()
    })
    cy.get('input[data-cy="editTitleInput"]').clear()
    cy.get('input[data-cy="editTitleInput"]').type('Edit_test')
    cy.get('input[data-cy="editUrlInput"]').clear()
    cy.get('input[data-cy="editUrlInput"]').type('https://en.wikipedia.org/wiki/Lorem_ipsum')
    cy.get('button[data-cy="updateButton"]').click()
    cy.contains('Edit_test')
    cy.contains('https://en.wikipedia.org/wiki/Lorem_ipsum')
  })

  it('Deleting a tip works correctly', function () {
    loginHelper()
    cy.contains('h2', 'Edit_test').within(() => {
      cy.contains('Delete').click()
    })
    cy.contains('Edit_testi').should('not.exist')
  })
})
