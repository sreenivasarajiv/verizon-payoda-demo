const { ProfileType } = require("../models/profile-type");

async function getProfileTypes(id) {
  if (id) return await ProfileType.findOne({ _id: id }, { code: 1, name: 1 });
  return await ProfileType.find({}, { code: 1, name: 1 });
}

module.exports = { getProfileTypes };
