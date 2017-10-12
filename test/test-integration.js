/*
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const should = chai.should();
const expect = chai.expect;

const {Car} = require('../models');
const {User} = require('../users/models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
const {JWT_SECRET} = require('../config');
let testUserIds = [];

chai.use(chaiHttp);

function tearDownDb() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
}

function importDatabase() {
	let exec = require('child_process').exec
	let usersCommand = 'mongoimport --db test-cars-list-app -c users --drop --file ./users-dataset.json'
	exec(usersCommand, (err, stdout, stderr) => {
	  // check for errors or if it was succesfuly
	  console.log('=========adding users');
	});

	let carsCommand = 'mongoimport --db test-cars-list-app -c cars --drop --file ./cars-no-list-dataset.json'
	exec(carsCommand, (err, stdout, stderr) => {
	  // check for errors or if it was succesfuly
	  console.log('=========adding cars');
	});
}

function runServerAndPopulateDB() {
	// runServer(TEST_DATABASE_URL);
	importDatabase();
}

describe('Cars App', function() {

	before(function() {
    return runServerAndPopulateDB();
  });

  // after(function() {
  //   return tearDownDb();
  // });

  after(function() {
    return closeServer;
  });

	xdescribe('Root', function() {

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
		it('Should reject requests with incorrect passwords', function() {
		    return chai
		        .request(app)
		        .post('/api/auth/login')
		        .auth('test1', 'wrongPassword')
		        .then(() =>
		            expect.fail(null, null, 'Request should not succeed')
		        )
		        .catch(err => {
		            if (err instanceof chai.AssertionError) {
		                throw err;
		            }

		            const res = err.response;
		            expect(res).to.have.status(401);
		        });
		});
	});

	xdescribe('User Registration', function(){
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

	xdescribe('Car Details Calls', function() {
		it('should return 200 and the car details page on a GET request to carDetails', function() {
			return chai.request(app)
			.get('/carDetails')
			.then(function(res) {
				res.should.have.status(200);
			});
		});
	});

	describe('Purchase List Calls', function(){

		xit('should return 200 and html file on a GET request to purchaseList method', function(){
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
});
*/