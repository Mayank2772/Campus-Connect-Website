const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const {
  applyToDrive,
  getMyApplications,
} = require("../controllers/applicationController");

router.post("/apply/:driveId", protect, authorize("student"), applyToDrive);

router.get("/my", protect, authorize("student"), getMyApplications);

module.exports = router;
