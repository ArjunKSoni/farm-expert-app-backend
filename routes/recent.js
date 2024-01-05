var express = require('express');
var router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const User = require('../modals/userModel');
const Recent =require('../modals/recentModel');

router.get('/recent_crop', expressAsyncHandler(async (req, res, next)=>{
    
}))

module.exports = router;
