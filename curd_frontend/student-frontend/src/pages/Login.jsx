import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login({ openRegister }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.email || !form.password) {
            setError("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/auth/login", form);

            if (!res.data.user || !res.data.token) {
                throw new Error("Invalid response from server");
            }

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);

            navigate("/students");

        } catch (error) {
            if (error.response) {
                setError(error.response.data?.message || "Login failed");
            } else if (error.request) {
                setError("Server not responding. Please check backend.");
            } else {
                setError(error.message || "Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card">
            <h2>Login</h2>
            <p>Welcome back. Login to continue.</p>

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

            <form onSubmit={handleLogin} className="auth-form">
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
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />

                <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={loading}
                >
                    {loading ? "Please wait..." : "Login"}
                </button>
            </form>

            <p className="switch-auth-text">
                Don't have an account?{" "}
                <span
                    onClick={openRegister}
                    style={{ cursor: "pointer", color: "#2563eb", fontWeight: "700" }}
                >
                    Register
                </span>
            </p>
        </div>
    );
}

export default Login;