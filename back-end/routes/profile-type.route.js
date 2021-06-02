const express = require("express");
const router = express.Router();
const profileTypeCtrl = require("../controllers/profile-type.controller");

module.exports = router
  .get("/", profileTypeCtrl.getProfileTypes)
  .get("/:id", profileTypeCtrl.getProfileTypes);
