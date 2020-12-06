Feature: I want to get title automatically

Scenario: correct url and empty title

Given I am on the front page
And I am logged in
When I add a valid url
Then a title appears to title field

Scenario: correct url but filled title

Given I am on the front page
And I am logged in
When I add a new title
And I add a valid url
Then a title should not update

Scenario: incorrect url does nothing

Given I am on the front page
And I am logged in
When I add an invalid url
Then nothing changes
