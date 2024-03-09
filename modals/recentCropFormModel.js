const mongoose = require("mongoose");

// recent crop form fill
const recentCropFormModel = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    crop:{
        type: String,
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

},{
    timestamps: true
});
 
const Crop = mongoose.model("Crop", recentCropFormModel );
module.exports = Crop;