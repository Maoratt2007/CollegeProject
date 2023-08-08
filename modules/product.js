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
    }
});

module.exports=mongoose.model('Product', Product)
