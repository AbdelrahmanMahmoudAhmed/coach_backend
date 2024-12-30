const express = require("express");

// controllers
const { getTerms , getPolicy , getLayout , getHomePage } = require('../controller/settings')
const { getAboutUs} = require('../controller/aboutUS')
const { getSingleProject} = require("../controller/project")
const { getWebsiteServices} = require("../controller/services")



//middlewares and helpers
const { ADMIN, CLIENT } = require("../../constant/roles");
const { isAuth } = require("../middleware/isAuth");

// routes

const contactUs = require("./contactUs");
const subscription = require("./subscription");

const adminAuth = require("./admin/auth");
const adminData = require("./admin/admins");

const manageWebsite = require("./admin/manageWebsite")



const setupApiRouters = (app) => {
  const router = express.Router();

  /* ------------------------------- WEBSITE DATA ------------------------------- */


  router.use("/contact-us", contactUs);
  router.use("/subscription", subscription);

  router.get('/home' , getHomePage);
  router.get('/services' , getWebsiteServices);
  router.get('/project/:id' , getSingleProject);
  router.get('/about' , getAboutUs );
  router.get('/terms' , getTerms );
  router.get('/policy' , getPolicy );
  router.get('/layout' , getLayout );

  

  /* ------------------------------- ADMIN MANAGEMENT ------------------------------- */
  // admin auth
  router.use("/panel", adminAuth);
  router.use("/panel" , isAuth() , adminData );
  router.use("/panel/website-management", isAuth(), manageWebsite);


  

  app.use("/api", router);
};

module.exports = setupApiRouters;
