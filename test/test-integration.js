
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



describe('Cars App', function() {

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

	describe('Purchase List Calls', function(){

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
