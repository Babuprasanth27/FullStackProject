import React, { useState } from 'react';
import { Container } from '@mui/material';
import StudentList from './StudentList';
const UserTable = () => {
  const [students, setStudents] = useState([]);


  return (
    <Container>
      <StudentList students={students} />
    </Container>
  );
};

export default UserTable;
