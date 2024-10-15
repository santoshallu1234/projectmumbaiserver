const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerSchema = new Schema(
  {
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    dateOfBirth: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pfp: {
      type: String,
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
    },
    profession: {
      type: String,
    },
    location: {
      type: String,
      // required: true,
    },
    pinCode: {
      type: String,
      // required: true,
    },
    reference: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      // required: true
    },
    socialAccounts: [
      {
        platform: {
          type: String, // e.g., 'instagram', 'facebook', etc.
          // required: true,
        },
        handle: {
          type: String, // e.g., 'sat.yuum', 'satyam', etc.
          // required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer
