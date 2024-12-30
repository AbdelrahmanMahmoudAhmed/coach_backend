const {  ContactUs ,Settings } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const { Op } = require("sequelize");
const { notFoundData } = require("../../constant/errors");
const { sendEmail } = require("../utils/email");





const getAllMessages = controllerWrapper(async (req, res, next) => {
      /* ------------------------------- START ------------------------------- */

      // pagination and search variables
  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const totalCount = await ContactUs.count();
  /* ------------------------------- END ------------------------------- */


  const data = await ContactUs.findAll({
    limit: perPage,
    offset,
  });
    successResponse(res, data , 200, [
        { pagination: { currentPage: page, perPage, totalCount } },
      ]);
});


const addMessage = controllerWrapper(async (req, res, next) => {
    const { name, email, department, title, message } = req.body;

    await validationChecker(req, res);



    // add the message to the contact table
    const msg = await ContactUs.create({ name, email, department, title, message });



    // send message to the mail

    const getContactEmail = await Settings.findAll({
      attributes: ["key", "value"],
      where: {
        key: ["contactEmail","email"],
      },
    });

    const content = `
    <h1>${title}</h1>
    <p>name: ${name}</p>
    <p>email: ${email}</p>
    <p>Department: ${department}</p>


    <strong> The Message </strong>
    <p> ${message}</p>
    `
    let contactEmail = "";
    let mainEmail = "";


    getContactEmail.forEach(element => {
      if (element?.key == "contactEmail") contactEmail = element?.value;
      if (element?.key == "email") mainEmail = element?.value;
    });
    
    const options = {
      sender: {
        name:name,
        address: contactEmail || process.env.EMAIL_USER || "",
      },
      recipient: mainEmail,
      subject:title,
      html: content,
    };

    await sendEmail(contactEmail, options);

    successResponse(res, msg, 201);
});


const deleteMessage = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;



    const data = await ContactUs.findOne({ where: { id } });

    if (!data) throw createAppError("This item was not found", HttpStatus.NotFound, notFoundData);

    const deletedItemData = await data.destroy();
    successResponse(res, deletedItemData);

});









module.exports = {
    addMessage,
    getAllMessages,
    deleteMessage,
};
