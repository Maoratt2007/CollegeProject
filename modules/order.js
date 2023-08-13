const mongoose = require('mongoose');//sets off the mongoose
const Schema=mongoose.Schema;

const Order = new Schema({
    name:{
        type:String
    },
    price: {
        type:Number
    },

    address: {
        type: String,
    },
    credit_card : {
        type:String,
    },
    items: [
            { type:Schema.Types.ObjectId, ref :"Product"}
        ]}); // A Order a has an array of OrderItem

module.exports=mongoose.model('Order', Order)