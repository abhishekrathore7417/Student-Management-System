const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

//CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api", studentRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});