const jwt = require("jsonwebtoken");

const generateToken= (id)=>{
    // jwt.sing takes 3 parameterrs: kiska token chhaiye, secret key, expiry date
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"});
};

module.exports = generateToken;
