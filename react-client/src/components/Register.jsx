import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "", password: "", firstName: "", lastName: "",
    address: "", city: "", postalCode: "", phoneNumber: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData, {
        withCredentials: true,
      });
      setMessage("✅ Registered! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("❌ Registration failed.");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="row mb-3">
          <div className="col-md-6">
            <input name="firstName" value={formData.firstName} onChange={handleChange}
              className="form-control" placeholder="First Name" required />
          </div>
          <div className="col-md-6">
            <input name="lastName" value={formData.lastName} onChange={handleChange}
              className="form-control" placeholder="Last Name" required />
          </div>
        </div>
        <input type="email" name="email" value={formData.email}
          onChange={handleChange} className="form-control mb-3" placeholder="Email" required />
        <input type="password" name="password" value={formData.password}
          onChange={handleChange} className="form-control mb-3" placeholder="Password" required />
        <input name="address" value={formData.address}
          onChange={handleChange} className="form-control mb-3" placeholder="Address" />
        <div className="row mb-3">
          <div className="col-md-4">
            <input name="city" value={formData.city}
              onChange={handleChange} className="form-control" placeholder="City" />
          </div>
          <div className="col-md-4">
            <input name="postalCode" value={formData.postalCode}
              onChange={handleChange} className="form-control" placeholder="Postal Code" />
          </div>
          <div className="col-md-4">
            <input name="phoneNumber" value={formData.phoneNumber}
              onChange={handleChange} className="form-control" placeholder="Phone Number" />
          </div>
        </div>
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
