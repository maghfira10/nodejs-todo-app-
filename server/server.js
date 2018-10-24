var {mongoose} = require('./db/mongoose');
//save new something

// var Todo= mongoose.model('Todo',{
//     text : {
//         type : String,
//         required : true,
//         minlength: 1,
//         trim: true // untuk menghilangkan spasi depan atau belakang
//     },
//     completed :{
//         type : Boolean,
//         default : false
//     },
//     completedAt :{
//         type : Number,
//         default :null
//     }
// });

// var newTodo1 = new Todo({
//     text : true
// });

// newTodo1.save().then((doc)=>{
//     console.log("Saved Todo", doc);
// }, (e)=>{
//     console.log('Unable tu save to do');
    
// });

var User= mongoose.model('User',{
    email: {
        type : String,
        required : true,
        minlength: 1,
        trim: true // untuk menghilangkan spasi depan atau belakang
    }
});

var user= new User({
    email :'Darayasmine@gmail.com'
});

user.save().then((docs)=>{
    console.log('Berhasil',docs);
},(e)=>{
    console.log('Nggak bisa');
    
});