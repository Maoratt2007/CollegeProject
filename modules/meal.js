const mongoose= require('mongoose');//call to mongoose
const Schema=mongoose.Schema;

const Meal= new Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]

});
module.exports=mongoose.model('Meal',Meal)