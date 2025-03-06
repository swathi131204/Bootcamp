import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box, TextField, Container } from '@mui/material';

const API_URL = "http://localhost:5000/students";

const StudentCard = ({ student }) => (
  <Card sx={{ width: 280, boxShadow: 5, borderRadius: 3, m: 2, transition: '0.3s', '&:hover': { boxShadow: 10 } }}>
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{student.name}</Typography>
      <Typography variant="body2" color="text.secondary">Major: {student.major}</Typography>
      <Typography variant="body2" color="text.secondary">Roll No: {student.rollNo}</Typography>
    </CardContent>
  </Card>
);

const App = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', major: '', rollNo: '' });

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  const handleAddStudent = () => {
    axios.post(API_URL, newStudent)
      .then(response => setStudents([...students, response.data]))
      .catch(error => console.error("Error adding student:", error));
  };

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 4, fontWeight: 'bold' }}>Student Cards</Typography>

      {/* Add Student Form */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} my={3}>
        <TextField label="Name" variant="outlined" size="small" onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
        <TextField label="Major" variant="outlined" size="small" onChange={(e) => setNewStudent({ ...newStudent, major: e.target.value })} />
        <TextField label="Roll No" variant="outlined" size="small" onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })} />
        <Button variant="contained" color="primary" onClick={handleAddStudent}>Add</Button>
      </Box>

      {/* Student Cards */}
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {students.map((student, index) => (
          <StudentCard key={index} student={student} />
        ))}
      </Box>
    </Container>
  );
};

export default App;
