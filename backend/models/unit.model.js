const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  unitName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Unit", unitSchema);
