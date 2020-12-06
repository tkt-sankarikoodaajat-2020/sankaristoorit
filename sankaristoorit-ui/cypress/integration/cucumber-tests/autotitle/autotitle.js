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

When('I add a valid url', () => {
  cy.contains('Create').click()
  cy.get('#url').type('https://google.com')
  cy.wait(200)
})

Then('a title appears to title field', () => {
  cy.get('#title').should('have.value', 'Google')
})

When('I add a new title', () => {
  cy.get('#title').type('Hakukoinedn hakukone')
})

Then('a title should not update', () => {
  cy.get('#title').should('not.have.value', 'Google')
})

When('I add an invalid url', () => {
  cy.get('#url').type('thisaintnourl')
})

Then('nothing changes', () => {
  cy.get('#title').should('have.value', '')
})