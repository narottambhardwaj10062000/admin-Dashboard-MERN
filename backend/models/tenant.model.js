const mongoose = require('mongoose');
const Application = require('./application.model.js'); // Import the Application model

const tenantSchema = new mongoose.Schema({
    // All the fields from applicationSchema
    ...Application.schema.obj,
    // Additional fields specific to the Tenant model if any
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
        unique: true,
    }
});

module.exports = mongoose.model('Tenant', tenantSchema);

// module.exports = Tenant;