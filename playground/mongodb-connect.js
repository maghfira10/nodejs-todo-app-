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
        console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text : 'Something to do',
    //     completed : false
    // }, (err, result) =>{
    //     if(err){
    //         return console.log('Unable To insert todo', err);
            
    //     }
    //     console.log(JSON.stringify(result.ops , undefined, 2));
        
    // });

    db.collection('Users').insertOne({
       
        name : 'Dara Yasmine',
        age : 22,
        location :'Pekanbaru'
    }, (err, result) =>{
        if(err){
            return console.log('Unable To insert todo', err);
            
        }
        console.log(result.ops[0]._id.getTimestamp());
        
    });
    
    db.close();
});
