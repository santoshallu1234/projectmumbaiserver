const volunteerController = require('../controllers/volunteerController')
const eventController = require('../controllers/eventController')
const Volunteer = require('../models/Volunteer')
const express = require("express")
const router = express.Router();
const uploadPfp = require("../lib/multer_pfp");
// const handleFile = require("../middlewares/handleFile") 

router.post('/register', volunteerController.register)
router.get('/checkemail/:email', volunteerController.checkEmail)
router.get('/volunteer/:id', volunteerController.getVolunteer)
router.get('/volunteers', volunteerController.getAllVolunteers)
router.put('/editProfile/:id', uploadPfp.fields([{ name: 'pfp', maxCount: 1 }]), volunteerController.updateVolunteer)
router.delete('/removePfp/:id', volunteerController.removePfp)

router.get('/events', eventController.getAllEvents)
router.post('/registerForEvent', volunteerController.registerForEvent) //pass eventId and volunteerId through body


module.exports = router