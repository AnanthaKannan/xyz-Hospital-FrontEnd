import Hb from '../reusable/Hb'
import TextBox from '../reusable/TextBox'
import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { ClickButton, SubmitButton } from '../reusable/Button';
import { onHandleChange, imgUploadPath, convertEnumToArray, fromDateToAgeConverter } from '../lib';
import { addPatient, updatePatient, uploadFile } from '../service/patient.service';
import { toast } from 'react-toastify';
import { useLoadContext } from '../reusable/LoaderContext';
import {useLocation, useNavigate} from 'react-router-dom';
import { patientDetailsType } from '../type/type';
import DatePickerRe from '../reusable/DatePickerRe';
import FileUpload from '../reusable/FileUpload';
import {createPatientValidation } from '../lib/validationSchema'
import SearchSelect from '../reusable/SearchSelect';
import { genderEnum, martialStatusEnum } from '../lib/enum'
import AddressForm from '../reusable/AddressForm';

const CreatePatientComp = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [formikInitialValue, setFormikInitialValue] = useState<patientDetailsType>({
    firstName: "",
    age: '',
    email: "",
    phone: "",
    dob: "",
    address: "",
    city: "",
    country: "",
    gender: "",
    state: "",
    aadhaarNumber: "",
    idenityNo: "",
    fileName: "",
    lastName: "",
    martialStatus: "",
    middleName: "",
    occupation: "",
    zipCode: ""
  });

  useEffect(() => {
    const state: any = location.state;
    console.log(state)
    if (state?._id) {
      setFormikInitialValue({
        ...state,
        age: fromDateToAgeConverter(state.dob),
        dob: new Date(state.dob)
      })
    }
    else{
      console.log('else state is here')
    }
  },[])
  
  const { setLoader } = useLoadContext();


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
      if(values.fileName) 
        await uploadImage(values);
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
      if(values.fileName) 
        await uploadImage(values);
      navigate('/list-patient');
    }
  }

  const uploadImage = async( values) => {
    alert()
    console.log('uploadImage', values);
    const _hospitalId = sessionStorage.getItem("hospitalId");
    const path = imgUploadPath('patientImg', _hospitalId);
    const file = values.file;
    const result = await uploadFile({file, path});
    console.log('result', result);
  }


  const handleReset = (setFieldValue: Function, resetForm: Function): void => {

    if(document.getElementById('fileName')){
      (document.getElementById('fileName') as HTMLInputElement).value = "";
    }
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
      <Hb text='Patient Registration' />
      <hr />
      <div>
        <Formik 
          initialValues={formikInitialValue}
          enableReinitialize={true}
          validationSchema={createPatientValidation}
          onSubmit={onSubmit}>
            {({handleSubmit, setFieldValue, setErrors, resetForm, ...parameter}) => (
              <form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-md-3">
                  
                    <TextBox
                      heading='First Name'
                      required={true}
                      id='firstName'
                      parameter={parameter}
                    />
                  </div>
                  <div className="col-md-3">
                  
                  <TextBox
                    heading='Middle Name'
                    id='middleName'
                    parameter={parameter}
                  />
                </div>
                <div className="col-md-3">
                  
                  <TextBox
                    heading='Last Name'
                    id='lastName'
                    parameter={parameter}
                  />
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3">
                  <DatePickerRe 
                    required={true}
                    onChange={(id, date) => {
                      setFieldValue('age', fromDateToAgeConverter(date));
                      setFieldValue('dob', date);
                    }}
                    parameter={parameter}
                    id='dob'
                    heading='DOB' 
                    />
                  </div>

                  <div className="col-md-3">
                    <TextBox
                      heading='Age'
                      id='age'
                      readOnly={true}
                      parameter={parameter}
                    />
                  </div>

                  <div className="col-md-3">
                    <SearchSelect 
                      options={convertEnumToArray(genderEnum)}
                      setFieldValue={setFieldValue}
                       heading='Gender'
                       id='gender'
                       required={true}
                       parameter={parameter}
                    />
                  </div>
                  <div className="col-md-3"></div>
                  <div className="col-md-3">
                    <TextBox
                      heading='Phone'
                      id='phone'
                      required={true}
                      parameter={parameter}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextBox
                      heading='Email Id'
                      id='email'
                      parameter={parameter}
                    />
                  </div>

                <div className="col-md-3">
                  
                  <TextBox
                    heading='Aadhaar Number'
                    id='aadhaarNumber'
                    parameter={parameter}
                  />
                </div>
                  
                 
                  <div className="col-md-3"></div>
                 
                 

        
                  {/* <div className="col-md-3">
                    <FileUpload
                      heading='Upload Image'
                      value={values.fileName}
                      id='fileName'
                      onChange={(e) => {
                        try{
                        values.file = e.target.files[0];
                        setFieldValue('fileName', e.target.files[0].name)
                        }
                        catch(e){
                          console.log('e', e);
                        }
                      }
                      }
                      errorMsg={touched.fileName && errors.fileName}
                      />
                  </div> */}


                
                  <div className="col-md-3">
                  <SearchSelect 
                      options={convertEnumToArray(martialStatusEnum)}
                      setFieldValue={setFieldValue}
                       heading='Martial status'
                       id='martialStatus'
                       required={true}
                       parameter={parameter}
                    />
                  </div>
                 
                  <div className="col-md-3">
                    <TextBox
                      heading='Occupation'
                      id='occupation'
                      parameter={parameter}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextBox
                      heading='Idenity No'
                      id='idenityNo'
                      parameter={parameter}
                    />
                  </div>
                  
                  <hr />
                  <AddressForm 
                   setFieldValue={setFieldValue}
                parameter={parameter} 
                />

                </div>

                <div className="row">

             <div className="col-md-9">
                  <div className='mt-3 d-flex justify-content-end'>
                    {
                      formikInitialValue._id ?
                <div>
                    <ClickButton className='mx-4' onClick={() => navigate('/list-patient')} text="Cancel" id='patient-cancel' />
                    <SubmitButton 
                    text="Update" id='patient-submit' />
                </div>
                :
                <div>
                  <ClickButton className='mx-4' onClick={() =>handleReset(setFieldValue, resetForm)} text="Cancel" id='patient-cancel' />
                  <SubmitButton 
                  id='patient-submit' />
                </div>
                    }
               
                </div>
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