const policyService = require("../services/policy.service");

async function getPolicy(req, res) {
  const policies = await policyService.getPolicy(req.params.id);
  return res.json(policies);
}

module.exports = { getPolicy };
