Feature: I want to get title automatically

Scenario: correct url and empty title

Given I am on the front page
And I am logged in
When I add a valid url
Then a title appears to title field