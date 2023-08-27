const mongoose= require('mongoose');//call to mongoose
const Schema=mongoose.Schema;

const Branch= new Schema({
    name: {
        type: String,
        required: true,
    },

    address: {
        type: String, 
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    activityTime: {
        type: String,
        required: true
    }, 

    manager: {
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true

    },
    is_show_branch:{
        type:Boolean
    },
    lng: { // x Coordinates
        type: Number,
        required: true
    },

    lat: { // y Coordinates
        type: Number,
        required: true
    }

});
module.exports=mongoose.model('Branch',Branch)