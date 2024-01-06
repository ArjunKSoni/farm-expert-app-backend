var express = require('express');
var router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const User = require('../modals/userModel');
const Recent = require('../modals/recentModel');
const protect = require('../middleware/authmiddleware');

router.get('/:token', protect, expressAsyncHandler(async (req, res, next) => {
    const token = req.params.token
    try {
        const user = await User.findById(req.id);
        if (!user) {
            throw new Error("User not found");
        }
        else res.status(200).send({ data: user, token })
    } catch (error) {
        throw new Error("Internal server error", error)
    }
}))

module.exports = router;
