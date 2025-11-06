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
    student_id: "",
    course_id: "",
    enrollmentDate: "",
    status: "",
    grade: "",
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [student, setStudent] = useState({ name: "", studentId: "" });

  useEffect(() => {
    const name = localStorage.getItem("studentName");
    const studentId = localStorage.getItem("studentId");

    if (name && studentId) {
      setStudent({ name, studentId });
    } else {
      window.location.href = "/login";
    }
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/fetch-courses"
        );
        if (response.status === 200) setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err.message);
      }
    };
    fetchCourses();
  }, []);

  // Validation based on backend schema
  const validation = () => {
    return (
      form.student_id && form.course_id && form.status && form.grade !== ""
    );
  };

  // Submit enrollment
  const handleEnrollment = async (e) => {
    e.preventDefault();

    if (!validation()) {
      toast.error("⚠️ Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/course-enroll",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        toast.success("✅ Course Enrolled Successfully");
        setShowModal(false);
      } else {
        toast.error("❌ Course enrollment failed");
      }
    } catch (err) {
      console.error("Error enrolling:", err.message);
      toast.error("⚠️ Internal server error");
    }
  };

  // When clicking Enroll button
  const handleEnrollClick = (course) => {
    if (!student.studentId) {
      toast.info("⚠️ Student info loading...");
      return;
    }

    setSelectedCourse(course);

    // ✅ Matches backend schema exactly
    setForm({
      student_id: student.studentId,
      course_id: course._id,
      enrollmentDate: new Date().toISOString().split("T")[0], // or let backend auto-set it
      status: "active",
      grade: "N/A",
    });

    setShowModal(true);
  };

  // Fetch enrolled courses
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        if (!student.studentId) return;

        const response = await axios.get(
          `http://localhost:5000/api/enrolled-course/${student.studentId}`
        );

        if (response.status === 200) {
          setEnrolledCourses(response.data);
        }
      } catch (err) {
        console.log("❌ Failed to fetch enrolled courses", err.message);
      }
    };

    fetchEnrolledCourses();
  }, [student.studentId]);

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
          {student.studentId ? (
            <>
              <h3>
                Welcome, <span>{student.name}</span>
              </h3>
              <p>
                Student ID: <strong>{student.studentId}</strong>
              </p>
            </>
          ) : (
            <p>Loading student info...</p>
          )}
        </div>

        {/* Available Courses */}
        <div className="section">
          <h2>
            <FaBookOpen /> Available Courses
          </h2>
          <div className="course-grid">
            {courses.map((course) => (
              <div className="course-card" key={course._id}>
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

        {/* Enrolled Courses */}
        <div className="section">
          <h2>
            <FaCheckCircle /> Enrolled Courses
          </h2>
          <div className="course-grid">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((enroll) => (
                <div className="course-card" key={enroll._id}>
                  <h3>{enroll.course_id?.title}</h3>
                  <p>
                    Course Code: <strong>{enroll.course_id?.courseCode}</strong>
                  </p>
                  <p>
                    Duration: <strong>{enroll.course_id?.duration}</strong>
                  </p>
                  <p>
                    Status: <strong>{enroll.status}</strong>
                  </p>
                  <p>
                    Grade: <strong>{enroll.grade}</strong>
                  </p>
                </div>
              ))
            ) : (
              <p style={{ color: "white" }}>
                <strong>No enrolled courses yet.</strong>
              </p>
            )}
          </div>
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
                  type="date"
                  name="enrollmentDate"
                  value={form.enrollmentDate}
                  onChange={(e) =>
                    setForm({ ...form, enrollmentDate: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
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
                  value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })}
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
