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

Scenario: Deleting when not logged in

When I logout
Then Delete should not be visible

Scenario: Delete now showing for other users

Given I am on the front page
And I am logged in using another account
Then Delete should not be visible

Scenario: I want to see my own tips

Given I am on the front page
And I am logged in
When I press checkbox to show my own tips
Then only my tips are shown

Scenario: I want to see all the tips

Given I am on the front page
And I am logged in
When I doubleclick checkbox to show all the tips and see that the button works
Then all the tips are shown

Scenario: Editing a tip

Given I am on the front page
And I am logged in
When I press edit on a tip
And I enter new information about the tip
Then the tip is updated


Scenario: Editing when not logged in

When I logout
Then Edit tip should not be visible

Scenario: Edit not showing for other users

When I am logged in using another account
Then Edit tip should not be visible

Scenario: Edited title can't be empty

Given I am on the front page
And I am logged in
When I press edit on a tip
And I edit a tip to not have a title
Then The tip is not edited

Scenario: Editing a title to have a bad url-format

Given I am on the front page
And I am logged in
When I press edit on a tip
And I edit in a bad url
Then The tip is not edited