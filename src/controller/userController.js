import db from "../../models";
import userService from "../service/userService";

let handleLogin = async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json ({
            errCode: 1,
            message: 'Missing inputs parameters'
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData ?  userData.user : {}
    })
}

let handleGetAllUser = async(req,res) => {
    let id = req.query.id; // All, id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parameters',
            user: []
        })
    }

    let user = await userService.handleGetAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        user
    })
}

let handleCreateNewUser = async (req,res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
    
}

let handleDeleteUser = async (req, res)=> {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing your parameters',
        })   
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let handleEditUser = async(req,res)=> {
    let data = req.body;
    if (!data.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing your parameters',
        })  
    }
    let message = await userService.updateUserData(data); 
    return res.status(200).json(message) 
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser
}