import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./AdminLogin.css";

const AdminLoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Admin Logged In! (UI only)");
  };

  return (
    <div className="form-wrapper">
      <title>Admin Dashboard</title>
      <div className="form-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" id="email" placeholder=" " required />
            <label htmlFor="email">Email</label>
            <span className="input-icon">
              <FaEnvelope />
            </span>
          </div>

          <div className="form-group">
            <input type="password" id="password" placeholder=" " required />
            <label htmlFor="password">Password</label>
            <span className="input-icon">
              <FaLock />
            </span>
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
