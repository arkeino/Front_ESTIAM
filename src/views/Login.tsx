import React, { useState, useEffect } from 'react';
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
import { Error } from '../types/Error';
import { useAuth } from '../hooks/use-auth';

const Login = (): JSX.Element => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [errorObj, setErrorObj] = useState<Error>({
    error: false,
    message: '',
  });

  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);

  const handleCloseSnackbarSuccess = () => {
    setOpenSnackbarSuccess(false);
  };

  const handleCloseSnackbarError = () => {
    setOpenSnackbarError(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: async (values): Promise<void> => {
      try {
        await login(values.email, values.password);
        setOpenSnackbarSuccess(true);
        navigate('/users');
      } catch (err) {
        setOpenSnackbarError(true);
        setErrorObj({
          error: true,
          message: 'User Login Failed!'
        });
      }
    }
  });

  const { handleSubmit, handleChange } = formik;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/users');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', backgroundColor: '#333' }}
    >
      <Card
        sx={{
          textAlign: 'center',
          width: '50%',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)'
        }}
      >
        <CardContent>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              autoFocus
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
              value={formik.values.email}
              onChange={handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
              value={formik.values.password}
              onChange={handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            {errorObj.error && (
              <Box mt={2}>
                <Alert severity="error">{errorObj.message}</Alert>
              </Box>
            )}
            <Box mt={2}>
              <Button
                color="error"
                size="large"
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbarSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbarSuccess}
      >
        <Alert onClose={handleCloseSnackbarSuccess} severity="success" sx={{ width: '100%' }}>
          User login successful!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbarError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbarError}
      >
        <Alert onClose={handleCloseSnackbarError} severity="error" sx={{ width: '100%' }}>
          User login failed!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
