import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaIdBadge,
  FaVenusMars,
} from "react-icons/fa";
import "./StudentForm.css";

const StudentForm = () => {
  return (
    <div className="form-wrapper">
      <title>Student Registration</title>
      <div className="form-container">
        <h2>Student Registration</h2>
        <form>
          <div className="form-group">
            <input type="text" id="name" name="name" placeholder=" " required />
            <label htmlFor="name">Name</label>
            <span className="input-icon">
              <FaUser />
            </span>
          </div>

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

          <div className="form-group">
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              placeholder=" "
              required
            />
            <label htmlFor="mobileNumber">Mobile Number</label>
            <span className="input-icon">
              <FaPhone />
            </span>
          </div>

          <div className="form-group">
            <select id="gender" name="gender" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="gender">Gender</label>
            <span className="input-icon">
              <FaVenusMars />
            </span>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="student_id"
              name="student_id"
              placeholder=" "
            />
            <label htmlFor="student_id">Student ID</label>
            <span className="input-icon">
              <FaIdBadge />
            </span>
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
