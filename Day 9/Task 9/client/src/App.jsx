import React, { useState, useEffect } from "react";
import "./App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Student Dashboard</h2>
    </nav>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>Name</li>
        <li>Id</li>
        <li>Major</li>
        <li>rollNo</li>
      </ul>
    </div>
  );
};

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const fetchStudents = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:5000/students?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setStudents(data.students);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="main-content">
      <h3>Student List</h3>
      <div className="student-grid">
        {students.map((student) => (
          <div key={student._id} className="student-card">
            <h4>{student.name}</h4>
            <p>Age: {student.age}</p>
            <p>Course: {student.course}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="layout">
        <Sidebar />
        <StudentList />
      </div>
    </div>
  );
};

export default App;

