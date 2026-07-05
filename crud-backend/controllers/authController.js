const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// REGISTER
const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    userModel.findUserByEmail(email, async (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = { name, email, password: hashedPassword };

            userModel.createUser(newUser, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Registration failed", error: err });
                }

                res.status(201).json({
                    message: "Registration successful",
                    userId: result.insertId
                });
            });
        } catch (error) {
            return res.status(500).json({ message: "Password hashing failed", error });
        }
    });
};

// LOGIN
const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    userModel.findUserByEmail(email, async (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];

        try {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            return res.status(500).json({ message: "Login failed", error });
        }
    });
};

module.exports = {
    registerUser,
    loginUser
};