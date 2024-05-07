const { sequelize, Person, Admin } = require("../../models");
const { Op } = require('sequelize');

const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");













// get all admins 
const getAdmins = controllerWrapper(async (req, res, next) => {
    const data = await Admin.findAll({ include: 'Person' });
    const manipulatedData = data.map((admin) => {

        const { id , ...rest} = admin.dataValues.Person.dataValues

        return { id:admin.dataValues.id, ...rest, role: admin.dataValues.role, allowEdit: admin.dataValues.allowEdit, allowDelete: admin.dataValues.allowDelete, websiteManagement: admin.dataValues.websiteManagement }
    })

    successResponse(res, manipulatedData);
});

// get single admin admin using id
const getSingleAdmin = controllerWrapper(async (req, res, next) => {
    const adminId = req.params.id;
    const data = await Admin.findOne({ where: { id :adminId } , include: 'Person' });
    const { id , ...rest} = data.dataValues.Person.dataValues

    const manipulatedData = { id: data.dataValues.id,  ...rest , role: data.dataValues.role, allowEdit: data.dataValues.allowEdit, allowDelete: data.dataValues.allowDelete, websiteManagement: data.dataValues.websiteManagement }
    if (!data) throw createAppError("this admin is not found", HttpStatus.NotFound, 1);
    successResponse(res, manipulatedData);
});

// add new Admin
const addAdmin = controllerWrapper(async (req, res, next) => {
    const { name, email, password, passwordConfirmation, phone, role } = req.body;

      await validationChecker(req, res);
    const image = req.file?.filename;
    if (!image) {
        throw createAppError("image is required", HttpStatus.BadRequest, 5);
    }

    // checking the email and phone 
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




    // Create a new person
    const person = await Person.create({
        name,
        email,
        password,
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
  const { name, email, password, passwordConfirmation, phone, role , allowEdit , allowDelete , websiteManagement } = req.body;
  const image = req.file?.filename;

  await validationChecker(req, res);


  let updatedData = {}

  const adminData = await Admin.findOne({ where: { id : adminId } });
  if(adminData){
    role && (adminData.role = role);
    allowEdit && (adminData.allowEdit = allowEdit);
    allowDelete && (adminData.allowDelete = allowDelete);
    websiteManagement && (adminData.websiteManagement = websiteManagement);
    const savedData = await adminData.save();
   updatedData = { ... savedData.dataValues}

  } else {
    throw createAppError("This Admin is not found", HttpStatus.NotFound, 1);
  }


  const personData = await Person.findOne({ where: { id : adminData.dataValues.personId } });
  if (personData) {
    name && (personData.name = name);
    email && (personData.email = email);
    password && (personData.password = password);
    phone && (personData.phone = phone);
    image && (personData.image = image);

    const savedData = await personData.save();
const {id , ...rest}  = savedData.dataValues 
updatedData = { ...updatedData , ...rest}

  } else {
    throw createAppError("This Admin is not found", HttpStatus.NotFound, 1);
  }


  successResponse(res, updatedData);

});

// delete admin
const deleteAdmin = controllerWrapper(async (req, res, next) => {
    const adminId = req.params.id;

//   const data = await Person.findOne({ where: { id } });
const theAdmin = await Admin.findOne({ where: { id : adminId } , include: 'Person' });
const { id , ...rest} = theAdmin.dataValues.Person.dataValues

const data = await Person.findOne({ where: { id }});

//   console.log("data" , data.dataValues.type)
  if (data) {
      const deletedItemData = await data.destroy();
      const manipulatedData = { id: theAdmin.dataValues.id,  ...rest , role: theAdmin.dataValues.role, allowEdit: theAdmin.dataValues.allowEdit, allowDelete: theAdmin.dataValues.allowDelete, websiteManagement: theAdmin.dataValues.websiteManagement }

    successResponse(res, manipulatedData);
  } else {
    throw createAppError("This item was not found", HttpStatus.NotFound, 100);
  }
});


module.exports = {
    addAdmin,
    getAdmins,
    getSingleAdmin,
      deleteAdmin,
      updateAdmin,
};
