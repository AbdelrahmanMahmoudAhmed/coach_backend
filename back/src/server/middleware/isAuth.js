
const jwt = require('jsonwebtoken')
const { createAppError } = require("../utils/error");
const { HttpStatus } = require("../utils/httpCodes");

const { notAuth } = require('../../constant/errors')



 const changingToken =  (req) => {
    const token = req.get('Authorization')?.split(" ")[1];

    try {
        const decodedToken = jwt.decode(token, process.env.SECRET_PASSWORD_KEY);        
        if (!decodedToken) throw createAppError("Un authorized! ", HttpStatus.Unauthorized, notAuth);
        req.auth = decodedToken
        console.log("token >>> " , req.get('Authorization'))

        return decodedToken
    } catch (err) {
        throw createAppError("Un authorized! ", HttpStatus.Unauthorized, notAuth);
    }
}



exports.isAuth = function () {
    return function (req, res, next) {
        changingToken(req)
        next();
    }
}









