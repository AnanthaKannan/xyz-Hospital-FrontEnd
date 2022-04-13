import * as Yup from 'yup';

export const patientRecordValidation = Yup.object({
  diagnosis: Yup.string()
    .required()
    .min(3, 'Disease must be at least 3 characters')
    .max(30, 'Disease must be less than 30 characters'),
  _doctorId: Yup.string()
    .required('Doctor is required'),
  description: Yup.string()
    .required('Description is required'),
  isAdmitted: Yup.boolean(),
  roomNo: Yup.string().when('isAdmitted', {
    is: true,
    then: Yup.string().required('Room number is required'),
    otherwise: Yup.string()
  }),
  admittedOn: Yup.date().when('isAdmitted', {
    is: true,
    then: Yup.date().required('Admitted date is required'),
    otherwise: Yup.date()
  }),
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

export const createPatientValidation = Yup.object({
  name: Yup.string()
    .required()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be less than 30 characters'),
  age: Yup.string().required('Age is required').min(1, 'Age must be at least 1 characters').max(3, 'Age must be less than 3 characters'),
  email: Yup.string()
    .email('Invalid email address'),
  phone: Yup.string().required('Phone is required'),
  dob: Yup.string().required('Date of birth is required'),
  password: Yup.string(),
  // fileName: Yup.string()
  // .required('File is required')
  // .test('fileSize', 'File size must be less than 2MB', value => validation(value))
});