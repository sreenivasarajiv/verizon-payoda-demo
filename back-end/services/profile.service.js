const { Profile, validateProfile } = require("../models/profile");

// CREATE
async function createProfile(profile) {
  const _profile = new Profile(profile);
  return await _profile.save();
}

// READ
async function getProfile(id) {
  const query = {};
  if (id) query.id = id;
  return await Profile.find(query);
}

function validate(profile) {
  return validateProfile(profile);
}

module.exports = {
  createProfile,
  getProfile,
  validate,
};
