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

    }

});
module.exports=mongoose.model('Branch',Branch)