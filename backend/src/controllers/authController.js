const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

const generateToken = require("../utils/jwt");


const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role,
            rollNumber,
            branch
        } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message:
                    "Name, email and password are required"
            });
        }

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message:
                    "Email already registered"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "student"
        });

        if (user.role === "student") {

            await Student.create({
                userId: user._id,
                rollNumber,
                branch
            });

        }

        if (user.role === "admin") {

            await Admin.create({
                userId: user._id
            });
        }

        const token =
            generateToken(user);

        res.status(201).json({

            message:
                "Registration successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }

        const validPassword =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!validPassword) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }

        const token =
            generateToken(user);

        res.json({

            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    register,
    login
};