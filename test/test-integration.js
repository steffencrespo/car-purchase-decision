const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Root', function() {

	it('should return 200 on hitting the root url', function(){
		return chai.request(app)
			.get('/')
			.then(function(res) {
				res.should.have.status(200);
				res.should.have.header('content-type', 'text/html; charset=UTF-8');
			});
	});

});

describe('User Authentication', function() {
	it('should return 200 and the login page on hitting /login', function() {
		return chai.request(app)
		.get('/login')
		.then(function(res) {
			res.should.have.status(200);
			res.should.have.header('content-type', 'text/html; charset=UTF-8');
		});
	});

	it('should successfully sign the user in on POST /login', function() {
		let user = {username: 'leo', password: 'secret'};
		return chai.request(app)
		.post('/login')
		.send(user)
		.then(function(res) {
			res.should.have.status(200);
			res.body.should.include(user);
		});
	});
});

describe('User Registration', function(){
	it('should return 200 and the signup page on hitting /signup', function(){
		return chai.request(app)
		.get('/signup')
		.then(function(res) {
			res.should.have.status(200);
		});
	});

	it('should return 200 and the signup page on hitting /signup', function(){
		return chai.request(app)
		.post('/signup')
		.then(function(res) {
			res.should.have.status(201);
		});
	});
});

describe('Car Details Calls', function() {
	it('should return 200 and the car details page on a GET request to carDetails', function() {
		return chai.request(app)
		.get('/carDetails')
		.then(function(res) {
			res.should.have.status(200);
		});
	});
});

describe('Purchase List Calls', function(){

	it('should return 200 and html file on a GET request to purchaseList method', function(){
		// return chai.request(app)
		// get('/purchaseList')
		// then(function(res) {
		// 	res.should.have.status(200);
		// 	res.should.have.header('content-type', 'text/html; charset=UTF-8');
		// });
		let res;
		return chai.request(app)
			.get('/purchaseList')
			.then(function(_res) {
				res = _res;
				res.should.have.status(200);
			})

	});

	it('should return 200 and html file on a POST request to purchaseList method', function(){
		return chai.request(app)
		post('/purchaseList')
		then(function(res) {
			res.should.have.status(200);
			res.should.have.header('content-type', 'text/html; charset=UTF-8');
		});
	});

	it('should return 200 and html file on a PUT request to purchaseList method', function(){
		return chai.request(app)
		put('/purchaseList/22')
		then(function(res) {
			res.should.have.status(200);
			res.should.have.header('content-type', 'text/html; charset=UTF-8');
		});
	});

	it('should return 201 on a DELETE request to purchaseList method', function(){
		return chai.request(app)
		put('/purchaseList/22')
		then(function(res) {
			res.should.have.status(201);
		});
	});
});