import React, { useEffect, useState } from "react";
import { FaBookOpen, FaCheckCircle, FaSignOutAlt } from "react-icons/fa";
import "./CourseHome.css";
import axios from "axios";

const CourseHome = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [status, setStatus] = useState("active");
  const [grade, setGrade] = useState("");
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    courseCode: "",
    duration: "",
  });

  // Fetch the Courses from DB
  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/fetch-courses",
        form
      );
      if (response.status === 200) {
        setCourses(response.data);
      }
    } catch (err) {
      console.error("❌ Error in fetching courses:", err.message);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

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
              <div className="course-card" key={course.courseCode}>
                <h3>{course.title}</h3>
                  <p>Course Code: <strong>{course.courseCode}</strong></p> 
                <p>Duration: <strong>{course.duration}</strong></p>
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
          {/* <div className="course-grid">
            {enrolledCourses.map((course) => (
              <div className="course-card enrolled" key={course.id}>
                <h3>{course.name}</h3>
                <p>
                  Status: <strong>{course.status}</strong>
                </p>
              </div>
            ))}
          </div> */}
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
