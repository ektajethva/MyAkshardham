const express = require("express")
const cors = require("cors")
require('dotenv').config()

const Razorpay = require("razorpay")

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Backend is running");
})

app.use("/auth",require("./routes/authRoutes"))
app.use("/Product",require("./routes/productRoute"))
app.use("/Guide",require("./routes/tourGuideRoutes"))
app.use("/booking",require("./routes/bookingRoute"))
app.use("/payment",require("./routes/paymentRoute"))
app.use("/user",require("./routes/userstatsRoute"))
app.use("/Event",require("./routes/eventRoutes"))
app.use("/admin",require("./routes/adminDashboardRoute"))

app.listen(5000,()=>{
    console.log('Server running on 5000')
})