// will take care of calling the service and passing the returned data into the callback
function getCarsListForUser(callbackFn) {
	// setTimeout(function() { callbackFn(MY_FUTURE_CARS)}, 100);
	fetch('/purchaseList')
		.then(res => res.json())
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
		window.location.href = '/car-details.html';
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

function authenticateUser() {
	// need to verify the authentication and then redirect to the correct page
	window.location.href = '/purchase.html';
}

function getAndRenderCarsList() {
	getCarsListForUser(renderListContentsView);
}

function saveNewCarDetails(car) {
	$.ajax({
		url: 'http://localhost:8080/purchaseList',
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

$(function() {
	console.log('loading handlers');
	getAndRenderCarsList();
	loadAllLinkHandlers();
});