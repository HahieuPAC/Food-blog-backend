import db from "../../models";
const bcrypt = require('bcrypt');
const saltRounds = 10;

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassWord = await bcrypt.hashSync(password, saltRounds);
            resolve(hashPassWord);
        } catch (error) {
            reject(error);
        }
    });
} 

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //User already exist
                
                let user = await db.user.findOne({
                    where: { email: email},
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                });
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password); 
                    if (check) {
                        userData.errCode = 0,
                        userData.errMessage = 'Done!';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3,
                        userData.errMessage= `Wrong password!`;
                    }
                }
                else {
                    userData.errCode = 2,
                    userData.errMessage= `User not found!`
                }
            }
            else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's email ins't exist in your system. pls try other email!`;
                
            }

            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.user.findOne({
                where: {email: userEmail}
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetAllUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = null;
            if (id == 'ALL') {
                users = await db.user.findAll({
                    
                });
            }
            if (id && id !== 'ALL') {
                users = await db.user.findOne({
                    where: {id : id},
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })

}

let createNewUser = (data) => {
    return new Promise( async (resolve, reject) => {
        let check = await checkUserEmail(data.email);
        if (check) {
            resolve({
                errCode: 1,
                errMessage: 'Your email is exist'});
        }
        else {
            try {
                let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.user.create({
                    email: data.email,
                    password: hashUserPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true:false,
                    roleId: data.roleId,
                })
                resolve({
                    errCode: 0,
                    message: 'Ok'});
            } catch (error) {
                reject(error);
            }
        }
    })
} 

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = await db.user.findOne({
                where: { id: userId }
            });

            if (userData) {
                await db.user.destroy({
                    where: { id: userId }
                });
                resolve({
                    errCode: 0,
                    message: "delete user done"
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "This user isn't exist"
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = await db.user.findOne({
                where: { id: data.id },
                raw: false
            });

            if (userData) {
                userData.firstName = data.firstName;
                userData.lastName = data.lastName;
                userData.address = data.address;

                await userData.save();
                    
                resolve({
                    errCode: 0,
                    message: "update the user success!"
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User not found"
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};






module.exports = {
    handleUserLogin: handleUserLogin,
    handleGetAllUser: handleGetAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData
}