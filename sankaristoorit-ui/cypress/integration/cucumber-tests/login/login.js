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

Given('I am on the front page', () => {
  cy.visit('http://localhost:3000')
  cy.contains('Login')
})

When('I enter correct information', () => {
  cy.get('#username').type('newuser')
  cy.get('#password').type('passWord')
  cy.get('#login-button').click()
})

When('I enter a wrong password', () => {
  cy.get('#username').type('root')
  cy.get('#password').type('wrongpassword')
  cy.get('#login-button').click()
})

Then('I am logged in', () => {
  cy.contains('Logout')
})

Then('I am not logged in', () => {
  cy.contains('Login')
})

Then('I am sent to the front page',() => {
  cy.contains('Create a new tip')
})
