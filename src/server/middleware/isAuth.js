
const jwt = require('jsonwebtoken')
const { createAppError } = require("../utils/error");
const { HttpStatus } = require("../utils/httpCodes");
const { SUPPER_ADMIN } = require('../../constant/roles')
const { notAuth , notRole, notSuperAdmin , notAllowToDelete , notAllowToEdit ,notAllowToManageWebsite} = require('../../constant/errors')



 const changingToken =  (req, type) => {
    const token = req.get('Authorization')?.split(" ")[1];
    try {
        const decodedToken = jwt.decode(token, process.env.SECRET_PASSWORD_KEY);        
        if (!decodedToken) throw createAppError("Un authorized! ", HttpStatus.Unauthorized, notAuth);
        if ((decodedToken.type != type) && type != 'both') throw createAppError("Un authorized! ", HttpStatus.Unauthorized, notRole);
        req.auth = decodedToken
        console.log("token >>> " , req.get('Authorization'))

        return decodedToken
    } catch (err) {
        throw createAppError("Un authorized! ", HttpStatus.Unauthorized, notAuth);
    }
}

exports.getCurrentUser = function () {
    return function (req, res, next) {
         changingToken(req, 'both')
        next();
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
    
        if (result.role != SUPPER_ADMIN) throw createAppError("Not Super Admin", HttpStatus.Unauthorized, notSuperAdmin);
        next();
    }
}

exports.allowToDelete = function (type) {
    return function (req, res, next) {
        const result = changingToken(req, type)
       
        if (!result.allowDelete) throw createAppError("Not Allowed To Delete ", HttpStatus.Unauthorized, notAllowToDelete);
        next();
    }
}
exports.allowToEdit = function (type) {
    return function (req, res, next) {
        const result = changingToken(req, type)
      
        if (!result.allowEdit) throw createAppError("Not Allowed To Edit", HttpStatus.Unauthorized, notAllowToEdit);
        next();
    }
}
exports.allowToManageWebsite = function (type) {
    return function (req, res, next) {
        const result = changingToken(req, type)
  
        if (!result.websiteManagement) throw createAppError("Not Allowed To Manage Website", HttpStatus.Unauthorized, notAllowToManageWebsite);
        next();
    }
}





