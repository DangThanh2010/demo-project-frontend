import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../configs';
import { axiosPost } from '../../utils/axios';
import { ToastTopHelper } from '../../utils/utils';
import { forgotPasswordValidationSchema } from '../../utils/validation';


const ForgotPassword = () => {;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);


  const onSend = async ({email})  => {
    setIsLoading(true);
    const { success, data } = await axiosPost(API.AUTH.FORGOT_PASSWORD, {
      email,
    });
    setIsLoading(false);
    if (success) {
      if(data.success) {
        ToastTopHelper.success('Send successfully, please check your email.');
        navigate('/resetPassword')
      } else {
        ToastTopHelper.error('Send unsuccessfully, please send your email again.');
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
      
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: onSend,
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
                SEND YOUR EMAIL TO RECEIVE TOKEN FOR RESET PASSWORD
              </Typography>
              <TextField
                margin="normal"
                id="name"
                placeholder="Email"
                fullWidth
                variant="standard"
                value={values.email}
                helperText={touched.email ? errors.email : ''}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                error={!!errors.email}
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
                Send{' '}
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

export default ForgotPassword;
