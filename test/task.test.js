// test/task.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Tasks API', () => {
  it('should get all tasks', (done) => {
    chai.request(app)
      .get('/api/tasks')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});