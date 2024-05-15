const {  ContactUs } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const { Op } = require("sequelize");

const getAllMessages = controllerWrapper(async (req, res, next) => {
      /* ------------------------------- START ------------------------------- */

      // pagination and search variables
  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const searchTerm = req.query.search || "";
  const totalCount = await ContactUs.count({
    where: {
        [Op.or]: [
            { name: { [Op.like]: `%${searchTerm}%` } },
            { email: { [Op.like]: `%${searchTerm}%` } },
            { phone: { [Op.like]: `%${searchTerm}%` } },
            { title: { [Op.like]: `%${searchTerm}%` } },
            { message: { [Op.like]: `%${searchTerm}%` } },
          ],
    },
  });
  /* ------------------------------- END ------------------------------- */


  const data = await ContactUs.findAll({
    where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerm}%` } },
          { email: { [Op.like]: `%${searchTerm}%` } },
          { phone: { [Op.like]: `%${searchTerm}%` } },
          { title: { [Op.like]: `%${searchTerm}%` } },
          { message: { [Op.like]: `%${searchTerm}%` } },
        ],
      },
    limit: perPage,
    offset,
  });
    successResponse(res, data , 200, [
        { pagination: { currentPage: page, perPage, totalCount } },
      ]);
});





const addMessage = controllerWrapper(async (req, res, next) => {
    const { name, email, phone, title, message } = req.body;

    await validationChecker(req, res);

    const videoRq = await ContactUs.create({ name, email, phone, title, message });
    successResponse(res, videoRq, 201);
});


const deleteMessage = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;



    const data = await ContactUs.findOne({ where: { id } });

    if (!data) throw createAppError("This item was not found", HttpStatus.NotFound, 100);

    const deletedItemData = await data.destroy();
    successResponse(res, deletedItemData);

});








module.exports = {
    addMessage,
    getAllMessages,
    deleteMessage,
};
