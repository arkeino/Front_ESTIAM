import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../api/users-api';
import { User } from '../types/User';

const CreateUser = (): JSX.Element => {
  const navigate = useNavigate();
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseSnackbarSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenSnackbarSuccess(false);
  };

  const handleCloseSnackbarError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenSnackbarError(false);
  };

  const formik = useFormik({
    initialValues: { email: '', name: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      name: Yup.string().required('Username is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values): Promise<void> => {
      console.log('Form values:', values);
      try {
        const response = await usersApi.createUser(values as User);
        if ('error' in response) {
          throw new Error(response.message);
        }
        setOpenSnackbarSuccess(true);
        navigate('/users');
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message || 'Failed to create user!');
        } else {
          setErrorMessage('Failed to create user!');
        }
        setOpenSnackbarError(true);
      }
    }
  });

  return (
    <Box display="flex" justifyContent="center" sx={{ marginTop: 30 }}>
      <Card sx={{ textAlign: 'center', width: '50%' }}>
        <CardContent sx={{ padding: 3 }}>
          <Typography variant="h4" color="textPrimary">Create User</Typography>
          <Box mt={5}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                autoFocus
                label="Email Address"
                margin="normal"
                name="email"
                type="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                name="name"
                type="text"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                name="password"
                type="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Box mt={2}>
                <Button color="primary" size="large" type="submit" variant="contained">
                  Create User
                </Button>
              </Box>
            </form>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbarSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbarSuccess}
      >
        <Alert onClose={handleCloseSnackbarSuccess} severity="success" sx={{ width: '100%' }}>
          User created successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbarError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbarError}
      >
        <Alert onClose={handleCloseSnackbarError} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateUser;

