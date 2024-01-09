const mongoose = require("mongoose");

const imageUploadModel = mongoose.Schema({
    imageUrl:{
        type: String
    }
},{
    timestamps: true
});

const Image = mongoose.model("Image", imageUploadModel );
module.exports = Image;