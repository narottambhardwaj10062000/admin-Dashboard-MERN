const mongoose = require("mongoose");

mongoose.connect(process.env.DB)
    .then(() => { console.log("DB connected") })
    .catch((error) => { console.log(error) });