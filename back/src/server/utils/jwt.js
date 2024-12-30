const jwt = require('jsonwebtoken');


exports.getToken = function (obj) {
   return jwt.sign(obj, process.env.SECRET_PASSWORD_KEY, { expiresIn: "48h" })
}


exports.getForgetToken = function (obj) {
   return jwt.sign(obj, process.env.SECRET_FORGET_PASSWORD_KEY, { expiresIn: "15m" })
}