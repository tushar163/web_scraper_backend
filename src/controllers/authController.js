const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
};

const sendAuthResponse = (res, statusCode, user) => {
    res.status(statusCode).json({
        status: statusCode,
        success: true,
        token: createToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            bookmarks: user.bookmarks,
        },
    });
};

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Name, email, and password are required",
                });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "User already exists",
                });
            }
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            });

            sendAuthResponse(res, 201, user);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required",
                });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    status: res.statusCode,
                    success: false,
                    message: "user not found",
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials",
                    status: res.statusCode,
                });
            }
            

            sendAuthResponse(res, 200, user);
        } catch (error) {
            res.status(500).json({
                success: false,
                status: res.statusCode,
                message: error.message,
            });
        }
    },
}
