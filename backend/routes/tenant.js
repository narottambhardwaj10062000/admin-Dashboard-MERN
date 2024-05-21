const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Application = require("../models/application.model") ;
const Unit = require("../models/unit.model");


router.use(express.json());






module.exports = router;