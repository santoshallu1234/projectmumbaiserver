const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminEventSchema = new Schema(
  {
    eventId: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    registeredVolunteers: [
      {
        type: String,
      },
    ],
    approvedVolunteers: [
      {
        type: String,
      },
    ],
    attendedVolunteers: [
      {
        type: String,
      },
    ],
    points: [
      {
        volunteerId: {
          type: String,
          required: true,
        },
        points: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const AdminEvent = mongoose.model("AdminEvent", adminEventSchema);

module.exports = AdminEvent;
