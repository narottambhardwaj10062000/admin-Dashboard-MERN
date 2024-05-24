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
    charges: {
        type: Number,
    },
    amountPaid: {
        type: Number,
    },
    balance: {
        type: Number,
    }
});



module.exports = mongoose.model("Payment", paymentSchema);