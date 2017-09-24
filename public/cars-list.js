const MY_FUTURE_CARS = {
	"listName": "next sports car",
	"cars": [
		{
			"id":"1",
			"make":"BMW",
			"model":"X5",
			"year": "2015",
			"trim":"48i",
			"engine":"4.8 V8",
			"dealerUrl":"",
			"listedPrice":"34000",
			"comments":""
		},
		{
			"id":"2",
			"make":"BMW",
			"model":"740",
			"year": "2015",
			"trim":"i",
			"engine":"3.0 i-6",
			"dealerUrl":"",
			"listedPrice":"50000",
			"comments":""
		},
		{
			"id":"3",
			"make":"Ford",
			"model":"Thunderbird",
			"year": "2005",
			"trim":"Premium",
			"engine":"3.9 V8",
			"dealerUrl":"",
			"listedPrice":"38000",
			"comments":""
		},
		{
			"id":"4",
			"make":"Chevrolet",
			"model":"Camaro",
			"year": "2015",
			"trim":"SS",
			"engine":"6.2 V8",
			"dealerUrl":"",
			"listedPrice":"23700",
			"comments":""
		},
	]
}

// will take care of calling the service and passing the returned data into the callback
function getCarsListForUser(callbackFn) {
	setTimeout(function() { callbackFn(MY_FUTURE_CARS)}, 100);
}

// takes a list of cars as parameter, which will be returned from a service
// this function is passed as callback to the getCarListForUser method so it can get the list of cars as param
function renderListContentsView(list) {
	for(index in list.cars) {
		let car = list.cars[index];
		$('#js-cars-list').append(`<p> ${car.year} - ${car.make} - ${car.model} - ${car.listedPrice} </p>`);
	}
}

function loadAllLinkHandlers() {
	handleSignupLink();
	handleLoginLink();
	handleLogoutLink();
	handleHomeLink();
	handleProfileLink();
}

function handleSignupLink() {
	$('.js-signup-link').on('click', function(){
		alert('Goes to Signup')
	});
}

function handleLoginLink() {
	$('.js-login-link').on('click', function(){
		alert('Goes to Login')
	});
}

function handleLogoutLink() {
	$('.js-logout-link').on('click', function(){
		alert('Goes to Logout')
	});
}

function handleHomeLink() {
	$('.js-home-link').on('click', function(){
		alert('Goes to Home')
	});
}

function handleProfileLink() {
	$('.js-profile-link').on('click', function(){
		alert('Goes to Profile')
	});
}

function getAndRenderCarsList() {
	getCarsListForUser(renderListContentsView);
}

$(function() {
	getAndRenderCarsList();
	loadAllLinkHandlers();
});