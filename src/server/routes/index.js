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
const blogs = require("./blogs");
const manageWebsite = require("./admin/manageWebsite");
const manageAdmins = require("./admin/admins");
const manageClients = require("./admin/manageClients");
const adminAuth = require("./admin/auth");
const clientAuth = require("./auth/auth");
const clientManagement = require("./client/manageClient");


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
  

  app.use("/api", router);
};

module.exports = setupApiRouters;
