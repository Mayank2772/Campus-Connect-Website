const Drive = require("../models/Drive");
const Student = require("../models/Student");

const checkEligibility = require("../services/eligibilityService");

const createDrive = async (req, res) => {
  try {
    const drive = await Drive.create({
      ...req.body,

      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Placement drive created",
      drive,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDrives = async (req, res) => {
  try {
    const drives = await Drive.find().sort({
      deadline: 1,
    });

    res.json(drives);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDriveById = async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);

    if (!drive) {
      return res.status(404).json({
        message: "Drive not found",
      });
    }

    res.json(drive);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const checkStudentEligibility = async (req, res) => {
  try {
    const student = await Student.findOne({
      userId: req.user.id,
    });

    const drive = await Drive.findById(req.params.id);

    if (!student || !drive) {
      return res.status(404).json({
        message: "Student or drive not found",
      });
    }

    const result = checkEligibility(student, drive);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateDrive = async (req, res) => {
  try {
    const drive = await Drive.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
        runValidators: true,
      },
    );

    if (!drive) {
      return res.status(404).json({
        message: "Drive not found",
      });
    }

    res.json({
      message: "Drive updated",
      drive,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteDrive = async (req, res) => {
  try {
    const drive = await Drive.findByIdAndDelete(req.params.id);

    if (!drive) {
      return res.status(404).json({
        message: "Drive not found",
      });
    }

    res.json({
      message: "Drive deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createDrive,
  getDrives,
  getDriveById,
  checkStudentEligibility,
  updateDrive,
  deleteDrive,
};
