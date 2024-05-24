const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Application = require("../models/application.model") ;
const Unit = require("../models/unit.model");
const Tenant = require("../models/tenant.model");


router.use(express.json());

// <----------------- Get All Applications -------------------------->

router.get('/all', async (req, res) => {
    try {
        const result = await Application.find({});

        const newResult = await Promise.all(result.map(async (app) => {
            const unit = await Unit.findOne({ _id: app.unitId }, { _id: 0, unitName: 1 });
            return {
                ...app.toObject(), // Convert mongoose document to plain object
                unitName: unit ? unit.unitName : null
            };
        }));

        if (newResult.length) {
            res.status(200).json({
                allApplications: newResult,
            });
        } else {
            res.status(400).json({
                message: "No applications found",
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// <----------------- Get Single Application Detail ------------------>
router.get('/:requestId', async (req, res) => {
    try {
        const result = await Application.findOne({ _id: req.params.requestId });

        if (result)
            res.status(200).json({ applicationDetail: result });
        else
            res.status(400).json({ message: 'Application details not found' });

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

// <--------------------------- Approve Application -------------------->
router.post('/approve/:applicationId', async (req, res) => {
    try {
        const app = await Application.findOne({ _id: req.params.applicationId });
        // console.log(app);

        const isalreadyPresent = await Tenant.find({unitId: app.unitId});

        if(isalreadyPresent.length === 0) {

            // Create a new tenant document with the application data
            const newTenant = new Tenant({
                unitId: app.unitId,
                requestDate: app.requestDate,
                personalInformation: app.personalInformation,
                addressInformation: app.addressInformation,
                presentEmployerInfo: app.presentEmployerInfo,
                otherOccupants: app.otherOccupants,
                referredBy: app.referredBy,
                petsInformation: app.petsInformation,
                wasEarlierEvicted: app.wasEarlierEvicted,
                hasCriminalRecord: app.hasCriminalRecord,
                proofOfIncome: app.proofOfIncome
            });

            // Save the new tenant document
            await newTenant.save();

            const unit = await Unit.findOne({ _id: app.unitId });
            
            unit.tenantId = newTenant._id;
            await unit.save();

            // Delete the application document
            await Application.findByIdAndDelete(req.params.applicationId);

            res.status(200).json({
                message: "Unit Successfully alloted",
            })

        }
        else {
            res.status(409).json({
                message: "Unit already Alloted",
            })
        }

    } catch ( error ) {
        console.log(error)
        res.status(500).send(error)
    }
})


module.exports = router;
