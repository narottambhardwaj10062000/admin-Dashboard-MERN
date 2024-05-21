const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Application = require("../models/application.model") ;
const Unit = require("../models/unit.model");
const Tenant = require("../models/tenant.model");
const ContactRequest = require("../models/contactrequest.model");

// <----------------- Get All Contact Requests -------------------------->
router.get('/all', async (req, res) => {
    try {
        const result = await ContactRequest.find({});

        const newResult = await Promise.all(result.map(async (app) => {
            const unit = await Unit.findOne({ _id: app.unitId }, { _id: 0, unitName: 1 });
            return {
                ...app.toObject(),
                unitName: unit ? unit.unitName : null
            };
        }));

        if (newResult.length) {
            res.status(200).json({
                allContactRequests: newResult,
            });
        } else {
            res.status(400).json({
                message: "No Contact Requests found",
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;