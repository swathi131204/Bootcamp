import React, { useState } from "react";
import StudentList from "./StudentList";
import StudentForm from "./StudentForm";
import "./styles.css";

const App = () => {
  const [students, setStudents] = useState([]);

  const addStudent = (name) => {
    setStudents([...students, name]);
  };

  const removeStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h1>Student Management</h1>
      <StudentForm addStudent={addStudent} />
      <StudentList students={students} removeStudent={removeStudent} />
    </div>
  );
};

export default App;

