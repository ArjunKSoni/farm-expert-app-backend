const mongoose = require("mongoose")

const recentModel = mongoose.Schema({
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

})
 
const Recent = mongoose.model("Recent", recentModel );
module.exports = Recent;