Feature: I want to embed a link in a tips title

Scenario: Creating a tip with a link

Given I am on the front page
And I am logged in
When I create a tip with a link
Then The title of the tip functions as a link