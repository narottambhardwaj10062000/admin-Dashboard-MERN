const mongoose = require("mongoose");

const personalInformationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    }, 
    lastName: {
        type: String,
        required: true,
    }, 
    homeTelephone: {
        type: Number,
        required: true,
    },
    workTelephone: {
        type: Number,
    },
    cellTelephone: {
        type: Number,
    },
    email: {
        type: String,
    }, 
    SIN:{
        type: String,
    },
    dob: {
        type: String,
        required: true,
    },
    maritalStatus: {
        type: String,
    }
});

const addressInformationSchema = new mongoose.Schema({
    streetAddress: {
        type: String,
    }, 
    city: {
        type: String,
    }, 
    province: {
        type: String,
    },
    country: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    landlord: {
        type: String,
        default: "John Doe",
    },
    landlordsContact: {
        type: String,
        default: "+91 8765432345",
    },
    howLong: {
        type: Number,
    },
    reasonForLeaving: {
        type: String,
    }
    
});

const presentEmployerInformationSchema = new mongoose.Schema({
    companyName: {
        type: String,
    }, 
    companyAddress: {
        type: String,
    }, 
    supervisor: {
        type: String,
    }, 
    companyPhone: {
        type: String,
    },
    yearsEmployed: {
        type: Number,
    },
    approxSalary: {
        type: Number,
    },
    position: {
        type: String,
    }
})

const otherOccupantSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    relationship: {
        type: String,
    }
})

const referredSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    }
})

const petsInformationSchema = new mongoose.Schema({
    breed: {
        type: String,
    },
    weight: {
        type: Number,
    },
    sex: {
        type: String,
    }
})

const applicationSchema = new mongoose.Schema({
    // unitName: {
    //     type: String,
    //     required: true,
    // },
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    requestDate: {
        type: Date,
        required: true,
    },
    personalInformation: personalInformationSchema,
    addressInformation: addressInformationSchema,
    presentEmployerInfo: presentEmployerInformationSchema,
    otherOccupants: [otherOccupantSchema],
    referredBy: referredSchema,
    petsInformation: petsInformationSchema,
    wasEarlierEvicted: {
        type: Boolean,
        required: true,
    },
    hasCriminalRecord: {
        type: Boolean,
        required: true,
    },
    proofOfIncome: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Application", applicationSchema);