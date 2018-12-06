const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const User = require('./../models/User');

// beforeEach((done) => {
//   User.remove({}).then(() => done());
// });


describe('POST /api/users/register', () => {
  it('should create a new user', (done) => {
    const user = {
      email: 'test@test.com',
      name: 'testingname',
      password: 'test12345',
      password2: 'test12345'
    }

    request(app)
      .post('/api/users/register')
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe(user.email);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        User.find().then((users) => {
          expect(users.length).toBe(1);
          expect(users[0].email).toBe(user.email);
          done();
        }).catch((e) => done(e))
      });
  });
});
