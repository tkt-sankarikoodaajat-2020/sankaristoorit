import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I am on the front page', () => {
  cy.visit('http://localhost:3000')
})

Given('I am logged in', () => {
  cy.contains('Login').click()
  cy.intercept('POST', '/login').as('login')
  cy.get('#username').type('testuser')
  cy.get('#password').type('passWord')
  cy.get('#login-button').click()
  cy.wait('@login')
  cy.wait(1000)
  cy.get('#home-button').click()
})

Given('I am logged in using another account', () => {
  cy.contains('Login').click()
  cy.intercept('POST', '/login').as('login')
  cy.get('#username').type('secondUser')
  cy.get('#password').type('passWord')
  cy.get('#login-button').click()
  cy.wait('@login')
  cy.wait(1000)
  cy.get('#home-button').click()
})

When('I enter information about a tip', () => {
  cy.contains('Create').click()
  cy.get('#title').type('Cy_testi')
  cy.get('#url').type('https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus')
  cy.get('#create-button').click()
})

When('I enter a tip without a title', () => {
  cy.contains('Create').click()
  cy.get('#create-button').click()
})

When('I enter a tip with bad url-format', () => {
  cy.contains('Create').click()
  cy.get('#title').type('Cy_testi')
  cy.get('#url').type('hps://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus')
  cy.get('#create-button').click()
})

When('I press delete on a tip', () => {
  cy.contains('Create').click()
  cy.get('#title').type('delet_testi')
  cy.get('#create-button').click()
  cy.contains('h2', 'delet_testi').within(() => {
    cy.contains('Delete').click()
  })
})

When('I logout', () => {
  cy.contains('Logout').click()
})

When('I press checkbox to show my own tips', () => {
  cy.get('#checkbox').click()
})

When('I doubleclick checkbox to show all the tips and see that the button works', () => {
  cy.get('#checkbox').click()
  cy.get('#checkbox').click()
})

When('I press edit on a tip', () => {
  cy.contains('Create').click()
  cy.get('#title').type('edit_testi')
  cy.get('#create-button').click()
  cy.contains('h2', 'edit_testi').within(() => {
    cy.contains('Edit tip').click()
  })
})

When('I enter new information about the tip', () => {
  cy.get('input[data-cy="editTitleInput"]').clear()
  cy.get('input[data-cy="editTitleInput"]').type('thisHasChanged')
  cy.get('input[data-cy="editUrlInput"]').type('https://theuselessweb.com/')
  cy.get('button[data-cy="updateButton"]').click()
})

Then('a tip is created', () => {
  cy.contains('Cy_testi')
  cy.contains('https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus')
})

Then('a tip without a title is not added', () => {
  cy.contains('title missing')
})

Then('only my tips are shown', () => {
  cy.contains('Cy_testi')
})

Then('all the tips are shown', () => {
  cy.contains('Cy_testi')
  cy.contains('link_test')
})

Then('a tip is not added', () => {
  cy.contains('url is incorrect')
})

Then('a tip is deleted', () => {
  cy.contains('Delete_testi').should('not.exist')
})

Then('Delete should not be visible', () => {
  cy.contains('h2', 'Cy_test').within(() => {
    cy.contains('Delete').should('not.exist')
  })
})

Then('the tip is updated', () => {
  cy.contains('thisHasChanged')
  cy.contains('https://theuselessweb.com/')
})

Then('Edit tip should not be visible', () => {
  cy.contains('h2', 'Cy_test').within(() => {
    cy.contains('Edit tip').should('not.exist')
  })
})