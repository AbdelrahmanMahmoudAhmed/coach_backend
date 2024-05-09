
const jwt = require('jsonwebtoken')
const { createAppError } = require("../utils/error");
const { HttpStatus } = require("../utils/httpCodes");
const { SUPPER_ADMIN } = require('../../constant/roles')



 const changingToken =  (req, type) => {
    const token = req.get('Authorization').split(" ")[1];
    try {
        
        const decodedToken = jwt.decode(token, process.env.SECRET_KEY);        
        if (!decodedToken) throw createAppError("Un authorized! ", HttpStatus.Unauthorized, 1);
        console.log("decodedToken", decodedToken.type, "role", type)
        if (decodedToken.type != type) throw createAppError("Un authorized! ", HttpStatus.Unauthorized, 1);
        req.auth = decodedToken
console.log("YES")
        return decodedToken
    } catch (err) {
        throw createAppError("Un authorized! ", HttpStatus.Unauthorized, 1);
    }
}

exports.isAuth = function (type) {
    return function (req, res, next) {
        changingToken(req, type)
        console.log("YES 2")

        next();
    }
}

exports.isSuperAdmin = function (type) {
    return function (req, res, next) {
        const result = changingToken(req, type)

        if (result.role != SUPPER_ADMIN) throw createAppError("Un authorized! ", HttpStatus.Unauthorized, 1);

        next();
    }
}





