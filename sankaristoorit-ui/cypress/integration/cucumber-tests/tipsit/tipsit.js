import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I am on the front page', () => {
  cy.visit('http://localhost:3000')
})

When('I enter information about a tip', () => {
  cy.contains('Create').click()
  cy.get('#title').type('Cy_testi')
  cy.get('#create-button').click()
})

When('I press delete on a tip', () => {
  cy.contains('Cy_testi').within(() => {
    cy.contains('Delete').click()
  })
})

Then('a tip is created', () => {
  cy.contains('Cy_testi')
})

Then('a tip is deleted', () => {
  cy.contains('Cy_testi').should('not.exist')
})