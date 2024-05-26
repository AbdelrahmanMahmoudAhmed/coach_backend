const express = require("express");

//middlewares and helpers
const { ADMIN, CLIENT } = require("../../constant/roles");
const { isAuth } = require("../middleware/isAuth");
// routes
const quickAnswers = require("./quickAnswers");
const transformations = require("./transformation");
const packages = require("./packages");
const products = require("./products");
const sections = require("./sections");
const contactUs = require("./contactUs");
const videos = require("./videos");
const layout = require("./layout");
const certifications = require("./certifications");
const blogs = require("./blogs");
const manageWebsite = require("./admin/manageWebsite");
const manageAdmins = require("./admin/admins");
const manageClients = require("./admin/manageClients");
const adminAuth = require("./admin/auth");
const clientAuth = require("./auth/auth");
const clientManagement = require("./client/manageClient");
const clientCart = require("./client/cart");


const setupApiRouters = (app) => {
  const router = express.Router();

  /* ------------------------------- WEBSITE DATA ------------------------------- */
  router.use("/quick-answers", quickAnswers);
  router.use("/transformations", transformations);
  router.use("/products", products);
  router.use("/packages", packages);
  router.use("/sections", sections);
  router.use("/certifications", certifications);
  router.use("/blogs", blogs);
  router.use("/videos", videos);
  router.use("/contact-us", contactUs);
  router.use("/layout", layout);
  

  /* ------------------------------- WEBSITE AUTH ------------------------------- */
  // website auth
  router.use("/auth", clientAuth);
  router.use('/me', clientManagement)

  /* ------------------------------- CLIENTS'S CART ------------------------------- */
  router.use('/client/cart', clientCart)


  /* ------------------------------- ADMIN MANAGEMENT ------------------------------- */
  // admin auth
  router.use("/admin", adminAuth);
  //manage website
  router.use("/admin/website-management", isAuth(ADMIN), manageWebsite);
  //manage admins
  router.use("/admin", isAuth(ADMIN), manageAdmins);
  //manage clients
  router.use("/admin/clients-management", isAuth(ADMIN), manageClients);
  

  app.use("/api", router);
};

module.exports = setupApiRouters;
