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
import { patientValueType, availableDayType } from '../type/type';
import CheckBox from '../reusable/CheckBox';
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr';
import TimePicker from "../reusable/TimePickerRe";

const availableDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false
}

const CreateDoctorComp = () => {

  const [formikInitialValue, setFormikInitialValue] = useState<patientValueType>({
    name: "",
    _hospitalId: "",
    specialist: "",
    availableTime: [{ from: "", to: "" }],
    timePerPatient: "",
    availableDay: availableDays,
  });
  const [selectedTime, setSelectedTime] = useState([{
    from: null, to: null
  }])
  const [availableDay, setAvailableDay] = useState<any>(availableDays)

  const { setLoader } = useLoadContext();

  const onSubmit = (values:patientValueType, { setErrors, setFieldValue, resetForm}: any) => {
    console.log(values);
    createPatient(values, resetForm, setErrors);
    // resetForm();
  }

  const createPatient = async(values: patientValueType, resetForm: Function, setErrors:Function) => {
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

  const onHandleCheckBox = (isChecked: boolean, name: any) => {
    setAvailableDay({...availableDay, [name]: isChecked})
  }

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

  const addTimeSheet = () => {
    const lastSelectedTime = selectedTime.slice(selectedTime.length -1, selectedTime.length);
    if(!lastSelectedTime[0].from || !lastSelectedTime[0].to){
      toast.info("Please select the From and To in the doctor available time");
      return
    }
    console.log('lastSelectedTime', lastSelectedTime)
    setSelectedTime([...selectedTime, { from: null, to: null }])
  }


  const removeTimeSheet = () => {
    const updatedTime = selectedTime.slice(0, selectedTime.length - 1);
    setSelectedTime([...updatedTime])
  }

  return (
    <div className=''>
         <Hb text='Create Doctor' />
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
                      heading='Time Per Patient'
                      id='timePerPatient'
                      onChange={(e) => onHandleChange(e, handleChange)}
                      value={values.timePerPatient}
                      errorMsg={touched.timePerPatient && errors.timePerPatient}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextBox
                      heading='Specialist'
                      id='specialist'
                      onChange={(e) => onHandleChange(e, handleChange)}
                      value={values.specialist}
                      errorMsg={touched.specialist && errors.specialist}
                    />
                  </div>
                 

                  <div className='mt-3'>
              <h6>Select doctor available Days</h6>
              {
                ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day: string) => {
                  return <CheckBox label={day} name={day.toLowerCase()}
                  checked={availableDay[day.toLowerCase()]}
                  onChange={onHandleCheckBox} />
                })
              }
                
            </div>

            <div className="col-md-6 ">
                <div className='border rounded p-4'>
                  <div className='d-flex justify-content-between align-items-center'>
                  <h6>Select doctor available time</h6>
                  <div className='d-flex'>
                    <h6 className='pointer mr-2' onClick={addTimeSheet} > <GrAddCircle size={20}/> </h6>
                    { selectedTime.length > 1 && <h6 className='pointer' onClick={removeTimeSheet}> 
                    <GrSubtractCircle size={20}/> </h6> }
                  </div>
                  </div>
                  {
                    selectedTime.map((obj, index )=> <TimePicker 
                      setSelectedTime={setSelectedTime} 
                      selectedTime={selectedTime}
                      index={index} />)
                  }
                </div>
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

export default CreateDoctorComp;