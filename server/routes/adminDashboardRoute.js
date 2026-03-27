const express = require("express");
const { getDashboardStats , getRecentBookings  } = require("../controllers/adminDashboardController");
const router = express.Router();

router.get("/stats",getDashboardStats)
router.get("/recentBooking",getRecentBookings)

module.exports = router;