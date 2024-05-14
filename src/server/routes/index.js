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
const certifications = require("./certifications");
const manageWebsite = require("./admin/manageWebsite");
const manageAdmins = require("./admin/admins");
const manageClients = require("./admin/manageClients");
const adminAuth = require("./admin/auth");
const clientAuth = require("./auth/auth");
const clientManagement = require("./client/manageClient");
// const productsManagement = require("./admin/manageProducts");
// const packagesManagement = require("./admin/managePackages");

const setupApiRouters = (app) => {
  const router = express.Router();

  /* ------------------------------- WEBSITE DATA ------------------------------- */
  router.use("/quick-answers", quickAnswers);
  router.use("/transformations", transformations);
  router.use("/products", products);
  router.use("/packages", packages);
  router.use("/sections", sections);
  router.use("/certifications", certifications);
  

  /* ------------------------------- WEBSITE AUTH ------------------------------- */
  // website auth
  router.use("/auth", clientAuth);
  router.use('/me', clientManagement)

  /* ------------------------------- ADMIN MANAGEMENT ------------------------------- */
  // admin auth
  router.use("/admin", adminAuth);
  //manage website
  router.use("/admin/website-management", isAuth(ADMIN), manageWebsite);
  //manage admins
  router.use("/admin", isAuth(ADMIN), manageAdmins);
  //manage clients
  router.use("/admin/clients-management", isAuth(ADMIN), manageClients);






  // //manage products
  // router.use("/admin/products", isAuth(ADMIN), productsManagement);
  // //manage packages
  // router.use("/admin/packages", isAuth(ADMIN), packagesManagement);
  

  app.use("/api", router);
};

module.exports = setupApiRouters;
