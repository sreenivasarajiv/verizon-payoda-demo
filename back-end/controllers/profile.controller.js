const profileService = require("../services/profile.service");

// CREATE
async function createProfile(req, res) {
  console.log('receiveed body >>>>>>>>>>', req.body);
  const { error } = profileService.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const profile = await profileService.createProfile(req.body);
  res.send(profile);
}

// READ
async function getProfile(req, res) {
  const profile = await profileService.getProfile(req.params.id);
  res.send(profile);
}

module.exports = { createProfile, getProfile };
