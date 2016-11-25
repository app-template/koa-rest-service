const app = require('../app');
const request = require('supertest').agent(app.listen());
const assert = require('chai').assert
  

describe('User CRUD', () => {
    let newId;
    it('findAll', (done) => {
        request.get('/api/users')
            .expect(res => {
                assert.isNotNull(res.body.id);
                assert.equal(res.body.length, 3);
                newId = res.body.id;
            })
            .expect(200,done);
    });
});