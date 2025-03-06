import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Fetch students from API
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch data on component mount & refresh every 30 seconds
  useEffect(() => {
    fetchStudents();
    const interval = setInterval(fetchStudents, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // Pagination Logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="container">
      <h2>Student List</h2>
      <button className="refresh-btn" onClick={fetchStudents}>Refresh Data</button>
      <div className="student-list">
        {currentStudents.map((student) => (
          <div className="student-card" key={student._id}>
            <h4>{student.name}</h4>
            <p>Age: {student.age}</p>
            <p>Grade: {student.grade}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
        <span> Page {currentPage} </span>
        <button onClick={nextPage} disabled={indexOfLastStudent >= students.length}>Next</button>
      </div>
    </div>
  );
};

export default App;
