const express = require('express');

const bcrypt = require('bcryptjs');

const UserRouter = express.Router();

const userModel = require('../model/users');

UserRouter.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const hashPassword =  bcrypt.hashSync(password,12);

    userModel.create({ username, email, password : hashPassword })
        .then(userCreated => {
            console.log(userCreated);
            res.status(201).json({
                success: true,
                data: userCreated,
            })

        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            })
        })
})

// Getlist
UserRouter.get('/', (req, res) => {
    userModel.find({})
        .then(userList => {
            console.log(userList);
            res.json({
                success: true,
                data: userList,
            })

        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            })
        })
})

//get one
UserRouter.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    userModel.findById(userId)
        .then(user => {
            console.log(user);
            res.json({
                success: true,
                data: user,
            })

        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            })
        })
})

// Put
UserRouter.put('/:userId', (req, res) => {
    const userId = req.params.userId;
    const password = req.body.password;
    const email = req.body.email;
    userModel.findByIdAndUpdate(userId,{ password , email },{ new:true })
        .then(user => {
            console.log(user);
            res.json({
                success: true,
                data: user,
            })

        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            })
        })
})

//Delete
UserRouter.delete('/:userId', (req, res) => {
    const userId = req.params.userId;
    userModel.findByIdAndDelete(userId)
        .then(user => {
            console.log(user);
            res.json({
                success: true,
                data: user,
            })

        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            })
        })
})

module.exports = UserRouter;
