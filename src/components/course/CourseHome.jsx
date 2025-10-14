import React, { useState } from "react";
import { FaBookOpen, FaCheckCircle, FaSignOutAlt } from "react-icons/fa";
import "./CourseHome.css";

const CourseHome = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [status, setStatus] = useState("active");
  const [grade, setGrade] = useState("");

  const courses = [
    {
      id: "C101",
      name: "Mathematics 101",
      desc: "Introduction to Algebra and Calculus.",
    },
    {
      id: "C102",
      name: "Physics 101",
      desc: "Fundamentals of Mechanics and Energy.",
    },
    {
      id: "C103",
      name: "Chemistry 101",
      desc: "Basic Principles of Chemistry and Reactions.",
    },
  ];

  const enrolledCourses = [
    { id: "C201", name: "English Literature", status: "active" },
    { id: "C202", name: "Computer Science", status: "active" },
  ];

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    alert(`Enrolled in ${selectedCourse.name} successfully!`);
    closeModal();
  };

  return (
    <div className="course-home-wrapper">
      <title>Home</title>
      <nav className="navbar">
        <h2 className="logo">
          <FaBookOpen /> Student Portal
        </h2>
        <button className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      <div className="course-home-container">
        <div className="welcome-card">
          <h3>
            Welcome, <span>John Doe</span>
          </h3>
          <p>
            Student ID: <strong>STU12345</strong>
          </p>
        </div>

        <div className="section">
          <h2>
            <FaBookOpen /> Available Courses
          </h2>
          <div className="course-grid">
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                <h3>{course.name}</h3>
                <p>{course.desc}</p>
                <button
                  className="enroll-btn"
                  onClick={() => handleEnrollClick(course)}
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>
            <FaCheckCircle /> Enrolled Courses
          </h2>
          <div className="course-grid">
            {enrolledCourses.map((course) => (
              <div className="course-card enrolled" key={course.id}>
                <h3>{course.name}</h3>
                <p>
                  Status: <strong>{course.status}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {showModal && selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Enroll in {selectedCourse.name}</h3>
            <form onSubmit={handleEnrollSubmit}>
              <div className="form-group">
                <label>Student ID</label>
                <input type="text" value="STU12345" readOnly />
              </div>
              <div className="form-group">
                <label>Course ID</label>
                <input type="text" value={selectedCourse.id} readOnly />
              </div>
              <div className="form-group">
                <label>Enrollment Date</label>
                <input
                  type="text"
                  value={new Date().toLocaleDateString()}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="dropped">Dropped</option>
                </select>
              </div>
              <div className="form-group">
                <label>Grade</label>
                <input
                  type="text"
                  placeholder="N/A"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-btn">
                Confirm Enrollment
              </button>
              <button type="button" className="close-btn" onClick={closeModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseHome;
