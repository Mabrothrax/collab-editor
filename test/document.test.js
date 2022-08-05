process.env.NODE_ENV = 'dev'

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../app');

chai.use(chaiHttp);

describe('return main document', () => {
    it('it should return the main html document', (done) => {
      chai.request(server)
          .get('/')
          .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            done();
        })
    });
});

describe('returns 404 error', () => {
    it('it should return 404 error page', (done) => {
      chai.request(server)
          .get('/admin')
          .end(function (err, res) {
            expect(res).to.have.status(404);
            expect(res.text).to.include('Nothing to see here')
            done();
        })
    });
});