import React, { useState } from "react";
import {
  FaBookOpen,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([
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
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseCode, setNewCourseCode] = useState("");
  const [newCourseDesc, setNewCourseDesc] = useState("");
  const [newCourseDuration, setNewCourseDuration] = useState("");
  const [newCourseStartDate, setNewCourseStartDate] = useState("");
  const [newCourseEndDate, setNewCourseEndDate] = useState("");

  // Open modal to add or edit course
  const openModal = (course = null) => {
    setEditCourse(course);
    setNewCourseName(course ? course.name : "");
    setNewCourseDesc(course ? course.desc : "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditCourse(null);
    setNewCourseName("");
    setNewCourseDesc("");
  };

  // Save course (add or update)
  const saveCourse = () => {
    if (editCourse) {
      setCourses(
        courses.map((c) =>
          c.id === editCourse.id
            ? {
                ...c,
                title: newCourseName,
                courseCode: newCourseCode,
                description: newCourseDesc,
                duration: newCourseDuration,
                startDate: newCourseStartDate,
                endDate: newCourseEndDate,
              }
            : c
        )
      );
    } else {
      const newCourse = {
        id: "C" + (Math.floor(Math.random() * 1000) + 200),
        title: newCourseName,
        courseCode: newCourseCode,
        description: newCourseDesc,
        duration: newCourseDuration,
        startDate: newCourseStartDate,
        endDate: newCourseEndDate,
      };
      setCourses([...courses, newCourse]);
    }
    closeModal();
  };

  // Delete course
  const deleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="admin-dashboard-wrapper">
      <title>Admin Dashboard</title>
      <nav className="navbar">
        <h2 className="logo">
          <FaBookOpen /> Admin Portal
        </h2>
        <button className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Course Management</h2>
          <button className="add-btn" onClick={() => openModal()}>
            <FaPlus /> Add Course
          </button>
        </div>

        <div className="course-grid">
          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              <h3>{course.name}</h3>
              <p>{course.desc}</p>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => openModal(course)}>
                  <FaEdit /> Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteCourse(course.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editCourse ? "Edit Course" : "Add New Course"}</h3>

            <div className="form-group">
              <input
                type="text"
                placeholder=" "
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                required
              />
              <label>Course Title</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder=" "
                value={newCourseCode}
                onChange={(e) => setNewCourseCode(e.target.value)}
                required
              />
              <label>Course Code</label>
            </div>

            <div className="form-group">
              <textarea
                placeholder=" "
                value={newCourseDesc}
                onChange={(e) => setNewCourseDesc(e.target.value)}
                required
              />
              <label>Course Description</label>
            </div>

            <div className="form-group">
              <input
                type="number"
                placeholder=" "
                value={newCourseDuration}
                onChange={(e) => setNewCourseDuration(e.target.value)}
                required
              />
              <label>Duration (weeks)</label>
            </div>

            <div className="form-group">
              <input
                type="date"
                placeholder=" "
                value={newCourseStartDate}
                onChange={(e) => setNewCourseStartDate(e.target.value)}
                required
              />
              <label>Start Date</label>
            </div>

            <div className="form-group">
              <input
                type="date"
                placeholder=" "
                value={newCourseEndDate}
                onChange={(e) => setNewCourseEndDate(e.target.value)}
                required
              />
              <label>End Date</label>
            </div>

            <button className="submit-btn" onClick={saveCourse}>
              {editCourse ? "Update Course" : "Add Course"}
            </button>
            <button className="close-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
