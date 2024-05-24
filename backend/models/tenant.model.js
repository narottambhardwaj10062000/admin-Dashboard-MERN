const mongoose = require("mongoose");
const Application = require("./application.model.js"); 

const documentSchema = new mongoose.Schema({
  identification: {
    type: String,
  },
  electricityBill: {
    type: String,
  },
  gasAccount: {
    type: String,
  },
});

const tenantSchema = new mongoose.Schema({
  // All the fields from applicationSchema
  ...Application.schema.obj,

  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit",
    unique: true,
    required: true,
  },
  documents: {
    documentSchema,
  },
});

module.exports = mongoose.model("Tenant", tenantSchema);

