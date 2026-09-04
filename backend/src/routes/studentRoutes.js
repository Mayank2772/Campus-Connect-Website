const express = require("express");

const router = express.Router();

const protect =
    require("../middleware/authMiddleware");

const authorize =
    require("../middleware/roleMiddleware");

const {
    getProfile,
    updateProfile
} =
    require("../controllers/studentController");


router.get(
    "/profile",
    protect,
    authorize("student"),
    getProfile
);


router.put(
    "/profile",
    protect,
    authorize("student"),
    updateProfile
);


module.exports = router;