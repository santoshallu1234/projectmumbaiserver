const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }

);


const Event = mongoose.model("Event", eventSchema);

module.exports = Event
