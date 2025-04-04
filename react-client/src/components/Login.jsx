import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const Login = ({ setIsAuthenticated, setUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.message);
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <input type="email" name="email" value={formData.email}
          onChange={handleChange} className="form-control mb-3" placeholder="Email" required />
        <input type="password" name="password" value={formData.password}
          onChange={handleChange} className="form-control mb-3" placeholder="Password" required />
        <button type="submit" className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
