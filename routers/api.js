const express = require('express');
const ApiRouter =  express.Router();

const userRouter = require('./user');
const authRouter =  require('./auth');
const cartRouter = require('./cart');
const merchandiseRouter = require('./merchandise');

ApiRouter.get('/' , (req,res)=>{
    res.send('Shop API! ');
})

ApiRouter.use('/merchandise', merchandiseRouter);
ApiRouter.use('/auth', authRouter);
ApiRouter.use('/cart', cartRouter);
// ApiRouter.use((res , req , next)=>{
//     console.log("block user admin");
// })

ApiRouter.use('/user', userRouter);

module.exports = ApiRouter;