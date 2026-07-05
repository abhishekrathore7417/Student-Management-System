import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className="home-page">
            {/* TOP NAVBAR */}
            <header className="top-navbar">
                <div className="brand-logo">
                    Student<span>Hub</span>
                </div>

                <div className="top-nav-actions">
                    <button
                        className="nav-login-btn"
                        onClick={() => {
                            setShowRegister(false);
                            setShowLogin(true);
                        }}
                    >
                        Login
                    </button>

                    <button
                        className="nav-register-btn"
                        onClick={() => {
                            setShowLogin(false);
                            setShowRegister(true);
                        }}
                    >
                        Register
                    </button>
                </div>
            </header>

            {/* CENTER CONTENT */}
            <section className="home-center-section">
                <div className="home-content-box">
                    <span className="home-badge">Student Management System</span>

                    <h1>
                        Welcome to <span>StudentHub</span>
                    </h1>

                    <p>
                        A secure and simple student management system where each user can
                        manage their own student records with login, add, edit and delete
                        functionality.
                    </p>

                    <div className="home-feature-grid">
                        <div className="home-feature-item">👤 User-wise student records</div>
                        <div className="home-feature-item">🔐 Secure login system</div>
                        <div className="home-feature-item">✏️ Student add / edit / delete</div>
                        <div className="home-feature-item">📊 Clean dashboard workflow</div>
                    </div>

                    <div className="home-action-buttons">
                        <button
                            className="hero-login-btn"
                            onClick={() => {
                                setShowRegister(false);
                                setShowLogin(true);
                            }}
                        >
                            Login Now
                        </button>

                        <button
                            className="hero-register-btn"
                            onClick={() => {
                                setShowLogin(false);
                                setShowRegister(true);
                            }}
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </section>

            {/* LOGIN MODAL */}
            {showLogin && (
                <div className="modal-overlay" onClick={() => setShowLogin(false)}>
                    <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowLogin(false)}>
                            ×
                        </button>
                        <Login
                            openRegister={() => {
                                setShowLogin(false);
                                setShowRegister(true);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* REGISTER MODAL */}
            {showRegister && (
                <div className="modal-overlay" onClick={() => setShowRegister(false)}>
                    <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowRegister(false)}>
                            ×
                        </button>
                        <Register
                            openLogin={() => {
                                setShowRegister(false);
                                setShowLogin(true);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;