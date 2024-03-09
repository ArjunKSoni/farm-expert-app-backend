const mongoose = require("mongoose");

// recent crop search
const recentCropSearchModel = mongoose.Schema({
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

const CropSearch = mongoose.model("CropSearch", recentCropSearchModel );
module.exports = CropSearch;