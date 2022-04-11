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
