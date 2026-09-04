const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true
        },

        jobRole: {
            type: String,
            required: true
        },

        package: {
            type: String
        },

        location: {
            type: String
        },

        description: {
            type: String
        },

        eligibility: {
            minimumCGPA: {
                type: Number,
                default: 0
            },

            maximumBacklogs: {
                type: Number,
                default: 0
            },

            eligibleBranches: {
                type: [String],
                default: []
            }
        },

        deadline: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["draft", "active", "closed"],
            default: "active"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Drive", driveSchema);