import React, { useState, useEffect } from "react";
import {
  FaBookOpen,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import "./AdminDashboard.css";
import { toast } from "react-toastify";
import axios from "axios";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    courseCode: "",
    duration: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/fetch-courses"
      );
      if (response.status === 200) {
        setCourses(response.data);
      }
    } catch (err) {
      console.error("❌ Error fetching courses:", err.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Form validation
  const validateForm = () => {
    const error = {};
    if (!form.title.trim()) error.title = "Course Title is required";
    if (!form.description.trim())
      error.description = "Course Description is required";
    if (!form.courseCode.trim()) error.courseCode = "Course Code is required";
    if (!form.duration.trim()) error.duration = "Course Duration is required";
    if (!form.startDate.trim()) error.startDate = "Start Date is required";
    if (!form.endDate.trim()) error.endDate = "End Date is required";

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  // Submit form (add course)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/course-register",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        toast.success("✅ Course added successfully!");
        fetchCourses(); // refresh course list
        setForm({
          title: "",
          description: "",
          courseCode: "",
          duration: "",
          startDate: "",
          endDate: "",
        });
        setShowModal(false);
      }
    } catch (err) {
      console.error("❌ Error adding course:", err.message);
      toast.error("⚠️ Failed to add course");
    }
  };

  // Open modal (add or edit)
  const openModal = (course = null) => {
    setEditCourse(course);
    if (course) {
      setForm({
        title: course.title,
        description: course.description,
        courseCode: course.courseCode,
        duration: course.duration,
        startDate: course.startDate?.slice(0, 10), // format date for input
        endDate: course.endDate?.slice(0, 10),
      });
    } else {
      setForm({
        title: "",
        description: "",
        courseCode: "",
        duration: "",
        startDate: "",
        endDate: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditCourse(null);
    setErrors({});
  };

  // Delete course (frontend only; integrate backend as needed)
  const deleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c._id !== id));
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
            <div className="course-card" key={course._id}>
              <h3>{course.title}</h3>
              <p>
                Course Code: <strong>{course.courseCode}</strong>
              </p>
              <p>{course.description}</p>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => openModal(course)}>
                  <FaEdit /> Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteCourse(course._id)}
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
                name="title"
                placeholder=" "
                value={form.title}
                onChange={handleChange}
                required
              />
              <label>Course Title</label>
              {errors.title && (
                <span className="error" style={{ color: "red" }}>
                  {errors.title}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="courseCode"
                placeholder=" "
                value={form.courseCode}
                onChange={handleChange}
                required
              />
              <label>Course Code</label>
              {errors.courseCode && (
                <span className="error" style={{ color: "red" }}>
                  {errors.courseCode}
                </span>
              )}
            </div>

            <div className="form-group">
              <textarea
                name="description"
                placeholder=" "
                value={form.description}
                onChange={handleChange}
                required
              />
              <label>Course Description</label>
              {errors.description && (
                <span className="error" style={{ color: "red" }}>
                  {errors.description}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="number"
                name="duration"
                placeholder=" "
                value={form.duration}
                onChange={handleChange}
                required
              />
              <label>Duration (weeks)</label>
              {errors.duration && (
                <span className="error" style={{ color: "red" }}>
                  {errors.duration}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="date"
                name="startDate"
                placeholder=" "
                value={form.startDate}
                onChange={handleChange}
                required
              />
              <label>Start Date</label>
              {errors.startDate && (
                <span className="error" style={{ color: "red" }}>
                  {errors.startDate}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="date"
                name="endDate"
                placeholder=" "
                value={form.endDate}
                onChange={handleChange}
                required
              />
              <label>End Date</label>
              {errors.endDate && (
                <span className="error" style={{ color: "red" }}>
                  {errors.endDate}
                </span>
              )}
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
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
