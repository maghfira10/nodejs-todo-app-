const
chai = require ('chai'),
chaiHttp = require ('chai-http');

const {app} = require('./../server1');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require ('./seed/seed');

chai.should();
chai.use(chaiHttp);

beforeEach(populateTodos);   //membersihkan koleksi TODOS sebelum di tes
beforeEach(populateUsers);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
      var text = 'REEEE';
  
      chai.request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({text})                                                                             

        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('text');
           done();
          });
       
          Todo.find({text}).then((todos) => {
            todos.should.have.lengthOf(1);
            todos[0].should.have.property('text');
            done();
          })
        });
    });
  
    // it('should not create todo with invalid body data', (done) => {
    //   chai.request(app)
    //     .post('/todos')
    //     .set('x-auth', users[0].tokens[0].token)
    //     .send({})
    //     .end((err, res) => {
    //         res.should.have.status(400);
    //         if(err) {
    //         return done(err)
    //         }
        
    //       Todo.find().then((todos) => {
    //         todos.should.have.lengthOf(2)
    //         done();
    //       }).catch((e) => done(e));
    //     });
    // });
  
  