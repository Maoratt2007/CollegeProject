const mongoose = require('mongoose');//sets off the mongoose
const Schema=mongoose.Schema;



// This is a item in a order
// It is connected to a Order and a Product

const OrderItem = new Schema({
    order:{
        type:Schema.Types.ObjectId,
        ref: "Order",
        required:true
    },
    product:{ // this essentially bridges between the two collections OrderItem -> Product
        type:Schema.Types.ObjectId,
        ref: "Product",
        required:true

    },
    quantity: {
        type:Number,
        default:1
    }
});

module.exports=mongoose.model('OrderItem', OrderItem)

