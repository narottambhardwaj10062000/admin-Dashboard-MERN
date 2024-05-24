const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Application = require("../models/application.model") ;
const Unit = require("../models/unit.model");
const Tenant = require("../models/tenant.model");

router.put('/document/:id', async (req, res) => {
    const tenantId = req.params.id;
    const documents = req.body;

    try {
        const tenant = await Tenant.findById(tenantId);

        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        tenant.documents = documents;
        await tenant.save();

        res.status(200).json({ message: 'Documents updated successfully', tenant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.use(express.json());

module.exports = router;