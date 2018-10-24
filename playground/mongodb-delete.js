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

    // delete many
    // db.collection('Todos').deleteMany({text :'main'}).then((result)=>{
    //     console.log(result);
    // });

    // delete one
    // db.collection('Todos').deleteOne({text : 'dara manis'}).then((result)=>{
    //     console.log(result);
    // })
    //find one and delete
    db.collection('Todos').findOneAndDelete({text :'dara manis'}).then((result)=>{
        
            console.log(JSON.stringify(result,undefined, 2));
            
      
    });
    //db.close();

});
