var express = require('express');
var router = express.Router();
const generateToken = require('../config/generateToken');
const { hashPassword, comparePasswords } = require('../config/bcrypt');
const User = require('../modals/userModel');
const protect = require('../middleware/authMiddleware');


router.post('/signup', async (req, res, next) => {
  // const { name, email, password } = req.body;

  // pre-existing user
  const userExist = await User.findOne({ Email: req.body.email });
  if (userExist) {
    return res.send("User already exists");
  }
  else {
    var Pass = await hashPassword(req.body.password);
    const NewUser = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: Pass,
      address: req.body.address,
      kisanid: req.body.kisanid,
    })
    await NewUser.save();

    const token = generateToken(NewUser._id);
    NewUser.token = token;
    await NewUser.save();
    console.log("token", token);

    const user = await User.findById(NewUser._id);
    // console.log("1", user);
    return res.send({ user: user,token })
  }

});


router.post('/login', async (req, res, next) => {
  const { email } = req.body;
  // console.log(req.body);

  console.log(req.body.email);
  const user = await User.findOne({ email });

  if (user) {
    const passwordMatch = await comparePasswords(req.body.password, user.password);
    if (passwordMatch) {
      res.send({ user: user,token });
    }
    else {
      res.send("Incorrect Password")
    }
  }
  else {
    res.send("User Doesn't Exist");
  }
});



router.post('/update_info', protect, async (req, res, next) => {
  const existingUser = await User.findById(req.id);
  console.log(existingUser)
  if (existingUser) {
    existingUser.name = req.body.name;
    existingUser.mobile = req.body.mobile;
    existingUser.address = req.body.address;
    existingUser.kisanid = req.body.kisanid;
    
    await existingUser.save();
    res.send({ status: 'User information updated successfully' });
  }
  else {

    res.send("User Doesn't Exist");
  }

});

module.exports = router;
