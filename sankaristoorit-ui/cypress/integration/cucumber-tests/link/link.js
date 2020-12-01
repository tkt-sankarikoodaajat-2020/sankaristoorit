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
  cy.contains('Home').click()
})

When('I create a tip with a link', () => {
  cy.contains('Create').click()
  cy.get('#title').type('link_test')
  cy.get('#url').type('https://www.blank.org/')
  cy.get('#create-button').click()
})

Then('The title of the tip functions as a link', () => {
  cy.contains('h2', 'link_test').within(() => {
    cy.get('a[href*="blank"]').should('exist')
  })
})