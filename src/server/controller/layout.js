const { Settings } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");

const handelGettingData = async (req, res, next) => {
    const data = await Settings.findAll();

    const layoutData = {
        data: {},
        seo: {},
        socialMedia: {}
    }
    data.forEach((item, idx) => {
        let socialMedia = ['facebook', 'tiktok', 'instagram', 'x', 'youtube'];
        let seo = ['title', 'description', 'keyWords'];
        if (socialMedia.includes(item.key)) {
            layoutData.socialMedia[item.key] = item.value

        } else if (seo.includes(item.key)) {
            layoutData.seo[item.key] = item.value

        } else {
            layoutData.data[item.key] = item.value

        }
    }

    )
    successResponse(res, layoutData);
}



const getLayout = controllerWrapper(handelGettingData);








const updateLayout = controllerWrapper(async (req, res, next) => {

    // start validate
    await validationChecker(req, res);

    const keysToUpdate =  Object.keys(req.body); // the keys for only updated values 

    // to get only updated values with its keys .
    const updates = [];
    keysToUpdate.forEach((item) => {
        updates.push({ key: item, value: req.body[item] })
    })


    await Settings.destroy({ where: { key: keysToUpdate } }); // delete the old records witch that has a new value
    await Settings.bulkCreate(updates); // create all new values



    handelGettingData(req, res, next)
});

module.exports = {
    getLayout,
    updateLayout,
};
