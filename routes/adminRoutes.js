const eventController = require('../controllers/eventController')
const eventMiddleware = require('../middlewares/eventMiddleware')
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')

const Upload = require("../lib/multer_config");
const express = require("express")
const router = express.Router();

router.post('/event',auth, Upload.fields([{ name: 'banner', maxCount: 1 }]), eventMiddleware, eventController.createEvent)
router.put('/event/:id', auth, Upload.fields([{ name: 'banner', maxCount: 1 }]), eventMiddleware, eventController.updateEvent)
router.delete('/event/:id', auth, eventController.deleteEvent)
router.get('/eventDetail/:id',auth, eventController.getEventById)
router.post('/approveVolunteer', adminController.approveVolunteer)
router.post('/markAttended', adminController.markAttended)
router.post('/givePoints', adminController.givePoints)
router.post('/markEventAsCompleted', adminController.completeEvent)
router.get('/getRegisteredVolunteers', adminController.getRegisteredVolunteers)


module.exports = router