import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I am on the front page', () => {
  cy.visit('http://localhost:3000')
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