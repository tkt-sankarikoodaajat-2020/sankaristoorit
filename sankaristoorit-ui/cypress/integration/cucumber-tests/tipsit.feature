Feature: I want to add tips

Scenario: Adding a tip

Given I am on the front page
When I enter information about a tip
Then a tip is created

Scenario: Deleting a tip

Given I am on the front page,
When I press delete on a tip
Then a tip is deleted