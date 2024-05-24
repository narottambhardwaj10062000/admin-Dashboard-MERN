const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Application = require("../models/application.model");
const Unit = require("../models/unit.model");
const Tenant = require("../models/tenant.model");
const ContactRequest = require("../models/contactrequest.model");
const MaintainenceRequest = require("../models/maintainencerequest.model");
const Payment = require("../models/payment.model");

// <----------------- Get Count of Maintainence and Contact Requests ------------------------->
router.get("/api/count-requests", async (req, res) => {
  try {
    // Count the number of records in MaintainenceRequest
    const maintainenceRequestCount = await MaintainenceRequest.countDocuments();

    // Count the number of records in ContactRequest
    const contactRequestCount = await ContactRequest.countDocuments();

    const applicationRequestCount = await Application.countDocuments();

    // Send the counts in the response
    res.status(200).json({
      data: {
        maintainenceRequestCount,
        contactRequestCount,
        applicationRequestCount,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Utility function to get the start and end dates of the current month
const getCurrentMonthDateRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start, end };
};

// Utility function to get the current month's name
const getCurrentMonthName = () => {
  const now = new Date();
  return now.toLocaleString("default", { month: "long" });
};

// API endpoint to get total due amount for all units
router.get("/api/due-amount", async (req, res) => {
  const { start, end } = getCurrentMonthDateRange();
  const currentMonth = getCurrentMonthName();

  try {
    const units = await Unit.find(); // Fetch all units
    const results = [];

    for (const unit of units) {
      const payments = await Payment.find({
        unitId: unit._id,
        paymentDate: { $gte: start, $lte: end },
      });

      const totalDueAmount = payments.reduce(
        (total, payment) => total + payment.balance,
        0
      );

      if (totalDueAmount > 0) {
        results.push({
          unitId: unit._id,
          unitName: unit.unitName, // Assuming units have a 'name' field
          totalDueAmount,
          currentMonth,
        });
      }
    }

    res.json(results);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
