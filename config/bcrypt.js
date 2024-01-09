const bcrypt = require('bcrypt');

const saltRounds = 7; 

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Password hashing failed');
  }
};

const comparePasswords = async (password, hashedPassword) => {
  try {
    const passwordMatch = await bcrypt.compareSync(password, hashedPassword);
    return passwordMatch;
  } catch (error) {
    console.log('Password comparison failed');
  }
};

module.exports = { hashPassword, comparePasswords };
