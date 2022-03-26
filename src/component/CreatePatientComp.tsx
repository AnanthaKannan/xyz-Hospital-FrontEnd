import Hb from '../reusable/Hb'
import TextBox from '../reusable/TextBox'
import { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { targetType } from '@type/type';
import { ClickButton, SubmitButton } from '../reusable/Button';
 
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

  const validationSchema = Yup.object({
    name: Yup.string()
      .required()
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name must be less than 30 characters'),
    age: Yup.number().required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be integer'),
    email: Yup.string().email('Invalid email address'),
    phone: Yup.string(),
    dob: Yup.string(),
    password: Yup.string()
  });

  
  const onHandleChange =  (e:any, handleChange:Function) => {
    const element = {
      target:{
        id: e.target.id,
        value: e.target.value.trimStart()
      }
    }
    handleChange(element)
  }

  const onSubmit = (values:any) => {
    alert()
    console.log(values);
    // resetForm();
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
                      onChange={(e) => onHandleChange(e, handleChange)}
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