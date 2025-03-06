import React, { useState, useEffect } from "react";
import "./App.css"; 

const App = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Students per page

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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Student List</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {students.map((student) => (
          <div key={student._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
            <h3>{student.name}</h3>
            <p>Age: {student.age}</p>
            <p>Course: {student.course}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

