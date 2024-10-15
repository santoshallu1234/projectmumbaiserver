const AdminEvent = require("../models/AdminEvent");
const Volunteer = require("../models/Volunteer");
exports.createAdminEvent = async (eventId) => {
  try {
    console.log(eventId);

    const isCreated = await AdminEvent.create({ eventId: eventId });
    return isCreated;
  } catch (error) {
    console.log(error);
    return error;
  }
};
exports.getEventById = async (req, res) => {
    try {
      const { id } = req.params; // Extract ID from URL parameters
      if (!id) {
        return res.status(404).json({ message: "Id not found" });
      }
      const event = await AdminEvent.findById(id); // Find the event by ID
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event retrieved", event: event });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
exports.approveVolunteer = async (req, res) => {
    try {
        const {volunteerId, eventId} = await req.body
        let message
        //checking if it already approved:
        const isApproved = await AdminEvent.find({eventId: eventId, approvedVolunteers: volunteerId})
        if (isApproved.length > 0) {
            message = "Volunteer is already approved"
        } else {
            message = "Successfully approved volunteer for the event"
        }

        const result = await AdminEvent.findOneAndUpdate({ eventId: eventId},  { $addToSet: { approvedVolunteers: volunteerId } }, {new : true})
        res.status(200).json({message: message, result: result});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
        
    }
}

exports.markAttended = async (req, res) => {
    try {
        const {volunteerId, eventId} = await req.body
        let message
        //checking if it already marked attended:
        const isApproved = await AdminEvent.find({eventId: eventId, attendedVolunteers: volunteerId})
        if (isApproved.length > 0) {
            message = "Volunteer is already marked attended"
        } else {
            message = "Successfully marked the volunteer as attended for the event"
        }

        const result = await AdminEvent.findOneAndUpdate({ eventId: eventId},  { $addToSet: { attendedVolunteers: volunteerId } }, {new : true})
        res.status(200).json({message: message, result: result});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
        
    }
}

exports.givePoints = async (req,res) => {
    try {
        const {volunteerId, eventId, points} = await req.body
        let message
        let result

        const isPresent = await AdminEvent.find({eventId: eventId, "points.volunteerId":volunteerId})
        // console.log(isPresent)
        if (isPresent.length > 0) {
            // console.log("He has some points, updating...")
            message = "He has some points, updating..."
            result = await AdminEvent.findOneAndUpdate({ eventId: eventId, "points.volunteerId": volunteerId},  { $set: { "points.$.points": points } }, {new: true})
        } else {
            // console.log("He has no points yet, giving...")
            message = "He has no points yet, giving..."
             result = await AdminEvent.findOneAndUpdate({ eventId: eventId},  { $addToSet: { points: { volunteerId: volunteerId, points: points} } }, {new : true})
        }

        res.status(200).json({message: message, result: result});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
        
    }
}

exports.completeEvent = async (req,res)=> {
    try {
        const { eventId } = req.body
        if (!eventId) {
            res.status(400).json({message: "Incorrect event Id"})
        } else {

            const isUpdated = await AdminEvent.findOneAndUpdate({ eventId: eventId}, { $set: { isCompleted: true } }, {new : true})
            // console.log(isUpdated)
            if (isUpdated) {
                res.status(200).json({message: "Successfully marked the event as completed", result: isUpdated} )
            } else {
                res.status(500).json({message: "Error when marking event as completed :(", result: isUpdated} )
            }
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

exports.getRegisteredVolunteers = async (req, res)=> {
    try {
        const {eventId} = req.body
        const adminevent = await AdminEvent.findOne({eventId: eventId})

        if (!adminevent){
            res.status(400).json({message: "couldnt find the event", result: adminevent})
        }else {
        // console.log(adminevent.registeredVolunteers) 

        const result = await Volunteer.find({_id: { $in: adminevent.registeredVolunteers}})
        res.status(200).json({message: "Success", result: result})

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

