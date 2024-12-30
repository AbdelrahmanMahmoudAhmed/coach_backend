const {  Admin } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const {  comparePassword } = require("../utils/password");
const controllerWrapper = require("../utils/controllerWrapper");
const validationChecker = require("../validation/checker"); 
const { wrongEmail ,wrongPassword } = require('../../constant/errors')
const { getToken } = require('../utils/jwt')






const login = controllerWrapper(async (req, res, next) => {
    
    const { email, password } = req.body;

    await  validationChecker(req, res); // validation
    // getting the admin from database
    const currentAdmin = await Admin.findOne({
        where: { email },
    });
    if (!currentAdmin) throw createAppError("this admin is not found", HttpStatus.NotFound, wrongEmail);
    // // compare the password
    const comparedPassword = await comparePassword(currentAdmin.dataValues.password, password);


    if (!comparedPassword) throw createAppError("wrong password", HttpStatus.Unauthorized, wrongPassword);
    else{
    const {  password , ...rest } = currentAdmin.dataValues
    const convenientData = { ...rest}
    const token = getToken(convenientData);
    successResponse(res,  convenientData , 200 ,[{ token:token}]) 
}

});






module.exports = {
    login,
};
