import Hb from '../reusable/Hb'
import TextBox from '../reusable/TextBox'
import { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { ClickButton, SubmitButton } from '../reusable/Button';
import { onHandleChange, convertToDigit } from '../lib';
import { addPatient } from '../service/patient.service';
import { toast } from 'react-toastify';
import { useLoadContext } from '../reusable/LoaderContext';

 
type formikInitialValueType = {
  name: string,
  age: string,
  email: string,
  phone: string,
  dob: string,
  password: string
}

const CreatePatientComp = () => {

  const [formikInitialValue, setFormikInitialValue] = useState<formikInitialValueType>({
    name: "",
    age: '',
    email: "",
    phone: "",
    dob: '',
    password: ""
  });

  const { setLoader } = useLoadContext();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required()
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name must be less than 30 characters'),
    age: Yup.string().required('Age is required').min(1, 'Age must be at least 1 characters').max(3, 'Age must be less than 3 characters'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    dob: Yup.string().required('Date of birth is required'),
    password: Yup.string()
  });

  const onSubmit = (values:formikInitialValueType, { setErrors, setFieldValue, resetForm}: any) => {
    console.log(values);
    createPatient(values, resetForm, setErrors);
    // resetForm();
  }

  const createPatient = async(values: formikInitialValueType, resetForm: Function, setErrors:Function) => {
    setLoader(true);
    const result = await addPatient(values);
    console.log('result', result.status);
    setLoader(false);
    if (result.status === 409) {
      const data = result.data;
      toast.error(data.message);
      return
    }
    if(result.status !== 201) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }

      toast.success("Patient created successfully.");
      console.log('Patient added successfully');
      resetForm();
  }

  const handleReset = (setFieldValue: Function, resetForm: Function): void => {
    resetForm();
    // setFieldValue('name', '');
    // setFieldValue('age', null);
    // setFieldValue('email', '');
    // setFieldValue('phone', '');
    // setFieldValue('dob', null);
    // setFieldValue('password', '');
  }

 

  return (
    <div className=''>
      <Hb text='New Patient' />

      <div>
        <Formik 
          initialValues={formikInitialValue}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
            {({handleSubmit, handleChange, values, errors, touched, setFieldValue, setErrors, resetForm}) => (
              <form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-md-3">
                    <TextBox
                      heading='Name'
                      id='name'
                      onChange={(e) => onHandleChange(e, handleChange)}
                      value={values.name}
                      errorMsg={touched.name && errors.name}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextBox
                      heading='Email'
                      id='email'
                      onChange={(e) => onHandleChange(e, handleChange)}
                      value={values.email}
                      errorMsg={touched.email && errors.email}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextBox
                      heading='Age'
                      id='age'
                      onChange={(e) => {
                        setFieldValue('age', convertToDigit(e, 2))
                      }}
                      // onChange={(e) => onHandleChange(e, handleChange)}
                      value={values.age}
                      errorMsg={touched.age && errors.age}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextBox
                      heading='Phone'
                      id='phone'
                      onChange={(e) => onHandleChange(e, handleChange)}
                      value={values.phone}
                      errorMsg={touched.phone && errors.phone}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextBox
                      heading='Date of birth'
                      id='dob'
                      onChange={(e) => onHandleChange(e, handleChange)}
                      value={values.dob}
                      errorMsg={touched.dob && errors.dob}
                    />
                  </div>

                  <div className='mt-3 d-flex justify-content-end'>
                
                <ClickButton className='mx-4' onClick={() =>handleReset(setFieldValue, resetForm)} text="Cancel" color='default' id='patient-cancel' />
                <SubmitButton onSubmit={handleSubmit} text="Submit" id='patient-submit' />
  
                </div>
                </div>

             
              </form>
            )}
        </Formik>
      </div>
    </div>
  )
}

export default CreatePatientComp