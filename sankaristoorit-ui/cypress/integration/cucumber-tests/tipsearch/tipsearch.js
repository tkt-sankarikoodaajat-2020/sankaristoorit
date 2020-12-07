import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I am logged in', () => {
  cy.visit('http://localhost:3000')
  cy.contains('Login').click()
  cy.intercept('POST', '/login').as('login')
  cy.get('#username').type('testuser')
  cy.get('#password').type('passWord')
  cy.get('#login-button').click()
  cy.wait('@login')
  cy.get('#home-button').click()
})

Given('I am on the home page', () => {
  cy.get('#home-button').click()
  cy.contains('Tips')
  cy.intercept('POST','/tips').as('addTip')
  cy.get('#title').type('Cy_testi1')
  cy.get('#url').type('https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus')
  cy.get('#create-button').click()
  cy.wait('@addTip')
  cy.get('#title').type('Cy_testi2')
  cy.get('#url').type('https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus')
  cy.get('#create-button').click()
  cy.wait('@addTip')
})

When('I want to search for a tip', () => {
  cy.get('#filterInput').type('i1')
})

Then('only the tips matching the search are displayed', () => {
  cy.contains('Cy_testi1')
  cy.contains('Cy_testi2').should('not.exist')
})