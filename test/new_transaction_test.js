var request = require('supertest');
var app = require('../app.js');

describe('GET /new_transaction', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
