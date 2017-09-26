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
		{
			"id":"5",
			"make":"Chevrolet",
			"model":"Corvette",
			"year": "2015",
			"trim":"Stingray",
			"engine":"6.2 V8",
			"dealerUrl":"",
			"listedPrice":"43700",
			"comments":""
		},
		{
			"id":"7",
			"make":"Chevrolet",
			"model":"Impala",
			"year": "1960",
			"trim":"Hardtop Sport",
			"engine":"5.7 V8",
			"dealerUrl":"",
			"listedPrice":"10400",
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
		$('#js-cars-list').append(renderSingleCarObject(car));
	}
}

function renderSingleCarObject(car) {
	let carView = 
	`
	<div class="col-sm-6 col-md-4">
	  <div class="thumbnail">
	    <img src="./images/${car.make}.png" alt="...">
	    <div class="caption">
	      <h3>${car.year} ${car.make} ${car.model}</h3>
	      <p>Asking price $${car.listedPrice}</p>
	      <p><a href="#" class="btn btn-primary" role="button">Details</a> 
	      	<a href="#" class="btn btn-default" role="button">Make an offer</a>
	      	<a href="#" class="btn btn-default" role="button">Remove</a>
	      </p>
	    </div>
	  </div>
	</div>
	`
	return carView;
}

function loadAllLinkHandlers() {
	handleLearnMoreButton();
	handleSignupSubmit();
	handleLoginSubmit();
	handleLogoutLink();
	handleAddNewCarSubmit();
}

function handleLearnMoreButton() {
	$('#js-learn-more').on('click', function() {
		$('#js-welcome-instructions').toggle();
		$('#js-welcome-message').toggle();
	});
}

function handleSignupSubmit() {
	$('#js-submit-signup').on('click', function() {
		alert('Goes to Signup')
	});
}

function handleLoginSubmit() {
	$('#js-submit-login').on('click', function() {
		authenticateUser();
	});
}

function handleLogoutLink() {
	$('.js-logout-link').on('click', function() {
		alert('Goes to Logout')
	});
}

function handleAddNewCarSubmit() {
	$('#js-add-new-car').on('click', function() {
		alert('clicked');
		window.location.href = '/carDetails';
	});
}

function authenticateUser() {
	// need to verify the authentication and then redirect to the correct page
	window.location.href = '/purchaseList';
}

function getAndRenderCarsList() {
	getCarsListForUser(renderListContentsView);
}

function saveNewCarDetails(car) {
	let uniqueId = Math.floor(21047*(Math.random()));
	return MY_FUTURE_CARS.cars.add({"id": uniqueId});
}

$(function() {
	getAndRenderCarsList();
	loadAllLinkHandlers();
});