const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Unit = require("../models/unit.model") ;

router.use(express.json());

// <----------------- Get All Units -------------------------->
router.get('/all', async (req, res) => {
    try {
        const result = await Unit.find({});
        if (result) {
            res.status(200).json({
                allUnits: result,
            });
        } else res.status(400).json({
            message: "no Units found",
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;