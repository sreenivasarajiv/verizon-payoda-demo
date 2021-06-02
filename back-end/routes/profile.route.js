const router = require("express").Router();
const profileCtrl = require("../controllers/profile.controller");

module.exports = router
  .post("/", profileCtrl.createProfile)
  .get("/", profileCtrl.getProfile)
  .get("/:id", profileCtrl.getProfile);
