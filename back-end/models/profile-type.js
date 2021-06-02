const mongoose = require("mongoose");

const profileTypeScheme = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  name: String,
});

const ProfileType = mongoose.model("ProfileType", profileTypeScheme);
module.exports = { ProfileType };
