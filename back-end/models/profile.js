const mongoose = require("mongoose");
const policySchema = require("./policy").Schema;
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Profile = mongoose.model(
  "Profile",
  new mongoose.Schema({
    profileType: new mongoose.Schema({
      code: {
        type: String,
        required: true,
      },
    }),
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
      maxlength: 255,
    },
    policies: [policySchema],
    emailAddresses: new mongoose.Schema({
      raFromEmailAddress: {
        type: String,
        required: true,
      },
      supportEmailAddress: String,
      nickName: String,
    }),
    websites: new mongoose.Schema({
      secureURL: {
        type: String,
        required: true,
      },
      gdpr: {
        type: Boolean,
        default: false
      },
    }),
  })
);

function validateProfile(profile) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(255),
    profileType: Joi.object().keys({
      code: Joi.string().required().min(3).max(255),
    }).required(),
    emailAddresses: Joi.object(),
    policies: Joi.array().required(),
    websites: Joi.object()
  });
  return schema.validate(profile);
}

exports.Profile = Profile;
exports.validateProfile = validateProfile;
