[![Build Status](https://travis-ci.org/steffencrespo/car-purchase-decision.svg?branch=master)](https://travis-ci.org/steffencrespo/car-purchase-decision)

What Car Am I Going to Buy?
===========================
> # lots of cars, lots of options, hard to make the right choice. 

What is it for?
---------------
When you are shopping for a new car there is always the option of having a spreadsheet or a piece of paper where you can write down the models you want and the offers you found in the market. Although pen and paper are always great friends, and notes apps are always handy, you can't easily see what details each model has. You can't easily add new models and keep track of the max price you want to pay for each model.

Whacambuy helps you with a visual list of the car models that are under your radar. Add new models, remove the ones you don't feel like having anymore.

How to use this app
-------------------
1. On the welcome page, click Learn More for additional information
  ![Welcome Page](/README-images/1-welcome.png "Welcome Page")
  ![How To Use This App](/README-images/2-howto.png "How To Use")
2. Sign up by clicking the 'Get Started' button and fill out the user info form
  ![New User Form](/README-images/3-signup.png "Sign Up")
3. Log in entering your newly created or already existing credentials
  ![Login](/README-images/4-login.png "Login Page")
4. The list view is going to be loaded and you will see your cars once you are logged in
  ![List View](/README-images/5-list-view.png "List View")
5. Click 'Add new car' in the nav bar and enter the specifics of the models you want to buy
  ![Add Car](/README-images/7-add-car.png "Add Car Form")
6. Search the web and local auto traders and add to your list including the max price you would pay
7. Enter notes regarding your search: too hard to find? Too expensive? Gas-guzzling?
  ![Enter Notes](/README-images/8-edit-car.png "Edit Car Comments")
8. Click on 'Details' in the nav bar to see all the details of your models to compare one by one
  ![Display Car Details](/README-images/6-simplified-list.png "Car Details")
9. Found out that the V8 sports you always wanted costs a fortune to maintain? Remove it by pressing the 'X' icon

Car Purchase Decision API
------------------------
## This API is a regular CRUD with endpoints that allow a user to create, view, edit, and remove a car from the database  

### Users
Supported Methods | API URL | Purpose | Visibility
----------------- | ------- | ------- | ---------
[ GET - POST ] | api/users/ | returns an existing user or creates a new user | Public - Public
[ GET ] | api/users/userId/:username | returns the user ID of a user given it's username | Protected

### Authentication
Supported Methods | API URL | Purpose | Visibility
----------------- | ------- | ------- | ---------
[ POST ] | api/auth/login | returns the authentication token of a give user | Protected
[ POST ] | api/auth/refresh | refreshes the authentication token of a user | Protected

### Cars
Supported Methods | API URL | Purpose | Visibility 
----------------- | ------- | ------- | ---------
[ POST ] | /purchaseList | adds a new car item to the purchase list | Protected
[ GET ] | /purchaseList/:userId | retrieves the list of cars for a given user by user id | Protected
[ PUT ] | /purchaseList/:carId | modifies an existing car by car id | Protected
[ DELETE ] | /purchaseList/:carId | removes a car from the list by car id | Protected

What to expect for the short term future of this app
----------------------------------------------------
* The app intends to allow you to see financing estimates for your cars based on the limit price you input. It is not yet implemented though.
* List of links to each one of the models you are tracking so that you can have specific, real world references to the dealers that are selling the ones you are interested.

Technologies Used
-----------------
* HTML
* CSS
* Bootstrap
* JavaScript
* jQuery
* NodeJS
* ExpressJS
* MongoDB
* Mongoose