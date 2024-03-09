var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const generateToken = require('../config/generateToken');
const User = require('../modals/userModel');
const Recent = require('../modals/recentCropFormModel');
const protect = require('../middleware/authMiddleware');

router.get('/:token', async (req, res) => {
    const token = req.params.token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            res.send("User not found");
        }
        
        else {
            user.password="*****"
            res.status(200).send({ data: user })
        }
        
    } catch (error) {
        console.log("Internal server error", error)
    }
})

module.exports = router;
