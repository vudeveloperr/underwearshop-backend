const express = require('express');

const MerchandiseRouter = express.Router();

const merchandiseModel = require('../model/merchandises');

MerchandiseRouter.post('/', (req , res)=>{
    const {id ,image , name , size ,color ,description ,price ,quantity ,types , states} = req.body;
    merchandiseModel.create({id ,image , name , size ,color ,description ,price ,quantity ,types , states})
    .then(merchandiseCreated => {
        // console.log(merchandiseCreated);
        res.status(201).json({
            success: true,
            data: merchandiseCreated
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
MerchandiseRouter.get('/' , (req , res)=>{
    const { color , size , types , states , minPrice, maxPrice } = req.query;
    const { page=1 , pageSize=16 } = req.query;
    
    const query =  {};

    if (color ) {
        query.color = color ;       
    }
    if (types ) {
        query.types = types ;    
    }
    if (states ) {
        query.states = states;
    }
    if (size ) {
        query.size = size;
    }
    if (minPrice && maxPrice) {
        query['$and'] = [
            { price : { $gte: minPrice } },
            { price : { $lte: maxPrice } },
        ]
    }
    merchandiseModel.find(query,{
        _v:0
    }).sort({ price: -1 })
    .limit(Number(pageSize))
    .skip((Number(page) - 1)*Number(pageSize))
    .then(merchandiseList =>{
        merchandiseModel.count({}).then(total =>{
            res.json({
                success: true,
                totalPage: Math.ceil(total/Number(pageSize)),
                data: merchandiseList,
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

MerchandiseRouter.get('/:merchandiseId', (req , res)=>{
    const merchandiseId = req.params.merchandiseId ;
    
    merchandiseModel.findById(merchandiseId)
    .then(merchandise =>{
        // console.log(merchandise);
            res.json({
                success: true,
                data: merchandise,
            })

    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        })
    })
})

MerchandiseRouter.put('/:merchandiseId', (req, res)=>{
    const merchandiseId = req.params.merchandiseId;
    const {id ,image , name , size ,color ,description ,price ,quantity ,types , states} = req.body;

    merchandiseModel
    .findByIdAndUpdate(merchandiseId,{id ,image , name , size ,color ,description ,price ,quantity ,types , states} , {new : true})
    .then(merchandise =>{
        console.log(merchandise);
            res.json({
                success: true,
                data: merchandise,
            })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        })
    })
})

MerchandiseRouter.delete('/:merchandiseId' , (req , res)=>{
    const merchandiseId = req.params.merchandiseId;
    
    merchandiseModel.findByIdAndRemove(merchandiseId)
    .then(merchandise =>{
        console.log(merchandise);
            res.json({
                success: true,
                data: merchandise,
            })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        })
    })
})


module.exports = MerchandiseRouter;