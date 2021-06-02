const Joi = require("joi");
const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  generateOptions: new mongoose.Schema({
    generateSmartToken: { type: Boolean, default: false },
    generateSoftwareKey: { type: Boolean, default: false },
    enableExternalCSR: { type: Boolean, default: false },
    generateSoftwareKeyServerSide: { type: Boolean, default: false },
  }),
  policy: {
    type: String,
    enum: [
      "certInvite",
      "forcedCertInvite",
      "disableRequestPage",
      "enableRequestPage",
    ],
  },
  raOptions: new mongoose.Schema({
    requiredCertOrders: new mongoose.Schema({
      value: {
        type: Number,
        default: 0,
      },
      bypass: {
        type: Boolean,
        default: false,
      },
    }),
    requiredCertStatus: new mongoose.Schema({
      value: {
        type: Number,
        default: 0,
      },
      bypass: {
        type: Boolean,
        default: false,
      },
    }),
    requiredKeyRecovery: {
      type: Number,
      default: 0,
    },
  }),
});

const Policy = mongoose.model("Policy", policySchema);

function validatePolicy(p) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(p, schema);
}

exports.Policy = Policy;
exports.validatePolicy = validatePolicy;
exports.Schema = policySchema;
