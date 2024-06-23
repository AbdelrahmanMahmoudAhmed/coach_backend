const { Settings } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");

const handelGettingData = async (req, res, next) => {

    const section = req.query.section;
    const data = await Settings.findAll();
    if (section) {
        switch (section) {
            case 'terms':
                let termsData = {}
                data.forEach((item) => {
                    if (item.key == 'termsAr') termsData.termsAr = item.value
                    if (item.key == 'termsEn') termsData.termsEn = item.value
                })
                successResponse(res, termsData);
            case "policy":
                let policyData = {}
                data.forEach((item) => {
                    if (item.key == 'policyAr') policyData.policyAr = item.value
                    if (item.key == 'policyEn') policyData.policyEn = item.value
                })
                successResponse(res, policyData);
            case "about":
                let aboutData = {}
                data.forEach((item) => {
                    if (item.key == 'aboutAr') aboutData.aboutAr = item.value
                    if (item.key == 'aboutEn') aboutData.aboutEn = item.value
                })
                successResponse(res, aboutData);
            case "seo":
                let seoData = {}
                data.forEach((item) => {
                    if (item.key == 'title') seoData.title = item.value
                    if (item.key == 'description') seoData.description = item.value
                    if (item.key == 'keyWords') seoData.keyWords = item.value
                })
                successResponse(res, seoData);
            default:

        }
    }

    const layoutData = {
        data: {},
        seo: {},
        socialMedia: {},
        // pages: {},
    }

    data.forEach((item, idx) => {
        let socialMedia = ['facebook', 'tiktok', 'instagram', 'x', 'youtube'];
        let seo = ['title', 'description', 'keyWords'];
        let pages = ['aboutAr', 'aboutEn', 'policyAr', 'policyEn', 'termsAr', 'termsEn'];
        let desc = ['mainDescAr', "mainDescEn", "footerDescAr", "footerDescEn"]
        if (socialMedia.includes(item.key)) {
            layoutData.socialMedia[item.key] = item.value
        } else if (seo.includes(item.key)) {
            layoutData.seo[item.key] = item.value

        } else if (desc.includes(item.key)) {
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

    const keysToUpdate = Object.keys(req.body); // the keys for only updated values 

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
