const mongoose = require("mongoose");

const contactRequestSchema = new mongoose.Schema({
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
        required: true,
    },
    contactType: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    responsePreference: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("ContactRequest", contactRequestSchema);