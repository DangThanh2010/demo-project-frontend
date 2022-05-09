import { LoadingButton } from '@mui/lab';
import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../configs';
import { axiosPost } from '../../utils/axios';
import { ToastTopHelper } from '../../utils/utils';
import { registerValidationSchema } from '../../utils/validation';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onRegister = async ({ email, password, role}) => {
    setIsLoading(true);
    const { success, data } = await axiosPost(API.AUTH.REGISTER, {
      email,
      password,
      role
    });
    setIsLoading(false);
    if (success) {
      if(data.success) {
        ToastTopHelper.success('Register successfully.');
        navigate('/login');
      } else {
        ToastTopHelper.error('Email is used.');
      }
    }
  };

  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: 0
    },
    validationSchema: registerValidationSchema,
    onSubmit: onRegister,
  });

  return (
    <div style={{ background: '#EEEEEE' }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="space-between"
        sx={{ pt: 8, pb: 8, minHeight: '100vh' }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Paper variant="outlined" sx={{ pt: 4, pb: 4, pl: 2, pr: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ mb: 4 }}>
                {' '}
                REGISTER
              </Typography>
              <TextField
                margin="normal"
                id="email"
                placeholder="Email"
                fullWidth
                variant="standard"
                value={values.email}
                helperText={touched.email ? errors.email : ''}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                error={!!errors.email}
              />
              <TextField
                margin="normal"
                id="password"
                placeholder="Password"
                fullWidth
                variant="standard"
                type="password"
                value={values.password}
                helperText={touched.password ? errors.password : ''}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                error={!!errors.password}
              />
              <TextField
                margin="normal"
                id="confirmPassword"
                placeholder="Confirm Password"
                fullWidth
                variant="standard"
                type="password"
                value={values.confirmPassword}
                helperText={
                  touched.confirmPassword ? errors.confirmPassword : ''
                }
                onChange={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={!!errors.confirmPassword}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.role}
                  label="Age"
                  onChange={handleChange('role')}
                >
                  <MenuItem value={0}>Admin</MenuItem>
                  <MenuItem value={1}>User</MenuItem>
                </Select>
              </FormControl>

              <LoadingButton
                loading={isLoading}
                variant="contained"
                disabled={!isValid || isLoading}
                onClick={handleSubmit}
                fullWidth
                sx={{ mt: 4 }}
              >
                {' '}
                Register{' '}
              </LoadingButton>

              <Typography sx={{ mt: 4, mb: 4 }}>
                {'You have an account? '}
                <Link to="/login">Log in.</Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
