const bcrypt = require('bcrypt');

 async function hashPassword(password){
  const hashed = bcrypt.hash(password, 12);
  return hashed;
}
 async function comparePassword(hashedPassword, password) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {hashPassword , comparePassword}
