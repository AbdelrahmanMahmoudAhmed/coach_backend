const { sequelize, Person, Admin } = require("../../models");
const { Op } = require('sequelize');

const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const { hashPassword, comparePassword } = require("../utils/password");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");


const { getToken } = require('../utils/jwt')






// get single admin admin using id
const login = controllerWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const hashingPassword = await hashPassword(password)
    // getting the admin from database
    const currentAdmin = await Admin.findOne({
        include: [{
            model: Person,
            where: { email }
        }],
    });
    if (!currentAdmin) throw createAppError("this admin is not found", HttpStatus.NotFound, 1);

    // compare the password
    const comparedPassword = await comparePassword(currentAdmin.dataValues.Person.dataValues.password, password);

    if (!comparedPassword) throw createAppError("wrong password", HttpStatus.Unauthorized, 1);

    // retrieve the convenient data
    const { id, ...rest } = currentAdmin.dataValues.Person.dataValues
    const convenientData = { id: currentAdmin.dataValues.id, ...rest, role: currentAdmin.dataValues.role, allowEdit: currentAdmin.dataValues.allowEdit, allowDelete: currentAdmin.dataValues.allowDelete, websiteManagement: currentAdmin.dataValues.websiteManagement }
    const token = getToken(convenientData);

    successResponse(res,  convenientData , 200 ,[{ token:token}]);
});






module.exports = {

    login,

};