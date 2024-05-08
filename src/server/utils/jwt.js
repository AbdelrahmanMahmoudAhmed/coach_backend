const jwt = require('jsonwebtoken');


exports.getToken = function (obj) {
    console.log(" process.env.SECRET_KEY", process.env.SECRET_KEY)
   return jwt.sign(obj, process.env.SECRET_KEY, { expiresIn: "48h" })
}