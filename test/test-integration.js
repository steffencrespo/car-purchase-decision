const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Static Contents', function() {

	it('should return 200 on hitting the root url', function(){
		return chai.request(app)
			.get('/')
			.then(function(res) {
				res.should.have.status(200);
				res.should.have.header('content-type', 'text/html; charset=UTF-8');
			});
	});

});