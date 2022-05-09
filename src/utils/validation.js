import * as yup from 'yup';

export const nameValidator = yup.string().required('Name is required');

const emailValidator = yup
  .string()
  .email('Email is not valid')
  .required('Email is required');

const passwordValidator = yup
  .string()
  .min(8, ({ min }) => `Password must be at least ${min} characters`)
  .required('Password is required');

const confirmPasswordValidator = yup
  .string()
  .oneOf(
    [yup.ref('password'), null],
    'Confirm password must be same as password'
  )
  .required('Confirm password is required');

export const loginValidationSchema = yup.object().shape({
  email: emailValidator,
  password: passwordValidator,
});

export const registerValidationSchema = yup.object().shape({
  email: emailValidator,
  password: passwordValidator,
  confirmPassword: confirmPasswordValidator,
});

export const forgotPasswordValidationSchema = yup.object().shape({
  email: emailValidator,
});

export const resetPasswordValidationSchema = yup.object().shape({
  token: yup.string().required('Token is required'),
  password: passwordValidator,
});

