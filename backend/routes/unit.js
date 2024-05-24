const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Unit = require("../models/unit.model");
const Tenant = require("../models/tenant.model");
const MaintainenceRequest = require("../models/maintainencerequest.model");
const Payment = require("../models/payment.model");

router.use(express.json());

// Add new Unit API
router.post("/", async (req, res) => {
  const { tenantId, unitName, address, rent, image } = req.body;

  try {
    const newUnit = new Unit({
      tenantId,
      unitName,
      address,
      rent,
      image,
    });

    const savedUnit = await newUnit.save();

    res.status(201).json(savedUnit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// <----------------- Get All Units -------------------------->
router.get("/all", async (req, res) => {
  try {
    // Find all units
    const units = await Unit.find({});

    // Use Promise.all to fetch tenant information for each unit
    const unitsWithTenantInfo = await Promise.all(
      units.map(async (unit) => {
        const tenant = await Tenant.findOne(
          { _id: unit.tenantId },
          { _id: 0, personalInformation: 1 }
        );
        return {
          ...unit.toObject(),
          personalInformation: tenant ? tenant.personalInformation : null,
        };
      })
    );

    // Check if unitsWithTenantInfo is empty
    if (unitsWithTenantInfo.length > 0) {
      res.status(200).json({
        allUnits: unitsWithTenantInfo,
      });
    } else {
      res.status(400).json({
        message: "No units found",
      });
    }
  } catch (error) {
    console.error("Error fetching units:", error);
    res.status(500).json({
      message: "An error occurred while fetching units",
      error: error.message,
    });
  }
});

// <----------------- Get Single Unit Detail -------------------------->
router.get("/:unitId", async (req, res) => {
  try {
    const unitId = req.params.unitId;

    // Find the unit by ID
    const unit = await Unit.findById(unitId);

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // Initialize tenant and occupants as null/empty
    let tenant = null;
    let occupants = [];

    // Check if tenantId exists and populate tenant details if it does
    if (unit.tenantId) {
      tenant = await Tenant.findById(unit.tenantId);
      occupants = tenant ? tenant.otherOccupants : [];
    }

    // Get all maintenance requests for this unit
    const maintainenceRequests = await MaintainenceRequest.find({
      unitId: req.params.unitId,
    });

    res.status(200).json({
      unit,
      tenant,
      maintainenceRequests,
      occupants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// due payment of current month
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
  return now.toLocaleString('default', { month: 'long' });
};



router.get("/due-amount/:unitId", async (req, res) => {
  const { unitId } = req.params;
  const { start, end } = getCurrentMonthDateRange();
  const currentMonth = getCurrentMonthName();

  try {
    const payments = await Payment.find({
      unitId: unitId,
      paymentDate: { $gte: start, $lte: end },
    });

    const totalDueAmount = payments.reduce(
      (total, payment) => total + payment.balance,
      0
    );

    res.status(200).json({ totalDueAmount, currentMonth });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
