import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'

Given('I am on the front page', () => {
  cy.visit('http://localhost:3000')
})

When('I login with username', () => {
  cy.get('#username').type('Testimies')
  cy.get('#password').type('salainen')
  cy.get('#login-button').click()
})

And('I enter information about a tip', () => {
  cy.contains('Create').click()
  cy.get('#title').type('Cy_testi')
  cy.get('#create-button').click()
})

Then('a tip is created', () => {
  cy.contains('Cy_testi')
})