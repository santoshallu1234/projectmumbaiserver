const volunteerRouter = require('../routes/volunteerRoutes')
const { sendOtp } = require('../controllers/otpverificationController');
const adminRoutes = require('../routes/adminRoutes')

const express = require("express")

const router = express.Router();

router.get('/', (req, res)=> {
    res.send("hello world!")
})
router.post('/sendOtp',sendOtp);
router.use('/volunteer' ,volunteerRouter)
router.use('/admin' ,adminRoutes);


module.exports = router;

