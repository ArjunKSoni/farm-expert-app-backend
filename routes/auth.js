var express = require('express');
var router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const { hashPassword, comparePasswords } = require('../config/bcrypt');
const User = require('../modals/userModel');
const protect = require('../middleware/authmiddleware');


router.post('/signup', expressAsyncHandler(async (req, res, next) => {
  // const { name, email, password } = req.body;

  // pre-existing user
  const userExist = await User.findOne({ Email: req.body.email });
  if (userExist) {
    throw new Error("User already exists");
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
    res.send({ status: user })
  }
}));


router.post('/login', expressAsyncHandler(async (req, res, next) => {
  const { email } = req.body;
  // console.log(req.body);

  console.log(req.body.email);
  const user = await User.findOne({ email });

  if (user) {
    const passwordMatch = await comparePasswords(req.body.password, user.password);
    if (passwordMatch) {
      res.send({ token: user });
    }
    else {
      res.send("Incorrect Password")
    }
  }
  else {
    res.status(401);
    throw new Error("User Doesn't Exist");
  }
}));



router.post('/update_info', protect, expressAsyncHandler(async (req, res, next) => {
  // const { name, email, password } = req.body;

  // pre-existing user
  const existingUser = await User.findById(req.id);
  console.log(existingUser)
  if (existingUser) {
    // Update the existing user's information
    existingUser.name = req.body.name;
    existingUser.mobile = req.body.mobile;
    existingUser.address = req.body.address;
    existingUser.kisanid = req.body.kisanid;

    // if (req.body.password) {
    //   // Update the password if provided
    //   existingUser.password = await hashPassword(req.body.password);
    // }

    // Save the updated user information
    await existingUser.save();
    res.send({ status: 'User information updated successfully' });
  }
  else {

    res.status(401);
    throw new Error("User Doesn't Exist");
  }

}));

module.exports = router;
