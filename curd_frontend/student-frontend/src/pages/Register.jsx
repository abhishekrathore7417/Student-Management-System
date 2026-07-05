import { useState } from "react";
import api from "../api";

function Register({ openLogin }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            await api.post("/auth/register", form);

            alert("Registration successful!");
            openLogin();
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card">
            <h2>Create Account</h2>
            <p>Register to access your student dashboard.</p>

            {error && (
                <div className="auth-error" style={{
                    background: "#fee2e2",
                    color: "#dc2626",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    marginBottom: "16px",
                    fontSize: "14px",
                    fontWeight: "600"
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleRegister} className="auth-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                    {loading ? "Please wait..." : "Register"}
                </button>
            </form>

            <p className="switch-auth-text">
                Already have an account?{" "}
                <span
                    onClick={openLogin}
                    style={{ cursor: "pointer", color: "#2563eb", fontWeight: "700" }}
                >
                    Login
                </span>
            </p>
        </div>
    );
}

export default Register;