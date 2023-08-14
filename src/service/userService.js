import db from "../../models";

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //User already exist
                //compare password
                resolve();
            }
            else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's email ins't exist in your system. pls try other email!`;
                resolve(userData);
            }
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
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
}