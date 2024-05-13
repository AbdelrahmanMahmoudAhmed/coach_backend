
const jwt = require('jsonwebtoken')
const { createAppError } = require("../utils/error");
const { HttpStatus } = require("../utils/httpCodes");
const { SUPPER_ADMIN } = require('../../constant/roles')



 const changingToken =  (req, type) => {
    const token = req.get('Authorization')?.split(" ")[1];
    try {
        const decodedToken = jwt.decode(token, process.env.SECRET_KEY);        
        if (!decodedToken) throw createAppError("Un authorized! ", HttpStatus.Unauthorized, 1);
        if (decodedToken.type != type) throw createAppError("Un authorized! ", HttpStatus.Unauthorized, 1);
        req.auth = decodedToken
        console.log("token >>> " , req.get('Authorization'))

        return decodedToken
    } catch (err) {
        throw createAppError("Un authorized! ", HttpStatus.Unauthorized, 1);
    }
}

exports.isAuth = function (type) {
    return function (req, res, next) {
        changingToken(req, type)

        next();
    }
}

exports.isSuperAdmin = function (type) {
    return function (req, res, next) {
        const result = changingToken(req, type)
        console.log("result" , result)
        if (result.role != SUPPER_ADMIN) throw createAppError("Un authorized! ", HttpStatus.Unauthorized, 1);
        next();
    }
}

exports.allowToDelete = function (type) {
    return function (req, res, next) {
        const result = changingToken(req, type)
        console.log("result" , result)
        if (!result.allowDelete) throw createAppError("Un authorized! ", HttpStatus.Unauthorized, 1);
        next();
    }
}
exports.allowToEdit = function (type) {
    return function (req, res, next) {
        const result = changingToken(req, type)
        console.log("result" , result)
        if (!result.allowEdit) throw createAppError("Un authorized! ", HttpStatus.Unauthorized, 1);
        next();
    }
}
exports.allowToManageWebsite = function (type) {
    return function (req, res, next) {
        const result = changingToken(req, type)
        console.log("result" , result)
        if (!result.websiteManagement) throw createAppError("Un authorized! ", HttpStatus.Unauthorized, 1);
        next();
    }
}





