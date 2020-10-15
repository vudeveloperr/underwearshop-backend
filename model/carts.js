const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    id :{
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    quantity:{
        type : Number,
        required : true
    },
    size:{
        type: String,
        required: true
    },
    price :{
        type : Number,
        required : true
    },
    subtotal :{
        type : Number,
        required :true
    }
})

module.exports = mongoose.model('Cart', CartSchema)