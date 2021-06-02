const { Policy } = require("../models/policy");

async function getPolicy(id) {
  if (id) return await Policy.findOne({ _id: id });
  return await Policy.find();
}

module.exports = { getPolicy };
