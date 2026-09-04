const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },

        documentType: {
            type: String,
            required: true
        },

        fileName: String,

        filePath: {
            type: String,
            required: true
        },

        verificationStatus: {
            type: String,
            enum: [
                "pending",
                "verified",
                "rejected"
            ],
            default: "pending"
        },

        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        verifiedAt: Date
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Document",
    documentSchema
);