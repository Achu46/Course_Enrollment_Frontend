import React, { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import "./StudentLoginForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const StudentLoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validation = () => {
    let errors = {};

    if (!form.email.trim()) errors.email = "Email is required";
    if (!form.password.trim()) errors.password = "Password is required";
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = validation();
    if (!valid) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/student-login",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("studentId", response.data.studentId);
        localStorage.setItem("studentName", response.data.name);
        localStorage.setItem("studentEmail", response.data.email);

        toast.success("🥂 Welcome back");
        navigate("/");
      } else {
        console.error("❌ Invalid credentials");
      }
    } catch (err) {
      console.error("Error:", err.message);
      toast.info("⚠️ Something went wrong (server error)");
    }
  };

  // ✅ GOOGLE LOGIN FUNCTION
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("GOOGLE CLIENT ID =", process.env.REACT_APP_GOOGLE_CLIENT_ID);

    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const googleUser = {
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
      };

      const response = await axios.post(
        "http://localhost:5000/api/google-login",
        googleUser
      );

      if (response.status === 200) {
        localStorage.setItem("studentId", response.data.user.studentId);
        localStorage.setItem("studentName", response.data.user.name);
        localStorage.setItem("studentEmail", response.data.user.email);

        toast.success("✅ Logged in with Google");
        navigate("/");
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      toast.error("❌ Google Login Failed");
    }
  };

  const handleGoogleError = () => {
    toast.error("❌ Google Login failed");
  };

  return (
    <div className="form-wrapper">
      <title>Student Login</title>
      <div className="form-container">
        <h2>Student Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              required
              value={form.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <span className="input-icon">
              <FaEnvelope />
            </span>
          </div>
          {error.email && <p style={{ color: "red" }}>{error.email}</p>}

          {/* Password */}
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" "
              required
              value={form.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <span className="input-icon">
              <FaLock />
            </span>
          </div>
          {error.password && <p style={{ color: "red" }}>{error.password}</p>}

          <p className="already-account">
            Create an Account?
            <Link to="/student-register" style={{ color: "blue" }}>
              Register
            </Link>
          </p>

          <button type="submit" className="submit-btn">
            Login
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          {/* ✅ Google Login Button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>

          {/* OPTIONAL: You can keep your styled button and trigger GoogleLogin */}
        </form>
      </div>
    </div>
  );
};

export default StudentLoginForm;
