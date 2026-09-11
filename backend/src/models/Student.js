const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },

    rollNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },

    dateOfBirth: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "Computer Science & Engineering",
    },

    semester: {
      type: Number,
      default: 8,
    },

    cgpa: {
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

    activeBacklogs: {
      type: Number,
      default: 0,
    },

    bio: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    projects: {
      type: [String],
      default: [],
    },

    certifications: {
      type: [String],
      default: [],
    },

    resume: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Student", studentSchema);
