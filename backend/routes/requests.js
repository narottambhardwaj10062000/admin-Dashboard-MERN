const express = require('express');
const nodemailer = require('nodemailer');
const Tenant = require('../models/tenant.model'); 
const Unit = require("../models/unit.model"); 

const router = express.Router();

// Configure the nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: "write your email", 
        pass: "write your email app password",
    },
});

router.post('/documents/:tenantId', async (req, res) => {
    const { tenantId } = req.params;

    try {
        // Fetch tenant details
        const tenant = await Tenant.findById(tenantId);

        if (!tenant) {
            return res.status(404).json({ error: 'Tenant not found' });
        }

        // Create the email content
        const mailOptions = {
            from: 'write your email',
            to: tenant.personalInformation.email, 
            subject: 'Document Submission Request',
            text: `Dear ${tenant.personalInformation.firstName},\n\nPlease submit the required documents at your earliest convenience.\n\nThank you!`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Document request email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

router.post('/alert/:unitId', async (req, res) => {
    const { unitId } = req.params;
    // console.log(unitId);
    const {month, amount} = req.body;

    try {
        // Fetch tenant details
        const unit = await Unit.findOne({ _id: unitId })

        if(!unit) {
            res.status(404).json({message: "Unit Not Found"});
        }

        const tenant = await Tenant.findOne({_id: unit.tenantId});

        if (!tenant) {
            return res.status(404).json({ error: 'Tenant not found' });
        }

        // Create the email content
        const mailOptions = {
            from: 'narottam220@gmail.com',
            to: tenant.personalInformation.email, 
            subject: 'Payment Due Alert',
            text: `Dear ${tenant.personalInformation.firstName},\n\nPlease clear your dues of $${amount} for month ${month} as soon as possible.\n\nThank you!`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Payment alert mail sent successfully' });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

module.exports = router;
