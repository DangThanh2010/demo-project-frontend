import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../configs';
import { axiosPost } from '../../utils/axios';
import { ToastTopHelper } from '../../utils/utils';
import { resetPasswordValidationSchema } from '../../utils/validation';


const ResetPassword = () => {;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onReset = async ({token, password})  => {
    setIsLoading(true);
    const { success, data } = await axiosPost(API.AUTH.RESET_PASSWORD, {
      token,
      password
    });
    setIsLoading(false);
    if (success) {
      if(data.success) {
        ToastTopHelper.success('Reset password successfully.');
        navigate('/login');
      } else {
        ToastTopHelper.error('Reset password unsuccessfully, please try again.');
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
      token: '',
      password:'',
      
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: onReset,
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
                RESET PASSWORD
              </Typography>
              <TextField
                margin="normal"
                id="name"
                placeholder="Token"
                fullWidth
                variant="standard"
                value={values.token}
                helperText={touched.token ? errors.token : ''}
                onChange={handleChange('token')}
                onBlur={handleBlur('token')}
                error={!!errors.token}
              />
              <TextField
                margin="normal"
                id="subject"
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

              <LoadingButton
                loading={isLoading}
                variant="contained"
                disabled={!isValid || isLoading}
                onClick={handleSubmit}
                fullWidth
                sx={{ mt: 4 }}
              >
                {' '}
                Reset{' '}
              </LoadingButton>

              <Typography sx={{ mt: 4, mb: 4 }}>
                {"You have account? "}
                <Link to="/login">Login now.</Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResetPassword;
