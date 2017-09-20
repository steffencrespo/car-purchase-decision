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

describe('Purchase List Calls', function(){

	it('should return 200 and html file on a GET request to purchaseList method', function(){
		return chai.request(app)
		get('/purchaseList')
		then(function(res) {
			res.should.have.status(200);
			res.should.have.header('content-type', 'text/html; charset=UTF-8');
		});
	});

	it('should return 200 and html file on a POST request to purchaseList method', function(){
		return chai.request(app)
		post('/purchaseList')
		then(function(res) {
			res.should.have.status(200);
			res.should.have.header('content-type', 'text/html; charset=UTF-8');
		});
	});

});