import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I am on the front page',() => {
  cy.visit('http://localhost:3000')
})

Given('I am on the login page',() => {
  cy.visit('http://localhost:3000/login')
})

When('I click register', () => {
  cy.contains('Register').click()
})

When('I enter information a correct username and password',() => {
  cy.intercept('GET', '/users/newuserlogin').as('usernamecheck')
  cy.get('#username').type('newuserlogin')
  cy.get('#password').type('passWord')
  cy.get('#password-confirm').type('passWord')
  cy.wait('@usernamecheck')
  cy.intercept('POST', '/users').as('register')
  cy.get('#signup-button').click()
  cy.wait('@register')
})

Given('I am on the front page', () => {
  cy.visit('http://localhost:3000')
  cy.contains('Login')
})

When('I enter correct information', () => {
  cy.intercept('POST','/login').as('login')
  cy.get('#username').type('testuser')
  cy.get('#password').type('passWord')
  cy.get('#login-button').click()
  cy.wait('@login')
})

When('I enter a wrong password', () => {
  cy.intercept('POST','/login').as('login')
  cy.get('#username').type('root')
  cy.get('#password').type('wrongpassword')
  cy.get('#login-button').click()
  cy.wait('@login')
})

Then('I am logged in', () => {
  cy.contains('Logout')
})

Then('I am not logged in', () => {
  cy.contains('Login')
})

Then('I am sent to the front page',() => {
  cy.contains('Tips')
})
