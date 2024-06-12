const { Person, Client, Admin } = require("../../models");
const { Op } = require("sequelize");

const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const { hashPassword, comparePassword } = require("../utils/password");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");

const { getToken } = require("../utils/jwt");

// changePassword client
const changePassword = controllerWrapper(async (req, res, next) => {
  const { oldPassword, newPassword, passwordConfirmation } = req.body;
  const {id , type} = req.auth;
    // validate the data
    await validationChecker(req, res);
console.log("id" , id)
  console.log(' req.auth' ,  req.auth)


  // check if the user in the database

  let currentUser;
  if (type == "client" || type == "admin" )  currentUser = await Person.findOne({ where: { id },});
  else throw createAppError("invalid type", HttpStatus.BadRequest, 1);  

  if (!currentUser)
    throw createAppError("this user is not found", HttpStatus.NotFound, 1);
  // compare the password
  const comparedPassword = await comparePassword(
    currentUser.dataValues.password,
    oldPassword
  );
  if (!comparedPassword)  throw createAppError("wrong password", HttpStatus.BadRequest, 1);

// hashing the new password and add it as a new password on the db
  const hashingPass = await hashPassword(newPassword);
  currentUser.password = hashingPass;
  const savedData = await currentUser.save();

  successResponse(res, savedData);


});

// signIn client
const signIn = controllerWrapper(async (req, res, next) => {
  const {
    name,
    email,
    password,
    passwordConfirmation,
    phone,
    goal,
    tall,
    weight,
  } = req.body;

  /* ------------------------------- START ------------------------------- */
  // validate the data
  await validationChecker(req, res);
  if (password && password !== passwordConfirmation)
    throw createAppError(
      "password confirmation must be identical the password",
      HttpStatus.BadRequest,
      5
    );
  /* ------------------------------- END ------------------------------- */

  const hashingPass = await hashPassword(password);
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
        { email }, // Email address to search for
      ],
    },
  });
  const checkValidCredentials = [];
  searchPerson.forEach((person) => {
    if (person.email == email)
      checkValidCredentials.push("this email is invalid");
    if (person.phone == phone)
      checkValidCredentials.push("this phone is invalid");
  });
  if (checkValidCredentials.length)
    throw createAppError(checkValidCredentials, HttpStatus.BadRequest, 5);
  /* ------------------------------- END ------------------------------- */

  // Create a new person
  const person = await Person.create({
    name,
    email,
    password: hashingPass,
    image,
    phone,
    type: "client",
  });

  // Create a new client associated with the person
  const client = await Client.create({
    personId: person.id,
    tall,
    weight,
    goal,
  });

  // console.log("client" , client)

  client.dataValues = { ...person.dataValues, ...client.dataValues };
  successResponse(res, client);
});

module.exports = {
  changePassword,
  signIn,
};
