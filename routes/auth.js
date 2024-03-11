var express = require('express');
var router = express.Router();
const generateToken = require('../config/generateToken');
const { hashPassword, comparePasswords } = require('../config/bcrypt');
const User = require('../modals/userModel');
const protect = require('../middleware/authMiddleware');


router.post('/signup', async (req, res, next) => {
  // const { name, email, password } = req.body;

  // pre-existing user
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.send("User already exists");
    } else {
      var Pass = await hashPassword(req.body.password);
      const NewUser = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: Pass,
        address: req.body.address,
        kisanid: req.body.kisanid,
        profileimg: req.body.profileimg
      });
      await NewUser.save();

      const token = generateToken(NewUser._id);
      NewUser.token = token;
      await NewUser.save();
      // console.log("token", token);

      const user = await User.findById(NewUser._id);
      return res.send({ user: user, token });
    }
  } catch (error) {
    res.status(500).send("Error in signup", error.message);
  }
});


router.post('/login', async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const passwordMatch = await comparePasswords(req.body.password, user.password);
      if (passwordMatch) {
        const token = generateToken(user._id);
        res.send({ user: user, token });
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User Doesn't Exist");
    }
  } catch (error) {
    res.status(500).send("Error in login",error.message);
  }

});



router.post('/update_info', protect, async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.id);
    if (existingUser) {
      existingUser.name = req.body.name;
      existingUser.mobile = req.body.mobile;
      existingUser.address = req.body.address;
      existingUser.kisanid = req.body.kisanid;
      existingUser.profileimg = req.body.profileimg;

      await existingUser.save();
      res.send('User information updated successfully');
    } else {
      res.send("User Doesn't Exist");
    }
  } catch (error) {
    res.status(500).send("Error in updating info",error.message);
  }

});

module.exports = router;
