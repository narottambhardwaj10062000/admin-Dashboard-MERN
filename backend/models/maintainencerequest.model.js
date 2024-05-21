const mongoose = require("mongoose");

const MaintainenceRequestSchema = new mongoose.Schema({

    // unitId

    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
        required: true,
    },
    contactPreference: {
        type: String,
        required: true,
    },
    ownsPet: {
        type: Boolean,
        required: true,
    },
    entryNote: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    issueLocation: {
        type: String,
        required: true,
    },
    problem: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    preferredDate: {
        type: Date,
        required: true,
    },
    prefferedTime: {
        type: Date,
        required: true,
    }

});

module.exports = mongoose.model("MaintainenceRequest", MaintainenceRequestSchema);

