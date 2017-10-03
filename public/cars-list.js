// will take care of calling the service and passing the returned data into the callback
function getCarsListForUser(callbackFn) {
	// setTimeout(function() { callbackFn(MY_FUTURE_CARS)}, 100);
	fetch('/api/purchaseList')
		.then(res => res.json())
		.then(callbackFn);
}

// takes a list of cars as parameter, which will be returned from a service
// this function is passed as callback to the getCarListForUser method so it can get the list of cars as param
function renderListContentsView(list) {
	list.carsLists.map(e => {
		console.log("1.", e);
		e.cars.map(car => {
			console.log("2.", car);
			$('#js-cars-list').append(renderSingleCarObject(car));
		})
	});
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
	handleAddNewCarButton();
	submitCarDetailsForm();
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

function handleAddNewCarButton() {
	$('#js-add-new-car').on('click', function() {
		window.location.href = '/carDetails';
	});
}

function submitCarDetailsForm() {
	let car = {};
	$('#js-car-details-form').on('click', '#js-car-details-submit', function(e) {
		car.id = Math.floor(21047*(Math.random()));
		car.make = $('#car-make').val();
		car.model = $('#car-model').val();
		car.year = $('#car-year').val();
		car.trim = $('#car-trim').val();
		car.engine = $('#car-engine').val();
		car.sellerName = $('#car-seller-name').val();
		car.sellerPhone = $('#car-seller-phone').val();
		car.sellerEmail = $('#car-seller-email').val();
		car.sellerWebsite = $('#car-seller-website').val();
		saveNewCarDetails(car);
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
	return MY_FUTURE_CARS.cars.push(car);
}

$(function() {
	getAndRenderCarsList();
	loadAllLinkHandlers();
});