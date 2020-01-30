const app = require('../app');
const { expect } = require('chai');
const supertest = require('supertest');

describe('GET /apps test', () => {
	// test for happy case
	it('should get a 400 response', () => {
		return supertest(app).get('/apps').expect(400);
	});

	// test for query parameter
	it('should be a query parameter', () => {
		return supertest(app)
			.get('/apps')
			.query({
				rating: 3,
				genres: 'Puzzle'
			})
			.then((res) => {
				expect(res.body[0].Genres).to.equal('Puzzle');
			});
	});

	// Validation test
	it('should sort by Rating', () => {
		return supertest(app)
			.get('/apps')
			.query({
				rating: 3,
				genres: 'Puzzle'
			})
			.expect(200)
			.then(
				(res) => {
					expect(res.body[0].Rating).to.be.a('number');
				}
				// expect(sorted).to.be.true;
			);
	});
});
