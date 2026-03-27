const express = require("express")
const { add_Visit_Booking , add_Seva_Booking , add_Parking_Booking , add_Tour_Guide_Booking, getAllBooking, updateBooking, fetchUserBooking } = require("../controllers/bookingController")
const router = express.Router()

router.post("/addVisit",add_Visit_Booking)
router.post("/addSeva",add_Seva_Booking)
router.post("/addParking", add_Parking_Booking)
router.post("/addTourBooking",add_Tour_Guide_Booking)
router.get("/allBooking/:type",getAllBooking)
router.put("/updateStatus/:type/:id",updateBooking)
router.get("/userBooking/:type/:user_id",fetchUserBooking)




module.exports = router