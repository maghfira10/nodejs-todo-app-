const {SHA256} = require ('crypto-js');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password ='123abc';

// bcrypt.genSalt(10,(err,salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
        
//     });
// });

var hashedPassword ='$2a$10$Yb04KBl9iTveCAv0LSdy6OZV8QDs4yTyDdKxQk1.Q91kx77k91uO6';

bcrypt.compare('123!', hashedPassword, (err, res)=>{
    console.log(res);
});