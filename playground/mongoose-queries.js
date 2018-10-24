const {ObjectID} = require ('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
// var id= '5bc829b8da0ad11843052cb0';

// // if (!ObjectID.isValid(id)){
// //     console.log('ID not valid');
// // }

// Todo.find({ //hasilnya array
//     _id:id
// }).then((todos)=>{
//     console.log('Todos',todos);  
// });

// Todo.findOne({ // hasilnya objek lebih direkomendasikan
//     _id:id
// }).then((todos)=>{
//     console.log('Todos',todos);  
// });

// Todo.findById(id).then((todo) =>{ // lebih disarankan jika mencari berdasrkan id
//     if (!todo){
//         return console.log('Id not Found');
//     }
//     console.log('Todo by Id',todo);
// }).catch((e)=>console.log(e));

//user fing by id

var id1='6bc7db0eea43726c0b0ba4cc';

User.findById(id1).then((docs)=>{
    if(!docs){
        return console.log('User not found');
        
    }
    console.log('Todo by id',docs);
}).catch((e)=> console.log(e));