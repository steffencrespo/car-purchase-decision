const BASE_URL = 'http://localhost:8080';
const LOGIN = BASE_URL+'/api/auth/login';
const REGISTER = BASE_URL+'/api/users/';
const SAVE_CAR = BASE_URL+'/purchaseList';

// will take care of calling the service and passing the returned data into the callback
function getCarsListForUser(callbackFn) {
	const options = {
		headers: {'contentType': 'application/json', 'Authorization': 'Bearer ' + localStorage.token}
	};
	fetch(`/purchaseList/${localStorage.userId}`, options)
		.then(res => {
			if(res.status === 401) {
				alert('not authorized');
			} else {
				return res.json();
			}
		})
		.then(callbackFn);
}

// takes a list of cars as parameter, which will be returned from a service
// this function is passed as callback to the getCarListForUser method so it can get the list of cars as param
function renderListContentsView(list) {
	console.log(list.cars);
	list.cars.map(car => {
			console.log("2.", car);
			$('#js-cars-list').append(renderSingleCarObject(car));
		}
	);
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
	      	<a href="#" id="${car.year} ${car.make} ${car.model}" class="car-offer btn btn-default" role="button">Make an offer</a>
	      	<a href="#" id=${car.id} class="car-remove btn btn-default" role="button">Remove</a>
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
	handleRemoveCarButton();
	handleMakeAnOfferButton();
	submitCarDetailsForm();
}

function handleLearnMoreButton() {
	$('#js-learn-more').on('click', function() {
		$('#js-welcome-instructions').toggle();
		$('#js-welcome-message').toggle();
	});
}

function handleSignupSubmit() {
	$('#js-submit-signup').on('click', function(e) {
		e.preventDefault();
		let user = {
			username: $('#username-signup').val(),
			password: $('#password-signup').val(),
			firstName: $('#first-name-signup').val(),
			lastName: $('#last-name-signup').val()
		}
		registerNewUser(user);
	});
}

function handleLoginSubmit() {
	$('#js-submit-login').on('click', function(e) {
		e.preventDefault();
		let user = {
			username: $('#userName').val(),
			password: $('#userPassword').val()
		}
		authenticateUser(user);
	});
}

function handleLogoutLink() {
	$('#js-logout-link').on('click', function() {
		localStorage.clear();
		alert("You are no longer logged in.");
	});
}

function handleAddNewCarButton() {
	$('#js-add-new-car').on('click', function() {
		window.location.href = '/car-details.html';
	});
}

function handleRemoveCarButton() {
	$('#js-cars-list').on('click', '.car-remove', function(e) {
		e.preventDefault();
		removeCar(e.target.id);
	});
}

function handleMakeAnOfferButton() {
	$('#js-cars-list').on('click', '.car-offer', function(e) {
		e.preventDefault();
		alert(`I am interested in your ${e.target.id}. What is the best price you would consider in order to sell it now?`);
	});
}

function submitCarDetailsForm() {
	console.log('submitCarDetais loaded');
	$('#js-car-details-form').submit(function(e) {
		e.preventDefault();
		let car = {};
		car.make = $('#car-make').val();
		car.model = $('#car-model').val();
		car.year = $('#car-year').val();
		car.listedPrice = $('#car-price').val();
		car.trim = $('#car-trim').val();
		car.engine = $('#car-engine').val();
		car.sellerName = $('#car-seller-name').val();
		car.sellerPhone = $('#car-seller-phone').val();
		car.sellerEmail = $('#car-seller-email').val();
		car.dealerUrl = $('#car-seller-website').val();
		car.comments = '';
		saveNewCarDetails(car);
	});
}

function authenticateUser(user) {
	// need to verify the authentication and then redirect to the correct page
	localStorage.token = $.ajax({
		url: LOGIN,
		type: 'POST',
		async: false,
		username: user.username,
		password: user.password,
		success: function(res) {
			// localStorage.token = res.authToken.responseJSON.authToken;
		}
	}).responseJSON.authToken;
	localStorage.userId = '1';
	
	window.location.href = '/purchase.html';
}

function registerNewUser(user) {
	$.ajax({
		url: REGISTER,
		type: 'POST',
		async: false,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(user),
		success: function(res) {
			alert("Welcome");
		}
	});
}

function getAndRenderCarsList() {
	if (localStorage.token && localStorage.userId) {
			getCarsListForUser(renderListContentsView);
	}
}

function saveNewCarDetails(car) {
	$.ajax({
		url: SAVE_CAR,
		headers: {'contentType': 'application/json', 'Authorization': 'Bearer ' + localStorage.token},
		async: false,
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(car),
		success: function(data) {
			alert('success');
			window.location.href = '/purchase.html';
		}
	});
}

function removeCar(carId) {
	$.ajax({
		url: SAVE_CAR+`/${carId}`,
		headers: {'contentType': 'application/json', 'Authorization': 'Bearer ' + localStorage.token},
		async: false,
		type: 'DELETE',
		success: function(data) {
			alert('successfully removed');
			window.location.href = '/purchase.html';
		}
	});
}

$(function() {
	console.log('loading handlers');
	getAndRenderCarsList();
	loadAllLinkHandlers();
});