const express = require("express");
const cors = require("cors");
var cookieParser = require('cookie-parser');
const applicationRoutes = require("./routes/application.js");
const unitRoutes = require("./routes/unit.js");
const maintainenceRoutes = require("./routes/maintainence.js");
const contactRoutes = require("./routes/contact.js");
const commonRoutes = require("./routes/common.js");
const paymentRoutes = require("./routes/payment.js");
const tenantRoutes = require("./routes/tenant.js");
const requestRoutes = require("./routes/requests.js");
require('dotenv').config();
require("./conn");


const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors());
app.use("/application", applicationRoutes);
app.use("/unit", unitRoutes);
app.use("/maintainence", maintainenceRoutes);
app.use("/contact", contactRoutes);
app.use(commonRoutes);
app.use("/payment", paymentRoutes);
app.use("/tenant",tenantRoutes);
app.use("/request",requestRoutes);

app.get("/health", (req, res) => {
   res.send({
    message: "app server is running",
   })
})

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

