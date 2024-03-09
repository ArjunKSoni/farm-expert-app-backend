const mongoose = require("mongoose");

// recent soil form fill
const recentSoilFormModel = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
 
const Soil = mongoose.model("Soil", recentSoilFormModel );
module.exports = Soil;