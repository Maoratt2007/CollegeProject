const mongoose = require('mongoose');//sets off the mongoose
const Schema=mongoose.Schema;

const User = new Schema({
    name:{
        type:String
    }, 
    email:  {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    manager:{
        type:Boolean
    }
}); // A Order a has an array of OrderItem

module.exports = mongoose.model('User', User)
