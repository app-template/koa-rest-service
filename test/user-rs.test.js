const app = require('../app');
const request = require('supertest').agent(app.listen());
const assert = require('chai').assert
  

describe('User CRUD', () => {
    let newId;
    it('create new user', (done) => {
        request.post('/api/users')
            .send({
              username: 'reda',
              passwd: 'koa'
            })
            .expect(res => {
                assert.isNotNull(res.body.id);
                assert.equal(res.body.username, 'reda');
                assert.equal(res.body.passwd, 'koa');
                newId = res.body.id;
            })
            .expect(201,done);
    });
      
    it('findById', (done) => {
        request.get(`/api/users/${newId}`)
            .expect({
                id:newId,
                username: 'reda',
                passwd:'koa'
            }).expect(200, done);
    });
    
    it('remove', (done) => {
        request.delete(`/api/users/${newId}`)
            .expect(200, done);
    })
});