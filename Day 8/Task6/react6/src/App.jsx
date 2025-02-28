import React from "react";
import StudentCard from "./StudentCard";
import "./App.css";

const students = [
  { name: "Swathi", year: "Freshman", major: "Computer Science" },
  { name: "Balaji", year: "Sophomore", major: "Mechanical Engineering" },
  { name: "Swetha", year: "Junior", major: "Fashion Design" },
  { name: "Harish", year: "Senior", major: "IT" },
];

const App = () => {
  return (
    <div className="app-container">
      {students.map((student, index) => (
        <StudentCard key={index} {...student} />
      ))}
    </div>
  );
};

export default App;

