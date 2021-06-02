const express = require("express");
require("express-async-errors");

const profile = require("../routes/profile.route");
const policy = require("../routes/policy.route");
const profileType = require("../routes/profile-type.route");
const cors = require("cors");

const { errorHandler } = require("../middlewares/error");

module.exports = function (app) {
  app.use(cors());

  app.use(express.json());
  app.use(express.static('public'));
  app.use("/api/profile", profile);
  app.use("/api/policy", policy);
  app.use("/api/profile-type", profileType);

  // global error handler
  app.use(errorHandler);
};
