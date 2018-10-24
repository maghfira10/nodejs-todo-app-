//const MongoClient= require('mongodb').MongoClient;
const {MongoClient, ObjectID}= require('mongodb');

// var Obj= new ObjectID(); // mengambil id 
// console.log(Obj);

// var user= { name : 'dara', age:25};
// var {name} = user;// untuk membuat variabel dari sebuah objek
// var {age} = user;
// console.log(name);
// console.log(age);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
        return console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to MongoDB server');

   //db.collection('Todos').find().toArray().then((docs) =>{ //tampil semua
//    db.collection('Todos').find({ // select 1
//        completed:false
//     }).toArray().then((docs1) =>{
//     console.log('Todos');
//     console.log(JSON.stringify(docs1,undefined,10));
//    }, (err) =>{
//        console.log('Unable to fetch todo',err);
       
//    });
    
    // db.collection('Todos').find().count().then((count) =>{
    //     console.log(`Todos count : ${count}`);
       
    //    }, (err) =>{
    //        console.log('Unable to fetch todo',err);
           
    //    });

    db.collection('Users').find({name : 'Dara Yasmine'}).toArray().then((docs) =>{
        console.log(JSON.stringify(docs, undefined, 2));
    });
    //db.close();
});
