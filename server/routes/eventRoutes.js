const express = require("express")
const { addEvent ,  updateEvent , deleteEvent , getEvents , getEvent, participateEvent } = require("../controllers/eventController")
const router = express.Router()

router.get("/get/:event_id", getEvent)
router.get("/getEvents",getEvents);
router.post("/addEvent",addEvent);
router.put("/updateEvent/:event_id",updateEvent);
router.delete("/deleteEvent/:event_id",deleteEvent);
router.post("/participate", participateEvent);

module.exports = router;