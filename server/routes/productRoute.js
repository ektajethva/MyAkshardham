const express = require("express")
const { addProduct ,  updateProduct , deleteProduct , getProduct, getAllOrder, updateOrderStatus, getUserOrder } = require("../controllers/productController")
const router = express.Router()

router.get("/getPro",getProduct);
router.post("/addPro",addProduct);
router.put("/updatePro/:product_id",updateProduct);
router.delete("/deletePro/:product_id",deleteProduct);
router.get("/allOrders",getAllOrder)
router.put("/updateOrderStatus/:id",updateOrderStatus)
router.get("/getUserOrder/:user_id",getUserOrder)

module.exports = router;