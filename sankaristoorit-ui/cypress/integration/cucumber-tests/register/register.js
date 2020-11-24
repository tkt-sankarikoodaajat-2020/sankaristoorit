import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I am on the front page',() => {
  cy.visit('http://localhost:3000')
})

When('I click register', () => {
  cy.contains('Register').click()
})

When('I enter information a correct username and password',() => {
  cy.get('#username').type('newuser')
  cy.get('#password').type('passWord')
  cy.get('#password-confirm').type('passWord')
  cy.get('#signup-button').click()
})

When('I enter a too short username', () => {
  cy.get('#username').type('n')
  cy.get('#password').type('passWord')
  cy.get('#password-confirm').type('passWord')
  cy.get('#signup-button').click()
})

When('I enter a valid username but the passwords dont match', () => {
  cy.get('#username').type('newuser')
  cy.get('#password').type('passWord')
  cy.get('#password-confirm').type('passWordsss')
  cy.get('#signup-button').click()
})

Then('I am sent to the front page',() => {
  cy.contains('Create a new tip')
})

Then('I am still on the register page', () => {
  cy.contains('Confirm Password:')
})