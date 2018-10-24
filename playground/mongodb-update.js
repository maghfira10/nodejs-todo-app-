//const MongoClient= require('mongodb').MongoClient;
const {MongoClient, ObjectID}= require('mongodb');

// var Obj= new ObjectID(); // mengambil id 
// console.log(Obj);

// var user= { name : 'dara', age:25};
// var {name} = user;// untuk membuat variabel dari sebuah objek
// var {age} = user;
// console.log(name);
// console.log(age);

// MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
//     if(err){
//         return console.log('Unable to connect to MongoDb server');
//     }
//     console.log('Connected to MongoDB server');

//     db.collection('Todos').findOneAndUpdate({
//         _id: new ObjectID("5bc6e92b4f7ff2e28eab48cd")
//     }, {
//         $set:{
//             completed : false
//         }
//     },{
//         returnOriginal: false
//     }).then ((result)=>{
//         console.log(result); 
//     });

// });

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
        return console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Users').findOneAndUpdate({
        age :22,
    }, {
        $set:{
            name : 'DAYAS' // update nilai dalam sebuah dokumn. bisa di lihat di mongodb update operators
        },
        $inc:{ // untuk update increment
            age :2
        }
    },{
        returnOriginal: false
    }).then ((result)=>{
        console.log(result); 
    });

});
