const mongoose = require("mongoose");
const config = require("config");

const connString = config.get("CONNECTION_STRING");

const { ProfileType } = require("../models/profile-type");
const { Policy } = require("../models/policy");

const seedDataBase = async () => {
  await mongoose.connect(connString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  await ProfileType.insertMany([
    { name: "SCEP", code: "scep" },
    { name: "CMP", code: "cmp" },
    { name: "EST", code: "est" },
    { name: "Web Request", code: "webrequest" },
    { name: "Unified Web Request", code: "unifiedwebrequest" },
    { name: "RAAPI", code: "raapi" },
    { name: "XKMS", code: "xkms" },
  ]);

  await Policy.insertMany([
    {
      name: "[CA_NOKIACAT_1 INTERNAL] [CA SSLClientAdminCA_Policy]",
      generateOptions: {
        generateSmartToken: true,
      },
      policy: "certInvite",
      raOptions: {
        requiredCertOrders: {
          value: 3,
          bypass: false,
        },
        requiredCertStatus: {
          value: 1,
          bypass: true,
        },
        requiredKeyRecovery: 0,
      },
    },
    {
      name: "[CMP_SPIDERCLOUDCA_RSA] [CA SSLClientCA_Policy]",
      generateOptions: {
        generateSmartToken: true,
      },
      policy: "forcedCertInvite",
      raOptions: {
        requiredCertOrders: {
          value: 3,
          bypass: true,
        },
        requiredCertStatus: {
          value: 2,
          bypass: false,
        },
        requiredKeyRecovery: 0,
      },
    },
    {
      name: "[CA_NOKIACAT_1 INTERNAL] [CA SSLClientCA_Policy_V3]",
      generateOptions: {
        generateSmartToken: true,
      },
      policy: "certInvite",
      raOptions: {
        requiredCertOrders: {
          value: 4,
          bypass: false,
        },
        requiredCertStatus: {
          value: 2,
          bypass: true,
        },
        requiredKeyRecovery: 0,
      },
    },
  ]);

  console.log("seeded database successfully");
  process.exit(0);
};

seedDataBase();
