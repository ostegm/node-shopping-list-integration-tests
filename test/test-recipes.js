const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const {runServer, closeServer, app} = require('../server')


describe('Recipe Integration Tests', function() {
  before(function() {
    return runServer();
  });
  after(function() {
    return closeServer();
  });

  it('Should list recipes on GET', function() {
    return chai.request(app)
      .get('/recipes')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.at.least(1);
        const expectedKeys = ['name', 'ingredients', 'id'];
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys(expectedKeys);
        })
      })
  })

})