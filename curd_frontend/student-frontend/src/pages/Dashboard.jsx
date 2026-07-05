import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="dashboard-page">
            <Navbar />

            <main className="dashboard-content">
                <div className="dashboard-card">
                    <h1>Welcome{user?.name ? `, ${user.name}` : ""} 👋</h1>
                    <p>
                        This is your student management dashboard. You can manage student
                        records securely after logging in.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
