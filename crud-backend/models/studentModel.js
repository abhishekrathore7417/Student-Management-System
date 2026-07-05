const db = require("../config/db");

const createStudent = (student, callback) => {
    const sql = "INSERT INTO students (name, email, course, user_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [student.name, student.email, student.course, student.user_id], callback);
};

const getStudentsByUserId = (userId, callback) => {
    const sql = "SELECT * FROM students WHERE user_id = ? ORDER BY id DESC";
    db.query(sql, [userId], callback);
};

const getStudentById = (id, userId, callback) => {
    const sql = "SELECT * FROM students WHERE id = ? AND user_id = ?";
    db.query(sql, [id, userId], callback);
};

const updateStudent = (id, userId, student, callback) => {
    const sql = "UPDATE students SET name = ?, email = ?, course = ? WHERE id = ? AND user_id = ?";
    db.query(sql, [student.name, student.email, student.course, id, userId], callback);
};

const deleteStudent = (id, userId, callback) => {
    const sql = "DELETE FROM students WHERE id = ? AND user_id = ?";
    db.query(sql, [id, userId], callback);
};

module.exports = {
    createStudent,
    getStudentsByUserId,
    getStudentById,
    updateStudent,
    deleteStudent
};