const mongoose = require('mongoose');

const URI = "mongodb+srv://Shivangi-01:N4GJkuqYSGeBm2FE@cluster0.6nyw4g9.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(URI)

const connectDb = async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("connection to db succefull");
    } catch (error) {
        console.log("Database connection failed", error.message);
        process.exit(0);
    }
};

module.exports = connectDb;