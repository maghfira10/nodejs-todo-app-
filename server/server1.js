// ini server salah untuk todos
require ('./config/config')

const _=require ('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require ('mongodb');
const bcrypt = require ('bcryptjs');
var {mongoose} = require('./db/mongoose');
var {Todo}= require('./models/todo');
var {User}= require('./models/user');
var {authenticate}= require ('./middleware/authenticate')
var app = express();
const port = process.env.PORT; 

app.use(bodyParser.json());

app.post('/todos', authenticate, async (req, res)=>{
    try {
        var todo= new Todo({
        text: req.body.text,
        _creator : req.user._id
    });
    const docs = await todo.save()
    res.send(docs);
} catch(e) {
    res.status(400).send(e);
}    
    });

app.get('/todos', authenticate, async (req,res)=>{
    try {
       const todos = await Todo.find({
        _creator : req.user._id
    })
        res.send({todos})
    }catch (e) {
        res.status(400).send(e);
 }
 });
// GET id dari parameter
app.get('/todos/:id', authenticate, async (req,res)=>{
    var id = req.params.id;
    //res.send(req.params); //artinya sistem merespon dengan paramater request

    //valid id using is valid
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
         //findbyid
         try {
     const todo = await Todo.findOne({
            _id : id,
            _creator : req.user._id
        })
            if(!todo){
              return res.status(404).send();
            }
            res.send({todo})
    }catch(e){
            res.status(400).send(e);
    }
        });
    

    app.delete('/todos/:id', authenticate, async (req,res)=>{
        // get the id
        try {
        var id= req.params.id;

        //validate the id => not valid return 404
        if (!ObjectID.isValid(id)){
            return res.status(404).send();
        }
        //remove todo by id
        const todo = await Todo.findOneAndRemove({
            _id : id,
            _creator : req.user._id
            
        })
            //success
            if(!todo){
                return res.status(404).send();
             }
           res.send({todo});
            }catch(e){
            res.status(400).send(e);
        }
                // if doc, send doc back with 200
            //error
                //404 with empty od\\body
    });

    app.patch('/todos/:id', authenticate, async (req, res) => {
        try {

      
        var id = req.params.id;
        var body = _.pick(req.body, ['text', 'completed']);
      
        if (!ObjectID.isValid(id)) {
          return res.status(404).send();
        }
      
        if (_.isBoolean(body.completed) && body.completed) {
          body.completedAt = new Date().getTime();
        } else {
          body.completed = false;
          body.completedAt = null;
        }
      
        
       const todo = await  Todo.findOneAndUpdate({_id: id, _creator : req.user._id}, {$set: body}, {new: true})
          if (!todo) {
            return res.status(404).send();
          }
      
          res.send({todo});
        }catch(e){
          res.status(400).send();
        }
      });
      

    app.post('/user', async (req, res)=>{
        try {

    
        var user= new User({
            email: req.body.email,
            password : req.body.password
    
        });
    
        const docs = await user.save()
           res.send(docs);
        } catch (e){
            res.status(400).send(e);
        }
        });
    

    app.post('/users', async (req, res) => {
        try {
        var body = _.pick(req.body, ['email', 'password']);
        var user = new User(body);

        await user.save()
          const token = await user.generateAuthToken();
          res.header('x-auth', token).send(user);
        }catch(e)  {
         res.status(400).send(e);
        }
    })

 //private route
app.get('/users/me', authenticate, (req,res)=>{
  res.send(req.user)
});


//post /user/login {email, password}
app.post('/users/login', async (req, res)=>{
    try {
        var body = _.pick(req.body, ['email', 'password']);
    
      const user =  await User.finByCredentials(body.email,body.password)
      const token= await user.generateAuthToken()
        res.header('x-auth', token).send(user);
        
    }catch(e){
        res.status(400).send();
    }
    
});

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token)
        res.status(200).send();
    } catch(e) {
        res.status(400).send();
    } 
    });

app.listen(port, ()=>{
    console.log(`Started up at port ${port}`);
});

module.exports = {app};