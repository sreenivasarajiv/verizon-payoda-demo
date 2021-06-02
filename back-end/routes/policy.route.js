const express = require("express");
const router = express.Router();
const policyCtrl = require("../controllers/policy.controller");

module.exports = router
  .get("/", policyCtrl.getPolicy)
  .get("/:id", policyCtrl.getPolicy);
