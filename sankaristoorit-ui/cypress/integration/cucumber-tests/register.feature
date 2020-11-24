Feature: I want to register as a new user

Scenario: Registration succeeds with valid username and password

Given I am on the front page
And I click register
When I enter information a correct username and password
Then I am sent to the front page

Scenario: Registration fails when username is too short

Given I am on the front page
And I click register
When I enter a too short username
Then I am still on the register page

Scenario: Registration fails when passwords dont match

Given I am on the front page
And I click register
When I enter a valid username but the passwords dont match
Then I am still on the register page

