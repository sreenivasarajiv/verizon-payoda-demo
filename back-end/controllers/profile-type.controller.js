const profileTypeService = require("../services/profile-type.service");

async function getProfileTypes(req, res) {
  const profileTypes = await profileTypeService.getProfileTypes(req.params.id);
  return res.json(profileTypes);
}

module.exports = { getProfileTypes };
