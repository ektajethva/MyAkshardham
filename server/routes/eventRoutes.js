const express = require("express")
const { addEvent ,  updateEvent , deleteEvent , getEvent } = require("../controllers/eventController")
const router = express.Router()

router.get("/getEvents",getEvent);
router.post("/addEvent",addEvent);
router.put("/updateEvent/:event_id",updateEvent);
router.delete("/deleteEvent/:event_id",deleteEvent);

module.exports = router;