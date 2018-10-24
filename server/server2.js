var env = process.env.NODE_ENV || 'development';
console.log('env *****',env);


if (env === 'development'){
    process.env.PORT=3000;
    process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp';
} else if (env === 'test'){
    process.env.PORT =3000;
    process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp';
}
const _=require ('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo}= require('./models/todo');
var {User}= require('./models/user');
var {authenticate}= require ('./middleware/authenticate')

var app = express();
const port = process.env.PORT; 

app.use(bodyParser.json());

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
  
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
  });

 //private route
app.get('/users/me', authenticate, (req,res)=>{ // authenticate merupakan middleware yang cara kerjanya dia akan menjalankan authenticate terlebih dahulu
  res.send(req.user)
});



// // GET id dari parameter
// app.get('/user/:id',(req,res)=>{
//     var id = req.params.id;
//     //res.send(req.params); //artinya sistem merespon dengan paramater request

//     //valid id using is valid
//     if (!ObjectID.isValid(id)){
//         return res.status(404).send();
//     }
//          //findbyid
//         // console.log(id);
         
//         User.findById(id).then((user)=>{
//             if(!user){
//               return res.status(404).send();
//             }

//             res.send({user})
//         },(e)=>{
//             res.status(400).send(e);
//         });
//     });




    app.listen(port, ()=>{
        console.log(`Started up at port ${port}`);
    });

module.exports = {app};