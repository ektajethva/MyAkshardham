const express = require("express")
const { addProduct ,  updateProduct , deleteProduct , getProduct } = require("../controllers/productController")
const router = express.Router()

router.get("/getPro",getProduct);
router.post("/addPro",addProduct);
router.put("/updatePro/:product_id",updateProduct);
router.delete("/deletePro/:product_id",deleteProduct);

module.exports = router;