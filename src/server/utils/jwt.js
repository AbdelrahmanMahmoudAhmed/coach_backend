const jwt = require('jsonwebtoken');


exports.getToken = function (obj) {
   return jwt.sign(obj, process.env.SECRET_KEY, { expiresIn: "48h" })
}