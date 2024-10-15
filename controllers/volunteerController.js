const Volunteer  = require('../models/Volunteer')
const Registration = require('../models/Registration')
const AdminEvent = require('../models/AdminEvent')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;
const path = require('path')
const fs = require('fs')


exports.register = async (req, res)=> {
    
    try {
        const volunteer = new Volunteer(req.body)
        const result = await volunteer.save()
        console.log("result: ",result)
                
        res.status(200).json({message: "Successfully Registered!", result: result})
    } catch (error) {
        console.log("error while registering volunteer : ",error)
        res.status(500).json({message: "Error occured, check server logs", result: error})
        
    }
}
exports.checkEmail = async (req, res) => {
    const email = req.params.email;
    console.log(email)
    try {
      const volunteer = await Volunteer.findOne({ email });
      if (volunteer) {
        console.log("exists",volunteer)
        return res.json({ exists: true,isAdmin: volunteer.isAdmin ,id: volunteer._id });
      } else {
        return res.json({ exists: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.getVolunteer = async (req, res)=> {
    try {
        const id = new ObjectId(req.params.id)
        const result =  await Volunteer.findOne({_id: id})
                
        res.status(200).json({message: "OK!", result: result})
        
    } catch (error) {
        console.log("Error in getAllVolunteers: ", error)
        res.status(500).json({message: error.message, result: error})
    }
}

exports.getAllVolunteers = async (req, res)=> {
    try {
        const result =  await Volunteer.find()
                
        res.status(200).json({message: "OK!", result: result})
        
    } catch (error) {
        console.log("Error in getAllVolunteers: ", error)
        res.status(500).json({message: error.message, result: error})
    }
}

exports.updateVolunteer = async (req, res) => {
  try {

    const id = new ObjectId(req.params.id)
    const doc = await Volunteer.findById(id)
    // console.log(doc)
    const prevFile = doc.pfp

    // console.log(req.files)

    if (!req.files) {
      console.log("No file specified")
      req.body.pfp = null
    } else {
      console.log("Filename: ", req.files.pfp[0].filename)
      console.log("path: ", req.files.pfp[0].path)
      req.body.pfp = req.files.pfp[0].filename

      //deleting prev file
      if (doc && prevFile) {
        const oldFilePath = path.join(__dirname, "../public", "volunteer/pfps", prevFile); // Adjust path if necessary
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Deletes the old file
          console.log("Old File deleted:", prevFile);
        }
      } else {
         console.log("No previous file or doc found")
      }

    }    

    const data = await req.body

    const result = await Volunteer.findByIdAndUpdate({_id: id}, data, {new: true})
    res.status(200).json({message: "OK!", result: result})

  } catch (error) {
    console.log("Error while updating profile: ", error)
        res.status(500).json({message: error.message, result: error})
  }
}

exports.registerForEvent = async (req, res) => {
  try {
    const { eventId, volunteerId } = await req.body
    if (!eventId || !volunteerId) {
      res.status(400).json({message: "Event Id and Volunteer Id must be provided"})
    } else {

      let message
      //checking if it already registered:
      const isRegistered = await AdminEvent.find({eventId: eventId, registeredVolunteers: volunteerId})
      if (isRegistered.length > 0) {
          message = "You are already registered!"
      } else {
          message = "You are registered successfully!"
      }
      const result = await AdminEvent.findOneAndUpdate({eventId: eventId}, { $addToSet: { registeredVolunteers: volunteerId } }, {new: true})
  
      res.status(200).json({message: message, result: result})
    }
    
  } catch (error) {
    console.log("Error in Registering Volunteer for the event: ", error)
        res.status(500).json({message: error.message, result: error})
  }
}

exports.removePfp = async (req, res)=> {
  try {
    const id = new ObjectId(req.params.id)
    const doc = await Volunteer.findById(id)
    // console.log(doc)
    const prevFile = doc.pfp
    if (prevFile) {
      const oldFilePath = path.join(__dirname, "../public", "volunteer/pfps", prevFile); // Adjust path if necessary
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Deletes the old file
          console.log("PFP deleted:", prevFile);
          res.status(200).json({message: "PFP deleted:", filename: prevFile})
        } else {
          console.log("No previous pfp or doc found")
          res.status(200).json({message: "No Pfp to delete:"}) 
        }
      } else {
         console.log("No previous pfp or doc found")
         res.status(200).json({message: "No Pfp to delete:"})
      }
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Error while removing pfp", error: error.message})
  }

}