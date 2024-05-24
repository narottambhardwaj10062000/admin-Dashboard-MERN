const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Application = require("../models/application.model");
const Unit = require("../models/unit.model");
const Tenant = require("../models/tenant.model");
const Payment = require("../models/payment.model");
const moment = require("moment");

// create payment API
router.post("/create", async (req, res) => {
  try {
    const result = await Payment.create(req.body);

    res.status(200).json({ message: "Payments updated successfully", result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating payments", error });
  }
});

// Route to get all payments or filter by unitId
router.get("/all", async (req, res) => {
  const { unitId } = req.query;

  try {
    let payments;
    if (unitId) {
      // Find payments with the specified unitId
      payments = await Payment.find({ unitId: unitId });
    } else {
      // Find all payments
      payments = await Payment.find({});
    }

    const formattedPayments = payments.map((payment) => ({
      ...payment.toObject(),
      paymentDate: moment(payment.paymentDate).format("D MMM YYYY"),
    }));

    if (payments.length === 0) {
      return res.status(404).json({ message: "No payments found" });
    }

    res.status(200).json(formattedPayments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching payments", error });
  }
});

router.put("/edit/:unitId/payments/:paymentId", async (req, res) => {
  const { unitId, paymentId } = req.params;
  const editPaymentData = req.body;

  try {
    // Find the unit by ID
    const unit = await Unit.findById(unitId);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // Find the payment by ID and update it
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    Object.assign(payment, editPaymentData);
    await payment.save();

    res.json({ message: "payment successfully updated", payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


