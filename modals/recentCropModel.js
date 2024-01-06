const mongoose = require("mongoose");

const recentCropModel = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    crop:{
        type: String,
    }
},{
    timestamps: true
});

const Crop = mongoose.model("Crop", recentCropModel );
module.exports = Crop;