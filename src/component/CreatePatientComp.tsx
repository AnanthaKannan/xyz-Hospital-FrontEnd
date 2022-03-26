import Hb from '../reusable/Hb'
import TextBox from '../reusable/TextBox'
import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { ClickButton, SubmitButton } from '../reusable/Button';
import { onHandleChange, convertToDigit } from '../lib';
import { addPatient, updatePatient } from '../service/patient.service';
import { toast } from 'react-toastify';
import { useLoadContext } from '../reusable/LoaderContext';
import {useLocation, useNavigate} from 'react-router-dom';
import { patientDetailsType } from '../type/type';
import DatePickerRe from '../reusable/DatePickerRe';

const CreatePatientComp = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [formikInitialValue, setFormikInitialValue] = useState<patientDetailsType>({
    name: "",
    age: '',
    email: "",
    phone: "",
    dob: '',
    password: ""
  });

  useEffect(() => {
    const state: any = location.state;
    console.log(state)
    if (state?._id) {
      setFormikInitialValue({
        _id: state._id,
        name: state.name,
        age: state.age,
        email: state.email,
        phone: state.phone,
        dob: state.dob,
        password: state.password
      })
    }
    else{
      console.log('else state is here')
    }
  },[])
  
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

  const onSubmit = (values:patientDetailsType, { setErrors, setFieldValue, resetForm}: any) => {
    console.log(values);
    if(values._id)
      updatePatient_(values, resetForm, setErrors);
    else
      createPatient(values, resetForm, setErrors);

    
    // resetForm();
  }

  const createPatient = async(values: patientDetailsType, resetForm: Function, setErrors:Function) => {
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

  const updatePatient_ = async(values: patientDetailsType, resetForm: Function, setErrors:Function) => {
    console.log('updatePatient_', values);
    setLoader(true);
    const result = await updatePatient(values._id ,values);
    console.log('result', result.status);
    setLoader(false);
    if (result.status === 409) {
      const data = result.data;
      toast.error(data.message);
      return
    }
    else if(result.status !== 200) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    
    if(result.status === 200) {
      toast.success("Patient updated successfully.");
      navigate('/list-patient');
    }
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
                  {/* <DatePickerRe 
                    onChange={handleChange}
                    id='dob'
                    value={values.dob}
                    errorMsg={touched.dob && errors.dob}
                    heading='DOB' 
                    /> */}

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
                  {/* <div className="col-md-3">
                    <TextBox
                      heading='Date of birth'
                      id='dob'
                      onChange={(e) => onHandleChange(e, handleChange)}
                      value={values.dob}
                      errorMsg={touched.dob && errors.dob}
                    />
                  </div> */}

                  <div className='mt-3 d-flex justify-content-end'>
                    {
                      formikInitialValue._id ?
                <div>
                    <ClickButton className='mx-4' onClick={() => navigate('/list-patient')} text="Cancel" color='default' id='patient-cancel' />
                    <SubmitButton onSubmit={handleSubmit} text="Update" id='patient-submit' />
                </div>
                :
                <div>
                  <ClickButton className='mx-4' onClick={() =>handleReset(setFieldValue, resetForm)} text="Cancel" color='default' id='patient-cancel' />
                  <SubmitButton onSubmit={handleSubmit} text="Submit" id='patient-submit' />
                </div>
                    }
               
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