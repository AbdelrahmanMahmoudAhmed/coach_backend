const { Subscription, Settings } = require("../../models");
const { Op } = require("sequelize");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const { notFoundData, sendEmailErr } = require("../../constant/errors");
const { sendEmail } = require("../utils/email");
require("dotenv").config();

const getSingleSubscription = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const data = await Subscription.findOne({ where: { id } });

  if (!data)
    throw createAppError(
      "This Subscription was not found",
      HttpStatus.NotFound,
      notFoundData
    );
  successResponse(res, data);
});
const getAllSubscriptions = controllerWrapper(async (req, res, next) => {
  /* ------------------------------- START ------------------------------- */
  // pagination
  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const totalCount = await Subscription.count();
  /* ------------------------------- END ------------------------------- */
  const data = await Subscription.findAll({
    limit: perPage,
    offset,
  });

  if (!data)
    throw createAppError(" not found", HttpStatus.NotFound, notFoundData);

  successResponse(res, data, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});
const addSubscription = controllerWrapper(async (req, res, next) => {
  const { email } = req.body;

  await validationChecker(req, res);

  const addedSubscription = await Subscription.create({ email });
  successResponse(res, addedSubscription, 201);
});
const deleteSubscription = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;

  const data = await Subscription.findOne({ where: { id } });
  if (!data)
    throw createAppError(
      "This Subscription was not found",
      HttpStatus.NotFound,
      notFoundData
    );

  const deletedItemData = await data.destroy();
  successResponse(res, deletedItemData);
});

const sendingEmails = controllerWrapper(async (req, res, next) => {
  const { subject, content } = req.body;

  await validationChecker(req, res);

  const data = await Subscription.findAll({ attributes: ["email"] });
  if (!data)
    throw createAppError("data not found", HttpStatus.NotFound, notFoundData);

  const getContactEmail = await Settings.findOne({
    attributes: ["key", "value"],
    where: {
      key: "contactEmail",
    },
  });

  const contactEmail = getContactEmail?.value;

  const emailList = data?.map((item) => item?.email) || [];
  const options = {
    sender: {
      name: "HMASERV",
      address: contactEmail || process.env.EMAIL_USER || "",
    },
    recipient: emailList,
    subject,
    html: content,
  };

  try {
    await sendEmail(contactEmail, options);
    successResponse(res, " mails have been sent ", 201);
  } catch (err) {
    throw createAppError(
      " can not send emails",
      HttpStatus.BadRequest,
      sendEmailErr
    );
  }
});

module.exports = {
  addSubscription,
  getAllSubscriptions,
  deleteSubscription,
  getSingleSubscription,
  sendingEmails,
};
