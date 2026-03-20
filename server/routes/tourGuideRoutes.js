const express = require("express");
const { addGuide, updateGuide, deleteGuide, getGuides } = require("../controllers/tourGuideController");
const router = express.Router();

router.get("/getGuides", getGuides);
router.post("/addGuide", addGuide);
router.put("/updateGuide/:guide_id", updateGuide);
router.delete("/deleteGuide/:guide_id", deleteGuide);

module.exports = router;