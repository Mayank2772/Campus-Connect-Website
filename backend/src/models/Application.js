const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },

        driveId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drive",
            required: true
        },

        status: {
            type: String,
            enum: [
                "applied",
                "under_review",
                "shortlisted",
                "interview",
                "selected",
                "rejected"
            ],
            default: "applied"
        },

        appliedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// A student should not apply to the same drive twice
applicationSchema.index(
    {
        studentId: 1,
        driveId: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model(
    "Application",
    applicationSchema
);