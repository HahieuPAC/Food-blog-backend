const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

let createNewUser = (data) => {
    console.log('data from service',data);
}

let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        resolve = bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                // Store hash in your password DB.
            });
        })
    })
}

module.exports = {
    createNewUser: createNewUser,
}