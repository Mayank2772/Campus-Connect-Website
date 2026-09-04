const Application = require("../models/Application");

const Student = require("../models/Student");

const Drive = require("../models/Drive");

const checkEligibility = require("../services/eligibilityService");

const applyToDrive = async (req, res) => {
  try {
    const student = await Student.findOne({
      userId: req.user.id,
    });

    const drive = await Drive.findById(req.params.driveId);

    if (!student || !drive) {
      return res.status(404).json({
        message: "Student or drive not found",
      });
    }

    // Check eligibility
    const eligibility = checkEligibility(student, drive);

    if (!eligibility.eligible) {
      return res.status(400).json({
        message: "You are not eligible",
        reason: eligibility.reason,
      });
    }

    // Check duplicate application
    const existing = await Application.findOne({
      studentId: student._id,
      driveId: drive._id,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already applied to this drive",
      });
    }

    const application = await Application.create({
      studentId: student._id,

      driveId: drive._id,
    });

    res.status(201).json({
      message: "Application submitted successfully",

      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const student = await Student.findOne({
      userId: req.user.id,
    });

    const applications = await Application.find({
      studentId: student._id,
    })
      .populate("driveId")
      .sort({
        createdAt: -1,
      });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyToDrive,
  getMyApplications,
};
