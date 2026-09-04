const Student = require("../models/Student");

const getProfile = async (
    req,
    res
) => {

    try {

        const student =
            await Student
                .findOne({
                    userId: req.user.id
                })
                .populate(
                    "userId",
                    "name email role"
                );

        if (!student) {

            return res.status(404).json({
                message:
                    "Student profile not found"
            });
        }

        res.json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const updateProfile = async (
    req,
    res
) => {

    try {

        const student =
            await Student.findOneAndUpdate(

                {
                    userId: req.user.id
                },

                req.body,

                {
                    new: true,
                    runValidators: true
                }
            );

        if (!student) {

            return res.status(404).json({
                message:
                    "Student profile not found"
            });
        }

        res.json({
            message:
                "Profile updated successfully",
            student
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    getProfile,
    updateProfile
};