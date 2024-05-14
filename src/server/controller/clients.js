const { sequelize, Person, Client } = require("../../models");
const { Op } = require('sequelize');

const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const { hashPassword } = require("../utils/password");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");

const path = require('path')
const clearImage = require('../utils/clearImage')



// get all clients with pagination
const getClients = controllerWrapper(async (req, res, next) => {

  /* ------------------------------- START ------------------------------- */
  // pagination and search variables
  const page = (req.query.page && !isNaN(+req.query.page)) ? +req.query.page : 1;
  const perPage = 2;
  const offset = (page - 1) * perPage
  const searchTerm = req.query.search || ""
  const totalCount = await Client.count({
    include: {
      model: Person,
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerm}%` } },
          { email: { [Op.like]: `%${searchTerm}%` } },
        ],

      },
    },


  });
  /* ------------------------------- END ------------------------------- */


  const data = await Client.findAll({
    include: [{// Notice `include` takes an ARRAY
      model: Person,
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerm}%` } },
          { email: { [Op.like]: `%${searchTerm}%` } },
        ]
      }
    }], limit: perPage, offset, where: {
    }
  });

  const manipulatedData = data.map((client) => {
    const { id, password, ...rest } = client.dataValues.Person.dataValues
    return { id: client.dataValues.id, ...rest, role: client.dataValues.role, tall: client.dataValues.tall, weight: client.dataValues.weight, goal: client.dataValues.goal }
  })

  successResponse(res, manipulatedData, 200, [{ pagination: { currentPage: page, perPage, totalCount } }]);
});







// get single client client using id
const getSingleClient = controllerWrapper(async (req, res, next) => {
  const clientId = req.params.id;
  const data = await Client.findOne({ where: { id: clientId }, include: 'Person' });
  if (!data) throw createAppError("This client is not found", HttpStatus.NotFound, 1);

  const { id, password, ...rest } = data.dataValues.Person.dataValues

  const manipulatedData = { id: data.dataValues.id, ...rest, role: data.dataValues.role, allowEdit: data.dataValues.allowEdit, allowDelete: data.dataValues.allowDelete, websiteManagement: data.dataValues.websiteManagement }
  successResponse(res, manipulatedData);
});







// add new client
const addClient = controllerWrapper(async (req, res, next) => {
  const { name, email, password, passwordConfirmation, phone, goal, tall, weight } = req.body;

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

  client.dataValues = { ...person.dataValues, ...client.dataValues }
  successResponse(res, client);

});




