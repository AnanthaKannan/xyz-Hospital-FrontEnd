import * as Yup from 'yup';

export const patientRecordValidation = Yup.object({
  disease: Yup.string()
    .required()
    .min(3, 'Disease must be at least 3 characters')
    .max(30, 'Disease must be less than 30 characters'),
  doctor: Yup.string()
    .required('Doctor is required'),
  description: Yup.string()
    .required('Description is required')
});

export const forgotPasswordValidation = Yup.object().shape({
  code: Yup.string()
    .required('Required')
    .min(3, ' confirmation code not valid'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export const signUpValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')

});

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters')
});

export const changePasswordValidation = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters'),
  newPassword: Yup.string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});