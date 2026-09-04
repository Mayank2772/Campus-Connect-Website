const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        rollNumber: {
            type: String,
            unique: true,
            sparse: true
        },

        phone: String,

        branch: String,

        year: Number,

        cgpa: {
            type: Number,
            default: 0
        },

        backlogs: {
            type: Number,
            default: 0
        },

        tenthPercentage: Number,

        twelfthPercentage: Number,

        skills: [String],

        projects: [
            {
                title: String,
                description: String,
                technologies: [String]
            }
        ],

        certifications: [
            {
                name: String,
                issuer: String,
                year: Number
            }
        ],

        resume: {
            fileName: String,
            filePath: String,
            uploadedAt: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Student", studentSchema);