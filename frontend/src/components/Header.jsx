import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Header() {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleLogout = async () => {
        await logout();
    };

    const getNavLinkClass = ({ isActive }) => {
        return isActive ? "nav-link active-link" : "nav-link";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <div className="container">
                <NavLink to="/" className="navbar-brand">
                    TodoList
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink to="/" className={getNavLinkClass}>
                                All Todos
                            </NavLink>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <NavLink
                                    to="/create-todolist"
                                    className={getNavLinkClass}
                                >
                                    Create Todo
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {user && (
                            <>
                                <li className="nav-item d-flex align-items-center me-3 text-white">
                                    {user.email}
                                </li>
                                <li className="nav-item">
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-outline-danger"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        {!user && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        to="/login"
                                        className={getNavLinkClass}
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/signup"
                                        className={getNavLinkClass}
                                    >
                                        Signup
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
