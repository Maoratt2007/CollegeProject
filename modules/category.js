const mongoose= require('mongoose');//call to mongoose
const Schema=mongoose.Schema;
//make our struct
const Category= new Schema({

    name:{
        type:String
    }

});
module.exports=mongoose.model('Category',Category)




//modules
//mongodb 
//groupby 
// login
//order 
