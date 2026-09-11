const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    package: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["Full-Time", "Internship"],
      default: "Full-Time",
    },

    category: {
      type: String,
      enum: ["Dream", "Mass"],
      default: "Mass",
    },

    deadline: {
      type: Date,
      required: true,
    },

    openings: {
      type: Number,
      default: 1,
    },

    minimumCGPA: {
      type: Number,
      default: 0,
    },

    allowedBranches: {
      type: [String],
      default: [],
    },

    maximumBacklogs: {
      type: Number,
      default: 0,
    },

    tenthPercentage: {
      type: Number,
      default: 0,
    },

    twelfthPercentage: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Drive", driveSchema);
