Feature: I want to login

Scenario: I register as a user

Given I am on the front page
And I click register
When I enter information a correct username and password
Then I am sent to the front page

Scenario: Loggin succeeds with correct credentials

Given I am on the login page
When I enter correct information
Then I am logged in

Scenario: Loggin fails with wrong password

Given I am on the login page
And I enter a wrong password
Then I am not logged in