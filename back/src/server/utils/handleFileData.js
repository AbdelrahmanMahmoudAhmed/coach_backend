const path = require("path");
const { createAppError } = require("../utils/error");
const { HttpStatus } = require("../utils/httpCodes");
const { serverErr } = require("../../constant/errors");

const dataInfo = {
  feedback: {
    isSingle: true,
    data: "img",
  },
  settings: {
    isSingle: true,
    data: "servicesVideo",
  },
  about: {
    isSingle: false,
    data: [
      { name: "aboutBanner", maxCount: 1 },
      { name: "homeImgOne", maxCount: 1 },
      { name: "homeImgTwo", maxCount: 1 },
      { name: "homeImgThree", maxCount: 1 },
      { name: "homeImgFour", maxCount: 1 },
      { name: "aboutImgOne", maxCount: 1 },
      { name: "aboutImgTwo", maxCount: 1 },
      { name: "aboutImgThree", maxCount: 1 },
      { name: "aboutImgFour", maxCount: 1 },
    ],
  },
  service: {
    isSingle: false,
    data: [
      { name: "image", maxCount: 1 },
      { name: "iconDark", maxCount: 1 },
      { name: "iconLight", maxCount: 1 },

    ],
  },
  project: {
    isSingle: false,
    data: [
      { name: "banner", maxCount: 1 },
      { name: "homeImg", maxCount: 1 },
      { name: "previewImg", maxCount: 1 },
      { name: "serviceImg", maxCount: 1 },
      { name: "clientImg", maxCount: 1 },

    ],
  },


};

const gettingPath = (req) => {
  if (!req || !req.url) {
    return cb(
      createAppError(
        "Request object or URL is missing.",
        HttpStatus.BadRequest,
        serverErr
      )
    );
  }

  const basePath = path.join(__dirname, "..", "..", "..", "uploads");

  // URL-to-path mappings
  const urlMappings = {
    "/api/panel/website-management/feedback": "feedback",
    "/api/panel/website-management/settings": "settings",
    "/api/panel/website-management/about": "about",
    "/api/panel/website-management/services": "service",
    "/api/panel/website-management/project": "project",
  };

  // Find the first matching URL pattern
  const match = Object.entries(urlMappings).find(([url]) =>
    req.url.includes(url)
  );

  // Return the path if found, otherwise undefined
  return {
    path: match ? path.join(basePath, match[1]) : undefined,
    isSingle: dataInfo[match?.[1]]?.isSingle,
    data: dataInfo[match?.[1]]?.data,
  };
};

module.exports = gettingPath;
