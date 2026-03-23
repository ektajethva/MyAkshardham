const express = require("express")
const { addDonation , add_Product_payment , add_Payment_Items } = require("../controllers/paymentController")
const router = express.Router()

router.post("/addDonation",addDonation);
router.post("/add_Product_Payment",add_Product_payment);
router.post("/add_Product_Items",add_Payment_Items)

module.exports = router;