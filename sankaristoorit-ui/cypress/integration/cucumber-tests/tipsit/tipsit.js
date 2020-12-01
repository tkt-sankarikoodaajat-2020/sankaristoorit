import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I am on the front page', () => {
  cy.visit('http://localhost:3000')
})

Given('I am logged in', () => {
  cy.contains('Register').click()
  cy.get('#username').type('newusertips')
  cy.get('#password').type('passWord')
  cy.get('#password-confirm').type('passWord')
  cy.get('#signup-button').click()
  cy.visit('http://localhost:3000')
  cy.get('#username').type('newusertips')
  cy.get('#password').type('passWord')
  cy.get('#login-button').click()
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

Then('a tip is created', () => {
  cy.contains('Cy_testi')
  cy.contains('https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus')
})

Then('a tip without a title is not added', () => {
  cy.contains('title missing')
})

Then('a tip is not added', () => {
  cy.contains('url is incorrect')
})

Then('a tip is deleted', () => {
  cy.contains('Delete_testi').should('not.exist')
})