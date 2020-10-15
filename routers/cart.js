const express = require('express');

const CartRouter = express.Router();

const cartModel = require('../model/carts');

CartRouter.post('/', (req , res)=>{
    const {name , id ,image , quantity , price , size , subtotal} = req.body;
    cartModel.create({name , id ,image , quantity , price, size , subtotal})
    .then(cartCreated => {
        console.log(cartCreated);
        res.status(201).json({
            success: true,
            data: cartCreated
        })

    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        })
    })
})
// get list 
CartRouter.get('/' , (req , res)=>{
    // const { page=1 , pageSize=5 } = req.query;
    cartModel.find({},{
        _v:0
    })
    // .sort({price : 1})
    .populate('user',{
        password :0,
        email :0
    })
    // .limit(Number(pageSize))
    // .skip((Number(page) - 1)*Number(pageSize))
    .then(cartList =>{
        console.log(cartList);
        cartModel.count({}).then(total =>{
            res.json({
                success: true,
                // totalPage: Math.ceil(total/Number(pageSize)),
                data: cartList,
            })
        })
            
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        })
    })
})

CartRouter.get('/:cartId', (req , res)=>{
    const cartId = req.params.cartId ;

    cartModel.findById(cartId)
    .then(cart =>{
        console.log(cart);
            res.json({
                success: true,
                data: cart,
            })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        })
    })
})

CartRouter.put('/:cartId', (req, res)=>{
    const cartId = req.params.cartId;
    const {id ,image , name , price ,quantity , subtotal} = req.body;

    cartModel
    .findByIdAndUpdate(cartId,{id ,image , name , price ,quantity , subtotal} , {new : true})
    .then(cart =>{
        console.log(cart);
            res.json({
                success: true,
                data: cart,
            })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        })
    })
})

CartRouter.delete('/:cartId' , (req , res)=>{
    const cartId = req.params.cartId;
    
    cartModel.findByIdAndRemove(cartId)
    .then(cart =>{
        console.log(cart);
            res.json({
                success: true,
                data: cart,
            })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        })
    })
})

module.exports = CartRouter;