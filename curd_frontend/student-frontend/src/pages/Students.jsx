import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";

function Students() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        course: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || !user) {
            navigate("/");
            return;
        }
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await api.get(`/students?user_id=${user.id}`);
            setStudents(res.data);
        } catch (error) {
            console.log("Error fetching students:", error);
            if (error.response?.status === 401) {
                navigate("/");
            }
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        setForm({ name: "", email: "", course: "" });
        setShowModal(true);
    };

    const openEditModal = (student) => {
        setEditingId(student.id);
        setForm({
            name: student.name,
            email: student.email,
            course: student.course,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setForm({ name: "", email: "", course: "" });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                name: form.name,
                email: form.email,
                course: form.course,
            };

            if (editingId) {
                await api.put(`/students/${editingId}`, data);
            } else {
                await api.post("/students", data);
            }

            closeModal();
            fetchStudents();
        } catch (error) {
            console.error("Error saving student:", error);
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this student?")) return;

        try {
            await api.delete(`/students/${id}?user_id=${user.id}`);
            fetchStudents();
        } catch (error) {
            console.log("Delete error:", error);
        }
    };

    return (
        <div className="students-page">
            <Navbar onAddStudent={openAddModal} />

            <div className="students-content">
                <div className="students-top-card">
                    <div>
                        <h1>Student Records</h1>
                        <p>Manage your student list here.</p>
                    </div>
                    <div className="students-top-actions">
                        <button className="students-add-btn" onClick={openAddModal}>
                            + Add Student
                        </button>
                        <div className="students-count-card">
                            <span>{students.length}</span>
                            <p>Total</p>
                        </div>
                    </div>
                </div>

                <div className="students-table-card">
                    {students.length === 0 ? (
                        <div className="empty-state">
                            <h3>No students found</h3>
                            <p>Click "Add Student" to create your first record.</p>
                        </div>
                    ) : (
                        <table className="students-table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.course}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button
                                                className="edit-btn"
                                                onClick={() => openEditModal(student)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(student.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="student-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            ×
                        </button>

                        <h2>{editingId ? "Edit Student" : "Add Student"}</h2>

                        <form className="student-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter student name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter student email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="course"
                                placeholder="Enter course name"
                                value={form.course}
                                onChange={handleChange}
                                required
                            />

                            <div className="student-form-actions">
                                <button type="button" className="cancel-btn" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="save-btn" disabled={loading}>
                                    {loading ? "Saving..." : editingId ? "Update Student" : "Add Student"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Students;