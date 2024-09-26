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
                return   successResponse(res, termsData);
            case "policy":
                let policyData = {}
                data.forEach((item) => {
                    if (item.key == 'policyAr') policyData.policyAr = item.value
                    if (item.key == 'policyEn') policyData.policyEn = item.value
                })
                return successResponse(res, policyData);
            case "about":
                let aboutData = {}
                data.forEach((item) => {
                    if (item.key == 'aboutAr') aboutData.aboutAr = item.value
                    if (item.key == 'aboutEn') aboutData.aboutEn = item.value
                })
                return successResponse(res, aboutData);
                case "contact":
                    let contactData = {}
                    data.forEach((item) => {
                        if (item.key == 'contactContentAr') contactData.contactContentAr = item.value
                        if (item.key == 'contactContentEn') contactData.contactContentEn = item.value
                    })
                    return  successResponse(res, contactData);
            case "home":
                let homeData = {}
                data.forEach((item) => {
                    if (item.key == 'mainTitleAr') homeData.mainTitleAr = item.value
                    if (item.key == 'mainTitleEn') homeData.mainTitleEn = item.value
                    if (item.key == 'mainDescAr') homeData.mainDescAr = item.value
                    if (item.key == 'mainDescEn') homeData.mainDescEn = item.value
                    if (item.key == 'aboutAr') homeData.aboutAr = item.value
                    if (item.key == 'aboutEn') homeData.aboutEn = item.value
                })
                return  successResponse(res, homeData);
                case "layout":
                    let layoutData = {}
                    data.forEach((item) => {
                        if (item.key == 'title') layoutData.title = item.value
                        if (item.key == 'description') layoutData.description = item.value
                        if (item.key == 'keywords') layoutData.keywords = item.value
                        if (item.key == 'footerDescAr') layoutData.footerDescAr = item.value
                        if (item.key == 'footerDescEn') layoutData.footerDescEn = item.value
                        if (item.key == 'phone') layoutData.phone = item.value
                        if (item.key == 'email') layoutData.email = item.value
                        if (item.key == 'facebook') layoutData.facebook = item.value
                        if (item.key == 'tiktok') layoutData.tiktok = item.value
                        if (item.key == 'instagram') layoutData.instagram = item.value
                        if (item.key == 'x') layoutData.x = item.value
                        if (item.key == 'youtube') layoutData.youtube = item.value
                        if (item.key == 'whatsApp') layoutData.whatsApp = item.value
                    })
                    return  successResponse(res, layoutData);
            default:

        }
    }

    const layoutData = {
        // data: {},
        seo: {},
        socialMedia: {},
        pages: {},
        desc:{}
    }

    data.forEach((item, idx) => {
        let socialMedia = ['facebook', 'tiktok', 'instagram', 'x', 'youtube' , 'whatsApp'];
        let seo = ['title', 'description', 'keywords'];
        let pages = ['aboutAr', 'aboutEn', 'policyAr', 'policyEn', 'termsAr', 'termsEn' , "contactContentAr" , 'contactContentEn'];
        let desc = ['mainTitleAr', "mainTitleEn", 'mainDescAr', "mainDescEn", "footerDescAr", "footerDescEn", "phone" , "email"]
        if (socialMedia.includes(item.key)) {
            layoutData.socialMedia[item.key] = item.value
        } else if (seo.includes(item.key)) {
            layoutData.seo[item.key] = item.value

        } else if (desc.includes(item.key)) {
            layoutData.desc[item.key] = item.value
        } else if (pages.includes(item.key)) {
            layoutData.pages[item.key] = item.value
        }
    }

    )
   return successResponse(res, layoutData);
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
