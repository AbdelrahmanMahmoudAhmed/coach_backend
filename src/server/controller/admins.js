const { Person, Admin } = require("../../models");
const { Op } = require("sequelize");

const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const { hashPassword } = require("../utils/password");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");

const path = require("path");
const clearImage = require("../utils/clearImage");
const {
  notAllowedEmail,
  wrongPassword,
  notAuth,
  notAllowedPhone,
  notAllowChangeRole,
  notFoundPerson,
  requiredImg,
  notMatchedPassword
} = require("../../constant/errors");

const getFilePath = ( img ) => {
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "uploads",
    "admin",
    img
  );
  return filePath
}

// get all admins with pagination
const getAdmins = controllerWrapper(async (req, res, next) => {
  /* ------------------------------- START ------------------------------- */
  // pagination and search variables
  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const searchTerm = req.query.search || "";
  const totalCount = await Admin.count({
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

  const data = await Admin.findAll({
    include: [
      {
        // Notice `include` takes an ARRAY
        model: Person,
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${searchTerm}%` } },
            { email: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
      },
    ],
    limit: perPage,
    offset,
    where: {},
  });

  const manipulatedData = data.map((admin) => {
    let { id, password, image, ...rest } = admin.dataValues.Person.dataValues;
    image = image ? `/u/admin/${image}` : null;
    return {
      id: admin.dataValues.id,
      image,
      ...rest,
      role: admin.dataValues.role,
      allowEdit: admin.dataValues.allowEdit,
      allowDelete: admin.dataValues.allowDelete,
      websiteManagement: admin.dataValues.websiteManagement,
    };
  });

  successResponse(res, manipulatedData, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});

// get single admin admin using id
const getSingleAdmin = controllerWrapper(async (req, res, next) => {
  const adminId = req.params.id;
  const data = await Admin.findOne({
    where: { id: adminId },
    include: "Person",
  });
  if (!data)
    throw createAppError(
      "This Admin is not found",
      HttpStatus.NotFound,
      notFoundPerson
    );

  let { id, password, image, ...rest } = data.dataValues.Person.dataValues;
  image = image ? `/u/admin/${image}` : null;
  const manipulatedData = {
    id: data.dataValues.id,
    image,
    ...rest,
    role: data.dataValues.role,
    allowEdit: data.dataValues.allowEdit,
    allowDelete: data.dataValues.allowDelete,
    websiteManagement: data.dataValues.websiteManagement,
  };
  if (!data)
    throw createAppError(
      "this admin is not found",
      HttpStatus.NotFound,
      notFoundPerson
    );
  successResponse(res, manipulatedData);
});

// get single admin admin using id
const getMe = controllerWrapper(async (req, res, next) => {
  const adminId = req.auth.id;
  const data = await Admin.findOne({
    where: { id: adminId },
    include: "Person",
  });
  if (!data)
    throw createAppError(
      "This Admin is not found",
      HttpStatus.NotFound,
      notAuth
    );

  let { id, password, image, ...rest } = data.dataValues.Person.dataValues;
  image = image ? `/u/admin/${image}` : null;

  const manipulatedData = {
    id: data.dataValues.id,
    image,
    ...rest,
    role: data.dataValues.role,
    allowEdit: data.dataValues.allowEdit,
    allowDelete: data.dataValues.allowDelete,
    websiteManagement: data.dataValues.websiteManagement,
  };
  if (!data)
    throw createAppError(
      "this admin is not found",
      HttpStatus.NotFound,
      notAuth
    );
  successResponse(res, manipulatedData);
});

// add new Admin
const addAdmin = controllerWrapper(async (req, res, next) => {
  const {
    name,
    email,
    password,
    passwordConfirmation,
    phone,
    role,
    allowEdit,
    allowDelete,
    websiteManagement,
  } = req.body;

  /* ------------------------------- START ------------------------------- */
  // validate the data
  await validationChecker(req, res);
  if (password && password !== passwordConfirmation)
    throw createAppError(
      "password confirmation must be identical the password",
      HttpStatus.BadRequest,
      notMatchedPassword
    );
  /* ------------------------------- END ------------------------------- */

  const hashingPass = await hashPassword(password);
  const image = req.file?.filename;
  if (!image) {
    throw createAppError("image is required", HttpStatus.BadRequest, requiredImg);
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
  searchPerson.forEach((person) => {
    if (person.email == email)
      throw createAppError("this email is invalid", HttpStatus.BadRequest, notAllowedEmail);
    if (person.phone == phone)
  
      throw createAppError("this phone is invalid", HttpStatus.BadRequest, notAllowedPhone);
  });


  /* ------------------------------- END ------------------------------- */

  // Create a new person
  const person = await Person.create({
    name,
    email,
    password: hashingPass,
    image,
    phone,
    type: "admin",
  });

  // Create a new admin associated with the person
  const admin = await Admin.create({
    personId: person.id,
    role,
    allowDelete : role == 'superAdmin' ? true : allowDelete,
    allowEdit: role == 'superAdmin' ? true : allowEdit,
    websiteManagement: role == 'superAdmin' ? true : websiteManagement,
  });

  admin.dataValues = { ...person.dataValues, ...admin.dataValues };
  successResponse(res, admin);
});

// update Admin
const updateAdmin = controllerWrapper(async (req, res, next) => {
  const adminId = req.params.id;
  const currentAdminId = req.auth?.id;
  const {
    name,
    email,
    password,
    passwordConfirmation,
    phone,
    role,
    allowEdit,
    allowDelete,
    websiteManagement,
  } = req.body;
  const image = req.file?.filename;
  /* ------------------------------- START ------------------------------- */
  // validate the data
  await validationChecker(req, res);
  if (password && password !== passwordConfirmation)
    throw createAppError(
      "password confirmation must be identical the password",
      HttpStatus.BadRequest,
      notMatchedPassword
    );
  // to pervent the admin to change his status and role
  if (
    currentAdminId == adminId &&
    (typeof allowDelete !== "undefined" ||
      typeof allowEdit !== "undefined" ||
      typeof allowDelete !== "undefined" ||
      typeof role !== "undefined")
  )
    throw createAppError(
      "The admin can not change his status and role",
      HttpStatus.NotFound,
      notAllowChangeRole
    );
  /* ------------------------------- END ------------------------------- */

  const adminData = await Admin.findOne({ where: { id: adminId } });

  if (!adminData){
    clearImage(getFilePath(image));
    throw createAppError("This Admin is not found", HttpStatus.NotFound, notFoundPerson);
  }
  const personData = await Person.findOne({
    where: { id: adminData.dataValues.personId },
  });
  if (!personData){
    clearImage(getFilePath(image));
    throw createAppError("This Admin is not found", HttpStatus.NotFound, notFoundPerson);
  }

  /* ------------------------------- START ------------------------------- */
  // checking the email and phone in all persons except the requested admin
  const checkingArr = [];
  phone && checkingArr.push({ phone });
  email && checkingArr.push({ email });
  const searchPerson = await Person.findAll({
    where: {
      [Op.and]: [
        { [Op.or]: checkingArr },
        { id: { [Op.not]: adminData.dataValues.personId } },
      ],
    },
  });

  searchPerson.forEach((person) => {
    if (person.email == email){
      clearImage(getFilePath(image));
      throw createAppError('this email is invalid', HttpStatus.BadRequest, notAllowedEmail);
    }
      // checkValidCredentials.push("");
    if (person.phone == phone){
      clearImage(getFilePath(image));
      throw createAppError('this phone is invalid', HttpStatus.BadRequest, notAllowedPhone);
    }
 
  });

    

  /* ------------------------------- END ------------------------------- */

  let updatedData = {}; // to collect updated data on the two tables ( Person + Admin )

  /* ------------------------------- START ------------------------------- */
  // changing data on the Admin table
  role && (adminData.role = role);
  // if admin is super admin must be has permission to delete , edit or manage website
  if(role == 'superAdmin' || (!role && adminData.role == 'superAdmin' )){
    adminData.allowEdit = allowEdit
    adminData.allowDelete = allowDelete
    adminData.websiteManagement = websiteManagement
  }else{
    allowEdit && (adminData.allowEdit = allowEdit);
    allowDelete && (adminData.allowDelete = allowDelete);
    websiteManagement && (adminData.websiteManagement = websiteManagement);
  }



  const savedAdminData = await adminData.save();
  updatedData = { ...savedAdminData.dataValues };
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
    const { id, password, ...rest } = savedPersonData.dataValues;
    updatedData = { ...updatedData, ...rest };
  }

  /* ------------------------------- END ------------------------------- */
 // to delete the old image to replace it with the new one
  if (image && personData.dataValues.image) clearImage(getFilePath(personData.dataValues.image));

  successResponse(res, updatedData);
});

// update me
const updateMe = controllerWrapper(async (req, res, next) => {
  const adminId = req.auth.id;
  const { name, email, password, passwordConfirmation, phone } = req.body;
  const image = req.file?.filename;

  /* ------------------------------- START ------------------------------- */
  // validate the data
  await validationChecker(req, res);
  if (password && password !== passwordConfirmation){
    clearImage(getFilePath(image));
    throw createAppError(
      "password confirmation must be identical the password",
      HttpStatus.BadRequest,
      wrongPassword
    );
  }
  
  /* ------------------------------- END ------------------------------- */

  const adminData = await Admin.findOne({ where: { id: adminId } });
  if (!adminData) {
    clearImage(getFilePath(image));
    throw createAppError(
      "This Admin is not found",
      HttpStatus.NotFound,
      notAuth
    );
  }

  const personData = await Person.findOne({
    where: { id: adminData.dataValues.personId },
  });
  if (!personData) {
    clearImage(getFilePath(image));
        throw createAppError(
      "This Admin is not found",
      HttpStatus.NotFound,
      notAuth
    );
  }
// to delete the old image to replace it with the new one
  if (image && personData.dataValues.image) clearImage(getFilePath(personData.dataValues.image));
  
  /* ------------------------------- START ------------------------------- */
  // checking the email and phone in all persons except the requested admin
  const checkingArr = [];
  phone && checkingArr.push({ phone });
  email && checkingArr.push({ email });
  const searchPerson = await Person.findAll({
    where: {
      [Op.and]: [
        { [Op.or]: checkingArr },
        { id: { [Op.not]: adminData.dataValues.personId } },
      ],
    },
  });

  searchPerson.forEach((person) => {
    if (person.email == email) {
      clearImage(getFilePath(image));
      throw createAppError(
        "this email is invalid",
        HttpStatus.BadRequest,
        notAllowedEmail
      );
    }
    if (person.phone == phone) {
      clearImage(getFilePath(image));
      throw createAppError(
        "this email is invalid",
        HttpStatus.BadRequest,
        notAllowedPhone
      );
    }
  });

  /* ------------------------------- END ------------------------------- */

  let updatedData = {}; // to collect updated data on the two tables ( Person + Admin )
  /* ------------------------------- START ------------------------------- */
  // changing data on the person table only
  const hashingPass = password ? await hashPassword(password) : null;

  name && (personData.name = name);
  email && (personData.email = email);
  password && (personData.password = hashingPass);
  phone && (personData.phone = phone);
  image && (personData.image = image);

  const savedPersonData = await personData.save();
  if (savedPersonData) {
    const { id, password, ...rest } = savedPersonData.dataValues;
    updatedData = { ...rest };
  }

  /* ------------------------------- END ------------------------------- */
  successResponse(res, updatedData);
});

// delete admin
const deleteAdmin = controllerWrapper(async (req, res, next) => {
  const adminId = req.params.id;

  const theAdmin = await Admin.findOne({
    where: { id: adminId },
    include: "Person",
  });
  if (!theAdmin)
    throw createAppError(
      "This Admin was not found",
      HttpStatus.BadRequest,
      notFoundPerson
    );
  const { id, password, ...rest } = theAdmin.dataValues.Person.dataValues;
  const data = await Person.findOne({ where: { id } });

  if (!data)
    throw createAppError("This Admin was not found", HttpStatus.NotFound, notFoundPerson);


  // delete admin from the person table and it will be deleted from admin table ( CASCADE )
  await data.destroy();
    // to delete the image when the admin item
    if (data.dataValues.image) clearImage(getFilePath(data.dataValues.image)); 

  // retrieve the convenient data
  const manipulatedData = {
    id: theAdmin.dataValues.id,
    ...rest,
    role: theAdmin.dataValues.role,
    allowEdit: theAdmin.dataValues.allowEdit,
    allowDelete: theAdmin.dataValues.allowDelete,
    websiteManagement: theAdmin.dataValues.websiteManagement,
  };

  successResponse(res, manipulatedData);
});

module.exports = {
  addAdmin,
  getAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
  updateMe,
  getMe,
};
