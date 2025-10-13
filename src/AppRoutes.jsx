import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseHome from "./components/course/CourseHome";
import StudentForm from "./components/Students/StudentForm";
import StudentLoginForm from "./components/Students/StudentLoginForm";
import AdminLoginForm from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CourseHome />} />
          <Route path="/student-register" element={<StudentForm />} />
          <Route path="/student-login" element={<StudentLoginForm />} />
          <Route path="/admin-login" element={<AdminLoginForm />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
