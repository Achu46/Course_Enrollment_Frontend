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
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [student, setStudent] = useState({ name: "", studentId: "" });

  useEffect(() => {
    const name = localStorage.getItem("studentName");
    const studentId = localStorage.getItem("studentId");

    if (name && studentId) {
      setStudent({ name, studentId });
    } else {
      // Redirect to login if not logged in
      window.location.href = "/login";
    }
  }, []);

  // useEffect(() => {
  //   const email = localStorage.getItem("studentEmail");
  //   const name = localStorage.getItem("studentName");
  //   if (!email) return;

  //   const fetchStudent = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/student-id/${email}`
  //       );

  //       // Assuming backend returns { studentId: "...", name: "..." } or you can use localStorage name
  //       setStudent({
  //         name: name || response.data.name, // fallback to name from backend if needed
  //         studentId: response.data.studentId,
  //       });
  //     } catch (err) {
  //       console.error("Error fetching student ID:", err.message);
  //     }
  //   };

  //   fetchStudent();
  // }, []);

  // Fetch available courses
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validation = () => {
    return (
      form.student_id &&
      form.course_id &&
      form.enrollmentDate &&
      form.status &&
      form.grade
    );
  };

  const handleEnrollment = async (e) => {
    e.preventDefault();

    if (!validation()) {
      toast.error("⚠️ Please fill all required fields.");
      return;
    }

    try {
      // Send the whole form as JSON
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
      console.error("Error enrolling course:", err.message);
      toast.info("⚠️ Internal server error");
    }
  };

  const handleEnrollClick = (course) => {
    if (!student.studentId) {
      toast.info("⚠️ Student info loading...");
      return;
    }

    setSelectedCourse(course);
    setForm({
      student_id: student.studentId, // ✅ use student object
      course_id: course._id,
      title: course.title,
      courseCode: course.courseCode,
      duration: course.duration,
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: "active",
      grade: "N/A",
    });
    setShowModal(true);
  };

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        if (!student.studentId) return;

        const response = await axios.get(
          `http://localhost:5000/api/enrolled-course/${student.studentId}` // ✅ studentId param
        );

        if (response.status === 200) {
          setEnrolledCourses(response.data); // ✅ set the enrolled courses state
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
        {/* <div className="welcome-card">
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
        </div> */}

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
          <div className="course-grid">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((enroll) => (
                <div className="course-card" key={enroll._id}>
                  <h3>{enroll.course_id?.title || enroll.title}</h3>
                  <p>
                    Course Code:{" "}
                    <strong>
                      {enroll.course_id?.courseCode || enroll.courseCode}
                    </strong>
                  </p>
                  <p>
                    Duration:{" "}
                    <strong>
                      {enroll.course_id?.duration || enroll.duration}
                    </strong>
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
              <p style={{color:"white"}}>No enrolled courses yet.</p>
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
                  onChange={handleChange}
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
