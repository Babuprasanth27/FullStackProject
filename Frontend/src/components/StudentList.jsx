import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddStudentForm from './AddStudentForm';
import useMediaQuery from '@mui/material/useMediaQuery';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [notification, setNotification] = useState({ message: '', severity: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const isMobileScreen = useMediaQuery('(max-width:320px)');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8080/student/getAll');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
        setNotification({ message: 'Failed to fetch students.', severity: 'error' });
        setSnackbarOpen(true);
      }
    };

    fetchStudents();
  }, []);

  const addStudentToList = (student) => {
    setStudents([...students, student]);
  };

  const handleOpenDialog = (student) => {
    setEditedStudent(student);
    setEditedName(student.name);
    setEditedAddress(student.address);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/student/update/${editedStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: editedName,
          address: editedAddress
        })
      });
      if (response.ok) {
        const updatedStudent = { id: editedStudent.id, name: editedName, address: editedAddress };
        setStudents(students.map(student => (student.id === editedStudent.id ? updatedStudent : student)));
        handleCloseDialog();
        setNotification({ message: 'Student updated successfully', severity: 'success' });
        setSnackbarOpen(true);
      } else {
        console.error('Failed to update student:', response.statusText);
        setNotification({ message: 'Failed to update student.', severity: 'error' });
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Failed to update student:', error);
      setNotification({ message: 'Failed to update student.', severity: 'error' });
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/student/delete/${id}`, {
        method: 'DELETE'
      });
      setStudents(students.filter(student => student.id !== id));
      setNotification({ message: 'Student deleted successfully', severity: 'success' });
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to delete student:', error);
      setNotification({ message: 'Failed to delete student.', severity: 'error' });
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <AddStudentForm addStudentToList={addStudentToList} notify={(message, severity) => {
          setNotification({ message, severity });
          setSnackbarOpen(true);
        }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <h1>Students List</h1>
        {students.length === 0 ? (
          <Typography variant="h6">No Students List Found.</Typography>
        ) : (
          students.map(student => (
            <Paper
              elevation={6}
              style={
                {
                  margin: '10px',
                  padding: '15px',
                  textAlign: 'left'
                }
              }
              key={student.id}
            >
              <div
                style={
                  { display: 'flex',
                    flexDirection: isMobileScreen ? 'column' : 'row',
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    }
                  }>
                <div>
                  <Typography variant="body1">
                    Name: {student.name}
                  </Typography>
                  <Typography variant="body1">
                    Address: {student.address}
                  </Typography>
                </div>
                <div 
                style={
                  { marginTop: isMobileScreen ? '10px' : 0 }
                }>
                  <Button 
                  variant="contained" 
                  style={
                    { marginRight: isMobileScreen ? '10px' : 0 }
                  } 
                  color="primary" 
                  onClick={() => handleOpenDialog(student)}>Edit</Button>
                  <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => handleDelete(student.id)} 
                  style={{ marginLeft: isMobileScreen ? '0' : '10px' }}>Delete</Button>
                </div>
              </div>

            </Paper>
          ))
        )}
      </Grid>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="xs">
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
            variant="outlined"
            margin="dense"
            autoFocus
          />
          <TextField
            label="Address"
            value={editedAddress}
            onChange={(e) => setEditedAddress(e.target.value)}
            fullWidth
            variant="outlined"
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog} 
            color="secondary">
              Cancel
          </Button>
          <Button 
            onClick={handleEditSubmit} 
            color="primary">
              Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Alert
          severity={notification.severity}
          onClose={handleSnackbarClose}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default StudentList;
