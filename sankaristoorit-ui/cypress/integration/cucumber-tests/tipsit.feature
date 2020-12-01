Feature: I want to manage tips

Scenario: Adding a tip

Given I am on the front page
And I am logged in
When I enter information about a tip
Then a tip is created

Scenario: Adding a tip fails without a title

Given I am on the front page
And I am logged in
When I enter a tip without a title
Then a tip without a title is not added

Scenario: Adding a tip with bad url-format

Given I am on the front page
And I am logged in
When I enter a tip with bad url-format
Then a tip is not added

Scenario: Deleting a tip

Given I am on the front page
And I am logged in
When I press delete on a tip
Then a tip is deleted

