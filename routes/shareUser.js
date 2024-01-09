var express = require('express');
var router = express.Router();
const generateToken = require('../config/generateToken');
const User = require('../modals/userModel');
const Recent = require('../modals/recentModel');
const protect = require('../middleware/authMiddleware');

router.get('/:token', protect, async (req, res, next) => {
    const token = req.params.token
    try {
        const user = await User.findById(req.id);
        if (!user) {
            res.send("User not found");
        }
        else res.status(200).send({ data: user, token })
    } catch (error) {
        console.log("Internal server error", error)
    }
})

module.exports = router;
