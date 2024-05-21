const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const MaintainenceRequest = require("../models/maintainencerequest.model");
const Unit = require("../models/unit.model");


// <----------------- Get All Maintainence Requests -------------------------->
router.get('/all', async (req, res) => {
    try {
        const result = await MaintainenceRequest.find({});

        const newResult = await Promise.all(result.map(async (app) => {
            const unit = await Unit.findOne({ _id: app.unitId }, { _id: 0, unitName: 1 });
            return {
                ...app.toObject(),
                unitName: unit ? unit.unitName : null
            };
        }));

        if (newResult.length) {
            res.status(200).json({
                allMaintainenceRequests: newResult,
            });
        } else {
            res.status(404).json({
                message: "No Maintainence Requests found",
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;