Feature: I want to search tips

Scenario: I am presented with a list of tips

Given I am logged in
And I am on the home page
When I want to search for a tip
Then only the tips matching the search are displayed