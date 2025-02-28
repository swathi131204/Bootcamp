import React from "react";
import StudentCard from "./StudentCard";

const StudentList = () => {
  const students = [
    { name: "Swathi", major: "Computer Science", year: "III" },
    { name: "Swetha", major: "IT", year: "III" },
    { name: "Balaji", major: "ECE", year: "III" },
  ];

  

  return (
    <div className="flex flex-wrap gap-4 justify-center p-6">
      {students.map((student, index) => (
        <StudentCard key={index} student={student} />
      ))}
    </div>
  );
};

export default StudentList;
