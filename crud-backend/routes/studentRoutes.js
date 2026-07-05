const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const verifyToken = require("../middleware/authMiddleware");

// ✅ All routes protected with verifyToken
router.post("/students", verifyToken, studentController.addStudent);
router.get("/students", verifyToken, studentController.getStudents);
router.get("/students/:id", verifyToken, studentController.getStudent);
router.put("/students/:id", verifyToken, studentController.updateStudent);
router.delete("/students/:id", verifyToken, studentController.deleteStudent);

module.exports = router;