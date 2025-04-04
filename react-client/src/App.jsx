import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import GroceryDashboard from "./components/GroceryDashboard";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ firstName: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/status", { withCredentials: true })
      .then((res) => {
        if (res.data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(res.data.user);
        }
      })
      .catch((err) => console.error("Auth check failed:", err.message));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUser({ firstName: "" });
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">GroceryApp</Link>
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item"><span className="nav-link">Hi, {user.firstName}</span></li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h2>Welcome to GroceryApp</h2>} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <GroceryDashboard userFirstName={user.firstName} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
