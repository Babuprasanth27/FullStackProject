import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const AddStudentForm = ({ addStudentToList, notify }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleClick = async () => {
    setSubmitted(true);
    if (name.trim() === '' || address.trim() === '') {
      setError('Name and Address are required.');
      return;
    }

    const student = { name, address };

    try {
      const response = await fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      });
      const data = await response.json();
      addStudentToList(data);
      setName('');
      setAddress('');
      setError('');
      setSubmitted(false);
      notify('Student added successfully', 'success');
    } catch (error) {
      console.error("Failed to add student:", error);
      setError('Failed to add student.');
      notify('Failed to add student', 'error');
    }
  };

  const removeText = () => {
    setName('');
    setAddress('');
    setSubmitted(false);
    setError('');
  };

  const handleCloseAlert = () => {
    setError('');
  };

  return (
    <Paper elevation={5} sx={{ maxWidth: '600px', margin: '2rem auto', padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Add Students
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
        }}
        noValidate
        autoComplete="off"
      >
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert severity="error" onClose={handleCloseAlert}>
            {error}
          </Alert>
        </Snackbar>
        <TextField
          id="outlined-basic1"
          label="Student Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={submitted && name.trim() === ''}
          helperText={submitted && name.trim() === '' ? 'Name is required' : ''}
        />
        <TextField
          id="outlined-basic2"
          label="Student Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={submitted && address.trim() === ''}
          helperText={submitted && address.trim() === '' ? 'Address is required' : ''}
        />
        <Button variant="contained" color="success" onClick={handleClick}>
          Submit
        </Button>
        <Button variant="contained" color="error" onClick={removeText}>
          Remove
        </Button>
      </Box>
    </Paper>
  );
};

export default AddStudentForm;