// update client
const updateClient = controllerWrapper(async (req, res, next) => {
  const clientId = req.params.id;
  const { name, email, password, passwordConfirmation, phone, goal, tall, weight } = req.body;
  const image = req.file?.filename;


  /* ------------------------------- START ------------------------------- */
  // validate the data
  await validationChecker(req, res);
  if (password && (password !== passwordConfirmation)) throw createAppError("password confirmation must be identical the password", HttpStatus.BadRequest, 5);
  /* ------------------------------- END ------------------------------- */


  const clientData = await Client.findOne({ where: { id: clientId } });
  if (!clientData) throw createAppError("This client is not found", HttpStatus.NotFound, 1);
  const personData = await Person.findOne({ where: { id: clientData.dataValues.personId } });
  if (!personData) throw createAppError("This client is not found", HttpStatus.NotFound, 1);



  if (image) { // to delete the old image to replace it with the new one

    const filePath = path.join(__dirname, "..", "..", "..", "uploads", "client", personData.dataValues.image)
    clearImage(filePath)
  }


  /* ------------------------------- START ------------------------------- */
  // checking the email and phone in all persons except the requested client
  const checkingArr = []
  phone && checkingArr.push({ phone })
  email && checkingArr.push({ email })
  const searchPerson = await Person.findAll({
    where: {
      [Op.and]: [
        { [Op.or]: checkingArr },
        { id: { [Op.not]: clientData.dataValues.personId } }
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




  let updatedData = {} // to collect updated data on the two tables ( Person + client )


  /* ------------------------------- START ------------------------------- */
  // changing data on the Client table
  tall && (clientData.tall = tall);
  weight && (clientData.weight = weight);
  goal && (clientData.goal = goal);
  const savedclientData = await clientData.save();
  updatedData = { ...savedclientData.dataValues }
  /* ------------------------------- END ------------------------------- */



  /* ------------------------------- START ------------------------------- */
  // changing data on the person table
  const hashingPass = password ? await hashPassword(password) : null;

  name && (personData.name = name);
  email && (personData.email = email);
  password && (personData.password = hashingPass);
  phone && (personData.phone = phone);
  image && (personData.image = image);

  const savedPersonData = await personData.save();
  if (savedPersonData) {
    const { id, password, ...rest } = savedPersonData.dataValues
    updatedData = { ...updatedData, ...rest }
  }

  /* ------------------------------- END ------------------------------- */



  successResponse(res, updatedData);

});



// update me
const updateMe = controllerWrapper(async (req, res, next) => {

  const clientId = req.auth.id;
  const { name, email, password, passwordConfirmation, phone, tall, weight, goal } = req.body;
  const image = req.file?.filename;
  /* ------------------------------- START ------------------------------- */
  // validate the data
  await validationChecker(req, res);
  if (password && (password !== passwordConfirmation)) throw createAppError("password confirmation must be identical the password", HttpStatus.BadRequest, 5);
  /* ------------------------------- END ------------------------------- */

  const clientData = await Client.findOne({ where: { id: clientId } });
  if (!clientData) throw createAppError("This client is not found", HttpStatus.NotFound, 1);
  const personData = await Person.findOne({ where: { id: clientData.dataValues.personId } });
  if (!personData) throw createAppError("This client is not found", HttpStatus.NotFound, 1);


  /* ------------------------------- START ------------------------------- */
  // checking the email and phone in all persons except the requested client
  const checkingArr = []
  phone && checkingArr.push({ phone })
  email && checkingArr.push({ email })
  const searchPerson = await Person.findAll({
    where: {
      [Op.and]: [
        { [Op.or]: checkingArr },
        { id: { [Op.not]: clientData.dataValues.personId } }
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




  let updatedData = {} // to collect updated data on the two tables ( Person + client )



  /* ------------------------------- START ------------------------------- */
  // changing data on the Client table
  tall && (clientData.tall = tall);
  weight && (clientData.weight = weight);
  goal && (clientData.goal = goal);
  const savedclientData = await clientData.save();
  updatedData = { ...savedclientData.dataValues }
  /* ------------------------------- END ------------------------------- */

  /* ------------------------------- START ------------------------------- */
  // changing data on the person table 
  const hashingPass = password ? await hashPassword(password) : null;

  name && (personData.name = name);
  email && (personData.email = email);
  password && (personData.password = hashingPass);
  phone && (personData.phone = phone);
  image && (personData.image = image);

  const savedPersonData = await personData.save();
  if (savedPersonData) {
    const { id, password, ...rest } = savedPersonData.dataValues
    updatedData = { ...updatedData, ...rest }
  }

  /* ------------------------------- END ------------------------------- */



  successResponse(res, updatedData);

});



// get single client client using id
const getMe = controllerWrapper(async (req, res, next) => {
  const clientId = req.auth.id;
  const data = await Client.findOne({ where: { id: clientId }, include: 'Person' });
  if (!data) throw createAppError("This client is not found", HttpStatus.NotFound, 1);

  const { id, password, ...rest } = data.dataValues.Person.dataValues

  const manipulatedData = { id: data.dataValues.id, ...rest, role: data.dataValues.role, allowEdit: data.dataValues.allowEdit, allowDelete: data.dataValues.allowDelete, websiteManagement: data.dataValues.websiteManagement }
  successResponse(res, manipulatedData);
});







// delete client
const deleteClient = controllerWrapper(async (req, res, next) => {
  const clientId = req.params.id;

  const theClient = await Client.findOne({ where: { id: clientId }, include: 'Person' });

  if (!theClient) throw createAppError("This client was not found", HttpStatus.BadRequest, 100);
  const { id, password, ...rest } = theClient.dataValues.Person.dataValues
  const data = await Person.findOne({ where: { id } });

  if (!data) throw createAppError("This client was not found", HttpStatus.NotFound, 100);

  // delete client from the person table and it will be deleted from client table ( CASCADE )
  await data.destroy();

  // retrieve the convenient data
  const manipulatedData = { id: theClient.dataValues.id, ...rest, role: theClient.dataValues.role, allowEdit: theClient.dataValues.allowEdit, allowDelete: theClient.dataValues.allowDelete, websiteManagement: theClient.dataValues.websiteManagement }

  successResponse(res, manipulatedData);

});


module.exports = {
  addClient,
  getClients,
  getSingleClient,
  deleteClient,
  updateClient,
  updateMe,
  getMe
};
