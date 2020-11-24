Feature: I want to controll tips

Scenario: Adding a tip

Given I am on the front page
When I login with username
And I enter information about a tip
Then a tip is created

Scenario: Deleting a tip
Given I am on the front page
When I login with username
And I press the delete button
Then The tip is deleted
