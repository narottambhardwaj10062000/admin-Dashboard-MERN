const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }

});



module.exports = mongoose.model("Payment", paymentSchema);