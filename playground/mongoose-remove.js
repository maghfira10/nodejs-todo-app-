const {ObjectID} = require ('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => { // menghapus semua record di todo
    console.log(result);
    
});

// Todo.findOneAndRemove({_id:'5bc956404f7ff2e28eab747e'}).then((todo) =>{

// });

Todo.findByIdAndRemove("5bc956404f7ff2e28eab747e").then((todo)=>{
    console.log(todo);
    
});
