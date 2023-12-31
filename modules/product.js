const mongoose=require('mongoose');//sets off the mongoose
const Schema=mongoose.Schema;

const Product= new Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    category: {
        type: String,
        enum: ["food", "drink","dessert"]
    },
    description: {
        type:String
    },
    image:{
        type:String
    },
    isShow:{
        type:Boolean
    },
    webServiceId: {
        type: String
    },
    fat:{
        type:Number,
        default:0
    }

});

module.exports=mongoose.model('Product', Product)