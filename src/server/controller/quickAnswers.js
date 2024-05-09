const { QuickAnswer } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");

const getAllQuickAnswer = controllerWrapper(async (req, res, next) => {
  const data = await QuickAnswer.findAll();
  successResponse(res, data);
});
const addQuickAnswer = controllerWrapper(async (req, res, next) => {
  const { questionAr, questionEn, answerAr, answerEn } = req.body;
  if(! req.auth.allowEdit) throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);
  await validationChecker(req, res);

  const quickAnswerRq = await QuickAnswer.create({
    questionAr,
    questionEn,
    answerAr,
    answerEn,
  });
  successResponse(res, quickAnswerRq, 201);
});
const deleteQuickAnswer = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  if(! req.auth.allowEdit) throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);


  const data = await QuickAnswer.findOne({ where: { id } });
  if (data) {
    const deletedItemData = await data.destroy();
    successResponse(res, deletedItemData);
  } else {
    throw createAppError("This item was not found", HttpStatus.NotFound, 100);
  }
});






const updateQuickAnswer = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  if(! req.auth.allowEdit) throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);

  const { questionAr, questionEn, answerAr, answerEn } = req.body;

  await validationChecker(req, res);

  const data = await QuickAnswer.findOne({ where: { id } });
  if (data) {
    questionAr && (data.questionAr = questionAr);
    questionEn && (data.questionEn = questionEn);
    answerAr && (data.answerAr = answerAr);
    answerEn && (data.answerEn = answerEn);

    const savedData = await data.save();

    successResponse(res, savedData);
  } else {
    throw createAppError("This item was not found", HttpStatus.NotFound, 1);
  }
});

module.exports = {
  addQuickAnswer,
  getAllQuickAnswer,
  deleteQuickAnswer,
  updateQuickAnswer,
};
