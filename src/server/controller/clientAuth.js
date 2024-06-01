const {  Person, Client } = require("../../models");
const { Op } = require('sequelize');

const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const { hashPassword, comparePassword } = require("../utils/password");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");


const { getToken } = require('../utils/jwt')





// login client
const login = controllerWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    // getting the client from database
    const currentClient = await Client.findOne({
        include: [{
            model: Person,
            where: { email },
        }],
    });

    if (!currentClient) throw createAppError("this client is not found", HttpStatus.NotFound, 1);
    // compare the password
    const comparedPassword = await comparePassword(currentClient.dataValues.Person.dataValues.password, password);

    if (!comparedPassword) throw createAppError("wrong password", HttpStatus.Unauthorized, 1);
    else{
    // retrieve the convenient data
    const { id, password , ...rest } = currentClient.dataValues.Person.dataValues
    const convenientData = { id: currentClient.dataValues.id, ...rest, tall: currentClient.dataValues.tall, allowEdit: currentClient.dataValues.allowEdit, weight: currentClient.dataValues.weight, goal: currentClient.dataValues.goal }
    const token = getToken(convenientData);
    successResponse(res,  convenientData , 200 ,[{ token:token}]);
    }

});



// signIn client
const signIn = controllerWrapper(async (req, res, next) => {
    const { name, email, password, passwordConfirmation, phone, goal , tall , weight } = req.body;
  
    /* ------------------------------- START ------------------------------- */
    // validate the data
    await validationChecker(req, res);
    if (password && (password !== passwordConfirmation)) throw createAppError("password confirmation must be identical the password", HttpStatus.BadRequest, 5);
    /* ------------------------------- END ------------------------------- */
  
  
  
    const hashingPass = await hashPassword(password)
    const image = req.file?.filename;
    if (!image) {
      throw createAppError("image is required", HttpStatus.BadRequest, 5);
    }
  
  
  
    /* ------------------------------- START ------------------------------- */
    // checking the email and phone in all persons
    const searchPerson = await Person.findAll({
      where: {
        [Op.or]: [
          { phone }, // Phone number to search for
          { email } // Email address to search for
        ]
      }
    })
    const checkValidCredentials = []
    searchPerson.forEach((person) => {
      if (person.email == email) checkValidCredentials.push('this email is invalid')
      if (person.phone == phone) checkValidCredentials.push('this phone is invalid')
    })
    if (checkValidCredentials.length) throw createAppError(checkValidCredentials, HttpStatus.BadRequest, 5);
    /* ------------------------------- END ------------------------------- */
  
  
  
  
    // Create a new person
    const person = await Person.create({
      name,
      email,
      password: hashingPass,
      image,
      phone,
      type: 'client',
    });
  
    // Create a new client associated with the person
    const client = await Client.create({
      personId: person.id,
      tall,
      weight,
      goal,
    });
  
    // console.log("client" , client)

    client.dataValues = { ...person.dataValues, ...client.dataValues }
    successResponse(res, client);
  
  })






module.exports = {

    login,
    signIn

};
