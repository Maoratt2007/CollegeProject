const mongoose= require('mongoose');//call to mongoose
const Schema=mongoose.Schema;
const Category=require('./category')

//make our struct
const Product= new Schema({
    //הירושה את שאר המשתנים תוסיפו לפי הטבלת יישיות ששלחתי בקבוצה
    name:{
        type:String
    },
    price:{
        type:Number
    },
    category:Category.schema,
});
const Meal= new Schema({

    name:{
        type:String
    },
    price:{
        type:Number
    },
    productsarr:[Product]


});
module.exports=mongoose.model('Meal',Meal)