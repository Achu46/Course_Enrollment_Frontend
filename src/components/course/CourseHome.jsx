import React, { useEffect, useState } from "react";
import { FaBookOpen, FaCheckCircle, FaSignOutAlt } from "react-icons/fa";
import "./CourseHome.css";
import axios from "axios";
import { toast } from "react-toastify";

const CourseHome = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    courseCode: "",
    duration: "",
    enrollmentDate: "",
    status: "",
    grade: "",
  });
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validation = () => {
    if (!form.enrollmentDate.trim()) return false;
    if (!form.status.trim()) return false;
    if (!form.grade.trim()) return false;
    return true;
  };

  const handleEnrollment = async (e) => {
    e.preventDefault();

    const isValid = validation();
    if (!isValid) {
      toast.error("⚠️ Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/course-enroll",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("✅ Course Enrolled Successfully");
        setIsEnrolled(true);
        setShowModal(false);
      } else {
        toast.error("❌ Course has not been enrolled");
      }
    } catch (err) {
      console.error("⚠️ Error:", err.message);
      toast.info("⚠️ Internal server error");
    }
  };

  // Fetch the Courses from DB
  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/fetch-courses"
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
    setForm({
      title: course.title,
      courseCode: course.courseCode,
      duration: course.duration,
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: "active",
      grade: "N/A",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
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
                <p>
                  Course Code: <strong>{course.courseCode}</strong>
                </p>
                <p>
                  Duration: <strong>{course.duration}</strong>
                </p>
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
        </div>
      </div>

      {/* Enrollment Modal */}
      {showModal && selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Enroll in {selectedCourse.title}</h3>
            <form onSubmit={handleEnrollment}>
              <div className="form-group">
                <label>Enrollment Date</label>
                <input
                  type="text"
                  name="enrollmentDate"
                  value={form.enrollmentDate}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
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
                  name="grade"
                  placeholder="N/A"
                  value={form.grade}
                  onChange={handleChange}
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
