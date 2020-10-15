const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthRouter = express.Router();

const jwtSecret ='1234567890!@#$%^&*()_+';

const userModel = require('../model/users')
// Authentication
// login

AuthRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.json({ 
            success: 0, 
            message: 'thieu username hoac password'
         });
    }
    userModel.findOne({ username })
        .then(userFound => {
            if (!userFound || !userFound._id) {
                res.json({ success: 0, message: 'khong ton tai nguoi dung co username tren' });
            } else {
                if (bcrypt.compareSync(password, userFound.password)) {
                    const access_token = jwt.sign({username , id : userFound._id}, jwtSecret)//create token
                    res.json({ 
                        success: 1, 
                        message: 'dang nhap thanh cong !' ,
                        access_token,
                        user : {
                            username,
                            id: userFound._id
                        }

                    } );
                } else {
                    res.json({ 
                        success: 0,
                        message: 'sai password !' 

                    });
                }
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            })
        })
})
/**
 * xu li check xem user co dung la dang dang nhap hay khong?
*/

AuthRouter.get('/check' , (req , res)=>{
    
    const access_token = req.query.access_token; // lấy ra query từ phía frontend
    
    try {
        var decoded = jwt.verify(access_token , jwtSecret );
        console.log(decoded)
        if (decoded && decoded.id) {
            res.send({
                success: 1 ,
                message : 'nguoi dung da dang nhap',
                user : decoded
            });
        }else{
            res.send({
                success : 0,
                message :'nguoi dung chua dang nhap'
            });
        }   
    } catch (error) {
        console.log(error.message)
        res.send({
            success : 0,
            message :'sai token'
        }); 
    }
})

module.exports = AuthRouter;