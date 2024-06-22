const { Person, Client, Admin, Token } = require("../../models");
const { Op } = require("sequelize");

const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const { hashPassword, comparePassword } = require("../utils/password");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const { worngEmail ,worngPassword , wrongType , invalidSendMail , notSubscribed , expiredToken , wrongToken} = require('../../constant/errors')

const { getForgetToken } = require("../utils/jwt");
const sendEmail = require('../utils/email')
const jwt = require('jsonwebtoken');


// changePassword 
const changePassword = controllerWrapper(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id, type, email } = req.auth;
  // validate the data
  await validationChecker(req, res);


  // check if the user in the database

  let currentUser;
  if (type == "client" || type == "admin") currentUser = await Person.findOne({  include: [{
    model: type == "client" ? Client : Admin,
    where: { id },
}], });

  else throw createAppError("invalid type", HttpStatus.BadRequest, wrongType);

  if (!currentUser)
    throw createAppError("this user is not found", HttpStatus.NotFound, worngEmail);

  // compare the password
  const comparedPassword = await comparePassword(
    currentUser.dataValues.password   ,
    oldPassword
  );
  if (!comparedPassword) throw createAppError("wrong password", HttpStatus.BadRequest, worngPassword);

  // hashing the new password and add it as a new password on the db
  const hashingPass = await hashPassword(newPassword);
  currentUser.password = hashingPass;
  const savedData = await currentUser.save();

  successResponse(res, savedData);


});


// forgetPassword 
const forgetPassword = controllerWrapper(async (req, res, next) => {
  const { email } = req.body;
  await validationChecker(req, res);

  // const { id, name, email: userEmail, type } = req.auth;
  // const userInfo = {
  //   id, name, email: userEmail
  // }
  // validate the data


  // check if the user in the database

  let currentUser  = await Person.findOne({ where: { email }, });
  console.log("currentUser" , currentUser)
  if (!currentUser)
    throw createAppError("this user is not found", HttpStatus.NotFound, notSubscribed);
  const { id, name, email: userEmail, type } = currentUser.dataValues;

  const user = {
    id,
    email:userEmail,
    name

  }

  // // hashing the new password and add it as a new password on the db
  const token = getForgetToken(user);
  const url = `${process.env.CLIENT_BASE_URL}/reset-password?token=${token}`



  const checkIfHasToken = await Token.findOne({ where: { personId: id } })
  if (!checkIfHasToken) {
    try {
      await Token.create({ personId: id, token, })
      await sendEmail({
        email,
        subject: "Reset your password",
        html: `<h1> <b>Hello ${name}</b> </h1>
              <p> click on the link below to reset your password</p>
              <a href="${url}"> click here </a>
        `,
      })
      successResponse(res, 'check your email to reset your password');
      
    } catch (err) {
      throw createAppError(err, HttpStatus.InternalServerError, 500);
    }

  }
  else {
    const givenDate = new Date(checkIfHasToken.dataValues.updatedAt);
    const currentDate = new Date();
    const timeDifferenceInMinutes = (currentDate - givenDate) / (1000 * 60);
    if (timeDifferenceInMinutes > 15) {

      checkIfHasToken.token = token
      await sendEmail({
        email,
        subject: "Reset your password",
        html: `<h1> <b>Hello ${name}</b> </h1>
              <p> click on the link below to reset your password</p>
              <a href="${url}"> click here </a>  
        `,
      })
      await checkIfHasToken.save()
      successResponse(res, 'check your email to reset your password');
    } else {
      throw createAppError('your token already has been sent, check your email', HttpStatus.BadRequest, invalidSendMail);
    }
  }
});


// resetPassword 
const resetPassword = controllerWrapper(async (req, res, next) => {
  const { token, newPassword } = req.body;
  await validationChecker(req, res);

   // get the person and change the password , then delete the old token 
   const decodedToken = jwt.decode(token, process.env.SECRET_PASSWORD_KEY)


  const currentToken = await Token.findOne({
    where: {
      personId: decodedToken.id,
    },

  });

  if(!currentToken ) throw createAppError("wrong token", HttpStatus.BadRequest, wrongToken);

  const savedToken = currentToken?.dataValues?.token


  console.log("savedToken" , savedToken)
  console.log("token" , token)
  // check if the sent token is equal the saved token , and check it is not expired
  if (token != savedToken) throw createAppError("wrong token", HttpStatus.BadRequest, wrongToken);
  const givenDate = new Date(currentToken.dataValues.updatedAt);
  const currentDate = new Date();
  const timeDifferenceInMinutes = (currentDate - givenDate) / (1000 * 60);
  if (timeDifferenceInMinutes > 15) {
    throw createAppError('the token is expired , check your email', HttpStatus.BadRequest, expiredToken);
  }



 

  const currentPerson = await Person.findOne({ where: { email: decodedToken.email } });
  const hashingPass = await hashPassword(newPassword);
  currentPerson.password = hashingPass;
 await currentPerson.save();


  // delete the old token 
  await currentToken.destroy()

  successResponse(res, "the password has been changed");

});

module.exports = {
  changePassword,
  forgetPassword,
  resetPassword
};
