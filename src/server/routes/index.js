const express = require("express");

//middlewares and helpers
const { ADMIN, CLIENT } = require("../../constant/roles");
const { isAuth } = require("../middleware/isAuth");
// routes
const quickAnswers = require("./quickAnswers");
const transformations = require("./transformation");
const manageQuickAnswers = require("./admin/manageWebsite");
const manageAdmins = require("./admin/admins");
const manageClients = require("./admin/manageClients");
const adminAuth = require("./admin/auth");
const clientAuth = require("./auth/auth");
const clientManagement = require("./client/manageClient");
const productsManagement = require("./admin/manageProducts");

const setupApiRouters = (app) => {
  const router = express.Router();

  /* ------------------------------- WEBSITE DATA ------------------------------- */
  router.use("/quick-answers", quickAnswers);
  router.use("/transformations", transformations);

  /* ------------------------------- WEBSITE AUTH ------------------------------- */
  // website auth
  router.use("/auth", clientAuth);
  router.use('/me' ,clientManagement )

  /* ------------------------------- ADMIN MANAGEMENT ------------------------------- */
  // admin auth
  router.use("/admin", adminAuth);
  //manage website
  router.use("/admin/website-management", isAuth(ADMIN), manageQuickAnswers);
  //manage admins
  router.use("/admin", isAuth(ADMIN), manageAdmins);
  //manage clients
  router.use("/admin/clients-management", isAuth(ADMIN), manageClients);
    //manage products
    router.use("/admin/products", isAuth(ADMIN), productsManagement);

  app.use("/api", router);
};

module.exports = setupApiRouters;
