import React from "react";

const StudentList = ({ students, removeStudent }) => {
  return (
    <div className="student-list">
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              {student} 
              <button onClick={() => removeStudent(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
