const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    drive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drive",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Interview",
        "Offer",
        "Rejected",
        "On Hold",
      ],
      default: "Applied",
    },

    coverLetter: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

applicationSchema.index(
  {
    student: 1,
    drive: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("Application", applicationSchema);
