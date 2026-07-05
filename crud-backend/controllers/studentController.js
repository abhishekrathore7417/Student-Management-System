const studentModel = require("../models/studentModel");

// ADD student
const addStudent = (req, res) => {
    const { name, email, course } = req.body;
    const user_id = req.user.id;

    if (!name || !email || !course) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const student = { name, email, course, user_id };

    studentModel.createStudent(student, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error adding student", error: err });
        }

        res.status(201).json({
            message: "Student added successfully",
            studentId: result.insertId
        });
    });
};

// GET all students
const getStudents = (req, res) => {
    const userId = req.user.id;

    studentModel.getStudentsByUserId(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching students", error: err });
        }

        res.status(200).json(results);
    });
};

// GET single student
const getStudent = (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    studentModel.getStudentById(id, userId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching student", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(results[0]);
    });
};

// UPDATE student
const updateStudent = (req, res) => {
    const id = req.params.id;
    const { name, email, course } = req.body;
    const user_id = req.user.id;

    if (!name || !email || !course) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const student = { name, email, course };

    studentModel.updateStudent(id, user_id, student, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error updating student", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Student not found or unauthorized" });
        }

        res.status(200).json({
            message: "Student updated successfully"
        });
    });
};

// DELETE student
const deleteStudent = (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    studentModel.deleteStudent(id, userId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting student", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Student not found or unauthorized" });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });
    });
};

module.exports = {
    addStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
};