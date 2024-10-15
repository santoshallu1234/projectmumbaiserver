const Event = require("../models/Event");
const adminController = require("./adminController")
const fs = require("fs");
const path = require("path");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

//create event
exports.createEvent = async (req, res) => {
  try {
    // console.log("in the event controller")
    // console.log(req.files)
    if (!req.files) {
      console.log("No file specified")
      req.body.banner = null
    } else {
      // console.log("Filename: ", req.files.banner[0].filename)
      // console.log("path: ", req.files.banner[0].path)
      req.body.banner = req.files.banner[0].filename
    }
    const event = new Event(req.body);
    const result = await event.save();
    // console.log(result)

    const isCreated = await adminController.createAdminEvent(result._id)

    res.status(201).json({ message: "Event created successfully", result, "Admin Event Created: ":isCreated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//get event
exports.getAllEvents = async (req, res) => {
  try {
    
    const result = await Event.find();

    res.status(200).json({ message: "Events retrieved", result: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from URL parameters
    if (!id) {
      return res.status(404).json({ message: "Id not found" });
    }
    const event = await Event.findById(id); // Find the event by ID

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event retrieved", event: event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



//update event:
exports.updateEvent = async (req, res) => {
  try {
    const id = req.params.id

    if (!req.files) {
      console.log("No file specified")
      req.body.banner = null
    } else {
      console.log("Filename: ", req.files.banner[0].filename)
      console.log("path: ", req.files.banner[0].path)
      req.body.banner = req.files.banner[0].filename
      
      //deleting prev file:
      const event = await Event.findById(id);
      // console.log("Event: ",event)
      
      if (!event) {
        res.status(400).json({message: "Event not found"})
      } else {
        if (event && event.banner) {
          const oldFilePath = path.join(__dirname, "../public", event.banner); // Adjust path if necessary
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath); // Deletes the old file
            console.log("Old banner deleted:", event.banner);
          }
        } else {
          console.log("No previous banner")
        }
      }


    }

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: id }, 
      req.body, 
      { new: true } 
    );

    res.status(200).json({ message: "Event Updated", result: updatedEvent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//delete event:
exports.deleteEvent = async (req, res) => {
  try {
    const id = req.params.id

      //deleting prev file:
      const event = await Event.findById(id);
      console.log(event)
      
      if (event && event.banner) {
        const oldFilePath = path.join(__dirname, "../public", event.banner); // Adjust path if necessary
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Deletes the old file
          console.log("Old banner deleted:", event.banner);
        }
      } else {
         throw new Error("Couldn't find event")
      }

    const deletedEvent = await Event.findByIdAndDelete(id);
  
    res.status(200).json({ message: "Event Deleted", result: deletedEvent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};