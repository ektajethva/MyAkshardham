const express = require("express")
const { getUserDashboardStats, getCrowdStatus } = require("../controllers/userstatsController")
const router = express.Router()

router.get("/dashboard/:user_id", getUserDashboardStats)
router.get("/crowd/:date",getCrowdStatus)

module.exports = router