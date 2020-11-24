Feature: I want to add tips

Scenario: Adding a tip

Given I am on the front page
When I login with username
And I enter information about a tip
Then a tip is created
