import React from "react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import "./StudentLoginForm.css";

const StudentLoginForm = () => {
  const handleGoogleLogin = () => {
    alert("Google Login Coming Soon!");
    // Later you can integrate Google Auth here
  };

  return (
    <div className="form-wrapper">
      <title>Student Login</title>
      <div className="form-container">
        <h2>Student Login</h2>

        <form>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              required
            />
            <label htmlFor="email">Email</label>
            <span className="input-icon">
              <FaEnvelope />
            </span>
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
            <span className="input-icon">
              <FaLock />
            </span>
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="google-icon" />
            <span>Login with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLoginForm;
