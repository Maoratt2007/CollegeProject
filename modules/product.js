const mongoose=require('mongoose');//sets off the mongoose
const Schema=mongoose.Schema;
const Category=require('./category')
const Product= new Schema({
    //הירושה את שאר המשתנים תוסיפו לפי הטבלת יישיות ששלחתי בקבוצה
    name:{
        type:String
    },
    price:{
        type:Number
    },
    category: {
        type: String,
        enum: ["food", "drinks","dessert"]
    },
    image:{
        type:String
    }
});

module.exports=mongoose.model('Product', Product)
