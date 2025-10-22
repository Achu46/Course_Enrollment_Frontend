import React, { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import "./StudentLoginForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const StudentLoginForm = () => {
  const navigate=useNavigate();
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
          header: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("🍾 Logged in successfully");
        toast.success("🥂 Welcome back");
        // setTimeout(() => {
        //   window.location.reload();
        //   navigate("/")
        // },2000);
        navigate("/")
      } else {
        console.error("❌ Invalid credentials");
      }
    } catch (err) {
      console.error("Error:", err.message);
      toast.info("⚠️ Something went wrong server side issue");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login Coming Soon!");
  };

  return (
    <div className="form-wrapper">
      <title>Student Login</title>
      <div className="form-container">
        <h2>Student Login</h2>

        <form onSubmit={handleSubmit}>
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
