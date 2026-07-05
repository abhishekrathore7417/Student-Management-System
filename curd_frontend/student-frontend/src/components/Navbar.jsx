import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <header className="dashboard-navbar">
            <div className="dashboard-navbar-left">
                <div className="dashboard-logo" onClick={() => navigate("/dashboard")}>
                    Student<span>Hub</span>
                </div>

                <nav className="dashboard-nav-links">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? "dashboard-nav-link active" : "dashboard-nav-link"
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/students"
                        className={({ isActive }) =>
                            isActive ? "dashboard-nav-link active" : "dashboard-nav-link"
                        }
                    >
                        Students
                    </NavLink>
                </nav>
            </div>

            <div className="dashboard-navbar-right">
                <div className="dashboard-user-box">
                    <h4>{user?.name || "User"}</h4>
                    <p>{user?.email || "user@email.com"}</p>
                </div>

                <button className="dashboard-logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Navbar;