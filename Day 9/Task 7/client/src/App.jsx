import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toString().includes(searchQuery)
  );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Student List</h2>
      <input
        type="text"
        placeholder="Search by Name or ID..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ padding: "8px", marginBottom: "20px", width: "250px" }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredStudents.map(student => (
          <div key={student.id} style={{
            border: "1px solid #ddd",
            padding: "15px",
            margin: "10px",
            borderRadius: "8px",
            width: "200px"
          }}>
            <h4>{student.name}</h4>
            <p>ID: {student.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
