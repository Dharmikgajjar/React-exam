import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";

const Navbar = ({ view, onNavigateHome, onNavigateAdd, onNavigateLogin }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    onNavigateHome();
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ background: "#da2338" }}
    >
      <div className="container-fluid px-4">
        <button
          className="navbar-brand fw-bold btn btn-link text-white text-decoration-none p-0"
          onClick={onNavigateHome}
        >
          <i className="fa-solid fa-graduation-cap me-2"></i>
          Red and White Skill Education
        </button>
        <button
          className="navbar-toggler" type="button"data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button
                className={`btn btn-link nav-link ${view === "list" ? "fw-bold" : ""}`}
                onClick={onNavigateHome}
              >
                Student List
              </button>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <button
                  className={`btn btn-link nav-link ${view === "add" ? "fw-bold" : ""}`}
                  onClick={onNavigateAdd}
                >
                  Add Student
                </button>
              </li>
            )}
          </ul>
          <ul className="navbar-nav align-items-center">
            {isAuthenticated ? (
              <>
                <li className="nav-item text-white me-3">
                  <i className="fa-solid fa-user me-1"></i>
                  {user?.name}
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-light btn-sm"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-light btn-sm"
                  onClick={onNavigateLogin}
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
