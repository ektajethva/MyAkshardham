const express = require("express")
const { add_Visit_Booking , add_Seva_Booking , add_Parking_Booking , add_Tour_Guide_Booking } = require("../controllers/bookingController")
const router = express.Router()

router.post("/addVisit",add_Visit_Booking)
router.post("/addSeva",add_Seva_Booking)
router.post("/addParking", add_Parking_Booking)
router.post("/addTourBooking",add_Tour_Guide_Booking)

module.exports = router