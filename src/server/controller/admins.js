const { sequelize, Person, Admin } = require("../../models");
const { Op } = require('sequelize');

const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const { hashPassword } = require("../utils/password");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");




// get all admins with pagination
const getAdmins = controllerWrapper(async (req, res, next) => {

  /* ------------------------------- START ------------------------------- */
  // pagination and search variables
  const page = (req.query.page && !isNaN(+req.query.page)) ? +req.query.page : 1;
  const perPage = 2;
  const offset = (page - 1) * perPage
  const searchTerm = req.query.search || ""
  const totalCount = await Admin.count({
    include: {
      model: Person,
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerm}%` } },
          { email: { [Op.like]: `%${searchTerm}%` } },
        ]
      }
    }
  });
  /* ------------------------------- END ------------------------------- */


  const data = await Admin.findAll({
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

  const manipulatedData = data.map((admin) => {
    const { id, ...rest } = admin.dataValues.Person.dataValues
    return { id: admin.dataValues.id, ...rest, role: admin.dataValues.role, allowEdit: admin.dataValues.allowEdit, allowDelete: admin.dataValues.allowDelete, websiteManagement: admin.dataValues.websiteManagement }
  })

  successResponse(res, manipulatedData, 200, [{pagination :{ currentPage: page, perPage, totalCount} } ]);
});







// get single admin admin using id
const getSingleAdmin = controllerWrapper(async (req, res, next) => {
  const adminId = req.params.id;
  const data = await Admin.findOne({ where: { id: adminId }, include: 'Person' });
  if(!data)  throw createAppError("This Admin is not found", HttpStatus.NotFound, 1);

  const { id, ...rest } = data.dataValues.Person.dataValues

  const manipulatedData = { id: data.dataValues.id, ...rest, role: data.dataValues.role, allowEdit: data.dataValues.allowEdit, allowDelete: data.dataValues.allowDelete, websiteManagement: data.dataValues.websiteManagement }
  if (!data) throw createAppError("this admin is not found", HttpStatus.NotFound, 1);
  successResponse(res, manipulatedData);
});







// add new Admin
const addAdmin = controllerWrapper(async (req, res, next) => {
  if( req.auth.role != "superAdmin") throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);
  const { name, email, password, passwordConfirmation, phone, role } = req.body;

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
    type: 'admin',
  });

  // Create a new admin associated with the person
  const admin = await Admin.create({
    personId: person.id,
    role
  });

  admin.dataValues = { ...person.dataValues, ...admin.dataValues }
  successResponse(res, admin);

});




// update Admin
const updateAdmin = controllerWrapper(async (req, res, next) => {
  const adminId = req.params.id;
  if( req.auth.role != "superAdmin") throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);
  const { name, email, password, passwordConfirmation, phone, role, allowEdit, allowDelete, websiteManagement } = req.body;
  const image = req.file?.filename;


  /* ------------------------------- START ------------------------------- */
  // validate the data
  await validationChecker(req, res);
  if (password && (password !== passwordConfirmation)) throw createAppError("password confirmation must be identical the password", HttpStatus.BadRequest, 5);
  /* ------------------------------- END ------------------------------- */


  const adminData = await Admin.findOne({ where: { id: adminId } });
  const personData = await Person.findOne({ where: { id: adminData.dataValues.personId } });
  if (!adminData || !personData) throw createAppError("This Admin is not found", HttpStatus.NotFound, 1);


  /* ------------------------------- START ------------------------------- */
  // checking the email and phone in all persons except the requested admin
  const checkingArr = []
  phone && checkingArr.push({ phone })
  email && checkingArr.push({ email })
  const searchPerson = await Person.findAll({
    where: {
      [Op.and]: [
        { [Op.or]: checkingArr },
        { id: { [Op.not]: adminData.dataValues.personId } }
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




  let updatedData = {} // to collect updated data on the two tables ( Person + Admin )


  /* ------------------------------- START ------------------------------- */
  // changing data on the Admin table
  role && (adminData.role = role);
  allowEdit && (adminData.allowEdit = allowEdit);
  allowDelete && (adminData.allowDelete = allowDelete);
  websiteManagement && (adminData.websiteManagement = websiteManagement);
  const savedAdminData = await adminData.save();
  updatedData = { ...savedAdminData.dataValues }
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
  const { id, ...rest } = savedPersonData.dataValues
  updatedData = { ...updatedData, ...rest }
  /* ------------------------------- END ------------------------------- */



  successResponse(res, updatedData);

});



// update me
const updateMe = controllerWrapper(async (req, res, next) => {
  console.log("hhhhhhhhhhhhhhhhhhi")

  const adminId = req.auth.id;
  const { name, email, password, passwordConfirmation, phone} = req.body;
  const image = req.file?.filename;
  /* ------------------------------- START ------------------------------- */
  // validate the data
  await validationChecker(req, res);
  if (password && (password !== passwordConfirmation)) throw createAppError("password confirmation must be identical the password", HttpStatus.BadRequest, 5);
  /* ------------------------------- END ------------------------------- */
console.log("hhhhhhhhhhhhhhhhhhi")

  const adminData = await Admin.findOne({ where: { id: adminId } });
  const personData = await Person.findOne({ where: { id: adminData.dataValues.personId } });
  if (!adminData || !personData) throw createAppError("This Admin is not found", HttpStatus.NotFound, 1);


  /* ------------------------------- START ------------------------------- */
  // checking the email and phone in all persons except the requested admin
  const checkingArr = []
  phone && checkingArr.push({ phone })
  email && checkingArr.push({ email })
  const searchPerson = await Person.findAll({
    where: {
      [Op.and]: [
        { [Op.or]: checkingArr },
        { id: { [Op.not]: adminData.dataValues.personId } }
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




  let updatedData = {} // to collect updated data on the two tables ( Person + Admin )

  /* ------------------------------- START ------------------------------- */
  // changing data on the person table only
  const hashingPass = password ? await hashPassword(password) : null;

  name && (personData.name = name);
  email && (personData.email = email);
  password && (personData.password = hashingPass);
  phone && (personData.phone = phone);
  image && (personData.image = image);

  const savedPersonData = await personData.save();
  const { id, ...rest } = savedPersonData.dataValues
  updatedData = { ...rest }
  /* ------------------------------- END ------------------------------- */



  successResponse(res, updatedData);

});








// delete admin
const deleteAdmin = controllerWrapper(async (req, res, next) => {
  if( req.auth.role != "superAdmin") throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);
  const adminId = req.params.id;

  const theAdmin = await Admin.findOne({ where: { id: adminId }, include: 'Person' });
  const { id, ...rest } = theAdmin.dataValues.Person.dataValues
  const data = await Person.findOne({ where: { id } });

  if (!data) throw createAppError("This item was not found", HttpStatus.NotFound, 100);

// delete admin from the person table and it will be deleted from admin table ( CASCADE )
  await data.destroy();

  // retrieve the convenient data
  const manipulatedData = { id: theAdmin.dataValues.id, ...rest, role: theAdmin.dataValues.role, allowEdit: theAdmin.dataValues.allowEdit, allowDelete: theAdmin.dataValues.allowDelete, websiteManagement: theAdmin.dataValues.websiteManagement }

  successResponse(res, manipulatedData);

});


module.exports = {
  addAdmin,
  getAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
  updateMe
};
