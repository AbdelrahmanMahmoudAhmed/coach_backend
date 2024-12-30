const { Admin } = require("../../models");

const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const { hashPassword, comparePassword } = require("../utils/password");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");

const {
  wrongPassword,
  notAuth,
  notFoundData,
} = require("../../constant/errors");

const getMe = controllerWrapper(async (req, res, next) => {
  const adminId = req.auth.id;
  const data = await Admin.findOne({
    where: { id: adminId },
  });

  if (!data)
    throw createAppError(
      "This Admin is not found",
      HttpStatus.NotFound,
      notAuth
    );
  let { password, ...rest } = data.dataValues;
  const manipulatedData = { ...rest };
  successResponse(res, manipulatedData);
});

const updateMe = controllerWrapper(async (req, res, next) => {
  const adminId = req.auth.id;
  const { name, email } = req.body;

  await validationChecker(req, res);

  const adminData = await Admin.findOne({ where: { id: adminId } });
  if (!adminData && !adminData.dataValues)
    throw createAppError(
      "This Admin is not found",
      HttpStatus.NotFound,
      notAuth
    );

  name && (adminData.name = name);
  email && (adminData.email = email);

  const savedAdminData = await adminData.save();
  if (savedAdminData) {
    const { password, ...rest } = savedAdminData.dataValues;
    const updatedData = { ...rest };
    successResponse(res, updatedData);
  } else {
    throw createAppError(
      "This Admin is not found",
      HttpStatus.NotFound,
      notFoundData
    );
  }
});

const updatePassword = controllerWrapper(async (req, res, next) => {
  const adminId = req.auth.id;
  const { password, newPassword } = req.body;

  const adminData = await Admin.findOne({ where: { id: adminId } });
  if (!adminData)
    throw createAppError(
      "This Admin is not found",
      HttpStatus.NotFound,
      notAuth
    );

  const comparedPassword = await comparePassword(adminData.password, password);

  if (!comparedPassword)
    throw createAppError("wrong password", HttpStatus.Forbidden, wrongPassword);

  const hashingPass = newPassword ? await hashPassword(newPassword) : null;
  hashingPass && (adminData.password = hashingPass);

  const savedadminData = await adminData.save();
  if (savedadminData) {
    const { password, ...rest } = savedadminData.dataValues;
    const updatedData = {
      ...rest,
    };
    successResponse(res, updatedData);
  } else {
    throw createAppError(
      "This Admin is not found",
      HttpStatus.NotFound,
      notFoundData
    );
  }
});

module.exports = {
  updateMe,
  getMe,
  updatePassword,
};
