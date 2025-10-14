import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaIdBadge,
  FaVenusMars,
} from "react-icons/fa";
import "./StudentForm.css";
import axios from "axios";
import { toast } from "react-toastify";

const StudentForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    gender: "",
    studentId: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validation = () => {
    const errors = {};
    const mobileRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;

    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    if (!form.password.trim()) errors.password = "Password is required";

    if (!form.mobileNumber.trim()) {
      errors.mobileNumber = "Mobile number is required";
    } else if (!mobileRegex.test(form.mobileNumber)) {
      errors.mobileNumber =
        "Please enter a valid 10-digit Indian mobile number";
    }

    if (!form.gender.trim()) errors.gender = "Please select a gender";
    if (!form.studentId.trim()) errors.studentId = "Student ID is required";

    setError(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validation();
    if (!isValid) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setForm({
          name: "",
          email: "",
          password: "",
          mobileNumber: "",
          gender: "",
          studentId: "",
        });

        toast.success("🍾 Account created successfully!");
      } else {
        toast.error("❌ Account creation failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err.message);
      toast.error("⚠️ Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Student Registration</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder=" "
              value={form.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
            <span className="input-icon">
              <FaUser />
            </span>
            {error.name && <p style={{ color: "red" }}>{error.name}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <span className="input-icon">
              <FaEnvelope />
            </span>
            {error.email && <p style={{ color: "red" }}>{error.email}</p>}
          </div>

          {/* Password */}
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <span className="input-icon">
              <FaLock />
            </span>
            {error.password && <p style={{ color: "red" }}>{error.password}</p>}
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              placeholder=" "
              value={form.mobileNumber}
              onChange={handleChange}
            />
            <label htmlFor="mobileNumber">Mobile Number</label>
            <span className="input-icon">
              <FaPhone />
            </span>
            {error.mobileNumber && (
              <p style={{ color: "red" }}>{error.mobileNumber}</p>
            )}
          </div>

          {/* Gender */}
          <div className="form-group">
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="gender">Gender</label>
            <span className="input-icon">
              <FaVenusMars />
            </span>
            {error.gender && <p style={{ color: "red" }}>{error.gender}</p>}
          </div>

          {/* Student ID */}
          <div className="form-group">
            <input
              type="text"
              id="studentId"
              name="studentId"
              placeholder=" "
              value={form.studentId}
              onChange={handleChange}
            />
            <label htmlFor="studentId">Student ID</label>
            <span className="input-icon">
              <FaIdBadge />
            </span>
            {error.studentId && (
              <p style={{ color: "red" }}>{error.studentId}</p>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
