import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/auth';
import { ToastTopHelper } from '../../utils/utils';
import { loginValidationSchema } from '../../utils/validation';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [account, isLoggedIn, isLoggingIn] = useSelector((state) => [
    state.auth.account,
    state.auth.isLoggedIn,
    state.auth.isLoggingIn,
  ]);

  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
      ToastTopHelper.success('Login successfully.');
    }
  }, [account, isLoggedIn]);
  
  const onLogin = (data)  => {
    dispatch(login(data));
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
    },
    validationSchema: loginValidationSchema,
    onSubmit: onLogin,
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
                LOG IN
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
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                sx={{ mt: 4, mb: 4 }}
              >
                <Grid item>
                  <Link to="/forgotPassword">Forgot password?</Link>
                </Grid>
              </Grid>

              <LoadingButton
                loading={isLoggingIn}
                loadingPosition="start"
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={!isValid || isLoggingIn}
              >
                {' '}
                Login{' '}
              </LoadingButton>

              <Typography sx={{ mt: 4, mb: 4 }}>
                {"You don't have account? "}
                <Link to="/register">Register now.</Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
