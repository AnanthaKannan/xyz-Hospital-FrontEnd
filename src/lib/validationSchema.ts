import * as Yup from 'yup';
import { genderEnum, martialStatusEnum } from './enum';

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
    otherwise: Yup.string(),
  }),
  admittedOn: Yup.date().when('isAdmitted', {
    is: true,
    then: Yup.date().required('Admitted date is required'),
    otherwise: Yup.date(),
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
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),

});

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters'),
});

const passwordMatch = {
  regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).*$/,
  errorMessage: 'Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character'
}
export const changePasswordValidation = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters'),
  newPassword: Yup.string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters')
    .matches(passwordMatch.regex, passwordMatch.errorMessage),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

export const createPatientValidation = Yup.object({
  firstName: Yup.string()
    .required()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be less than 30 characters'),
  lastName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be less than 30 characters'),
  middleName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be less than 30 characters'),
  gender: Yup.string()
    .required()
    .oneOf(Object.keys(genderEnum)), // ["1", "2", "3"]
  martialStatus: Yup.string()
    .required('Martial status is required')
    .oneOf(Object.keys(martialStatusEnum)), // ["1", "2", "3"]
  age: Yup.string(),
  email: Yup.string()
    .email('Invalid email address'),
  phone: Yup.string().required('Phone is required'),
  dob: Yup.string().required('Date of birth is required'),
  aadhaarNumber: Yup.string()
    .min(12, 'Aadhaar number must be at least 12 characters'),
  idenityNo: Yup.string()
    .min(3, 'Idenity No must be at least 3 characters')
    .max(12, 'Idenity No must be less than 12 characters'),
  occupation: Yup.string()
    .min(3, 'Occupation must be at least 3 characters')
    .max(30, 'Occupation must be less than 30 characters'),
  address: Yup.string()
    .required()
    .min(3, 'Address must be at least 3 characters')
    .max(30, 'Address must be less than 30 characters'),
  city: Yup.string()
    .required(),
  state: Yup.string()
    .required(),
  country: Yup.string()
    .required(),
  zipCode: Yup.string()
    .min(3, 'Zip code must be at least 3 characters')
    .max(30, 'Zip code must be less than 30 characters'),

  fileName: Yup.string(),
  // .required('File is required')
  // .test('fileSize', 'File size must be less than 2MB', value => validation(value))
});

export const profileDetailsValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  name: Yup.string()
    .required('Required')
    .min(3, 'Name must be at least 6 characters')
    .max(30, 'Name must be less than 20 characters'),
  picture: Yup.string(),
  address: Yup.string()
    .required('Required')
    .min(6, 'Address must be at least 6 characters')
    .max(100, 'Address must be less than 100 characters'),
  phone_number: Yup.string().required('Phone is required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters')
    .matches(passwordMatch.regex, passwordMatch.errorMessage),
});
