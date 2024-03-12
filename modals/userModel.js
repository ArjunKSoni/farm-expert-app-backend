const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    kisanid:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileimg: {
        type: String
    },
    nitrogen:{
        type: Number, 
    },
    phosphorous:{
        type: Number, 
    },
    potassium:{
        type: Number, 
    },
    temperature:{
        type: Number, 
    },
    humidity:{
        type: Number, 
    },
    rainfall:{
        type: Number, 
    },
    ph:{
        type: Number, 
    }
}, {
    timeStamp: true
});


const User = mongoose.model("User", userModel);
module.exports = User;