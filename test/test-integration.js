const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const should = chai.should();
const expect = chai.expect;

const {Car} = require('../models');
const {User} = require('../users/models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
let testUserIds = [];

chai.use(chaiHttp);

function tearDownDb() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
}

function seedAllData() {
	// seedUserData();
	// seedCarsData();
}

function seedUserData() {
	User.insertMany([
		{ username: 'test1', password: 'test1234567', firstName: 'one', lastName: 'person'},
		{ username: 'test2', password: 'test1234567', firstName: 'other', lastName: 'person'}]);
}

function seedCarsData() {
	console.info('adding cars to the database');
	const seedData = [];

	for (let i=1; i<=10; i++) {
		seedData.push(generateCarData());
	}

	return Car.insertMany(seedData);
}

function assignUserIdToCar() {
	const userIds = ["59da70425ebf2808bcfd374f", "59dbc7c79bef4f146c431b51"];
	return userIds[Math.floor(Math.random() * userIds.length)];
}

function generateCarMake() {
	const makes = ['Ford', 'BMW', 'Chevrolet', 'VW', 'Audi', 'Honda', 'Cadillac'];
	return makes[Math.floor(Math.random() * makes.length)];
}

function generateCarEngine() {
	const engines = ['2.0 i-4', '3.0 i-6', '5.7 v8', '4.8 v8', '2.0 v6', '2.4 i-4', 'Hybrid'];
	return engines[Math.floor(Math.random() * engines.length)];
}

function generateCarData() {
	return {
		userId: assignUserIdToCar(),
    make: generateCarMake(),
    model: faker.lorem.word(),
    year: "2015",
    trim: "Base",
    engine: generateCarEngine(),
    dealerUrl: "www.google.com",
    listedPrice: 12000,
    sellerName: "dealer",
    comments: ""
	}
}

describe('Cars App', function() {

	before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  before(function() {
    return seedAllData();
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