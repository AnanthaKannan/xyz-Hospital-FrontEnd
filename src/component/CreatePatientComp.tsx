import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Hb from '../reusable/Hb';
import TextBox from '../reusable/TextBox';
import { ClickButton, SubmitButton } from '../reusable/Button';
import {
  imagePath, convertEnumToArray, fromDateToAgeConverter, getInitialValuesFromYup,
} from '../lib';
import { addPatient, updatePatient, uploadFile } from '../service/patient.service';
import { useLoadContext } from '../reusable/LoaderContext';
import { patientDetailsType } from '../type/type';
import DatePickerRe from '../reusable/DatePickerRe';
import { createPatientValidation } from '../lib/validationSchema';
import SearchSelect from '../reusable/SearchSelect';
import { genderEnum, martialStatusEnum } from '../lib/enum';
import AddressForm from '../reusable/AddressForm';

const CreatePatientComp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formikInitialValue, setFormikInitialValue] = useState<patientDetailsType>(getInitialValuesFromYup({ ...createPatientValidation, file: null }));

  useEffect(() => {
    // eslint-disable-next-line prefer-destructuring
    const state: any = location.state;
    console.log(state);
    if (state?._id) {
      setFormikInitialValue({
        ...state,
        age: fromDateToAgeConverter(state.dob),
        dob: new Date(state.dob),
      });
    } else {
      console.log('else state is here');
    }
  }, [location.state]);

  const { setLoader } = useLoadContext();

  const onSubmit = (values: patientDetailsType, { setErrors, setFieldValue, resetForm }: any) => {
    console.log(values);
    if (values._id) updatePatient_(values, resetForm, setErrors);
    else createPatient(values, resetForm, setErrors);
    // resetForm();
  };

  const createPatient = async (values: patientDetailsType, resetForm: Function, setErrors: Function) => {
    setLoader(true);
    const result = await addPatient(values);
    console.log('result', result.status);
    setLoader(false);
    if (result.status === 409) {
      const { data } = result;
      toast.error(data.message);
      return;
    }
    if (result.status !== 201) {
      toast.error('Oops! Something went wrong. Please try again later.');
      return;
    }

    toast.success('Patient created successfully.');
    console.log('Patient added successfully');
    if (values.fileName) { await uploadImage(values); }

    resetForm();
  };

  const updatePatient_ = async (values: patientDetailsType, resetForm: Function, setErrors: Function) => {
    console.log('updatePatient_', values);
    setLoader(true);
    const result = await updatePatient(values._id, values);
    console.log('result', result.status);
    setLoader(false);
    if (result.status === 409) {
      const { data } = result;
      toast.error(data.message);
      return;
    }
    if (result.status !== 200) {
      toast.error('Oops! Something went wrong. Please try again later.');
      return;
    }

    if (result.status === 200) {
      toast.success('Patient updated successfully.');
      if (values.fileName) await uploadImage(values);
      navigate('/list-patient');
    }
  };

  const uploadImage = async (values) => {
    console.log('uploadImage', values);
    const path = imagePath('patient', values.fileName).setUrl;
    const { file } = values;
    const result = await uploadFile({ file, path });
    console.log('result', result);
  };

  const handleReset = (setFieldValue: Function, resetForm: Function): void => {
    if (document.getElementById('fileName')) {
      (document.getElementById('fileName') as HTMLInputElement).value = '';
    }
    resetForm();
  };

  return (
    <div className="">
      <Hb text="Patient Registration" />
      <hr />
      <div>
        <Formik
          initialValues={formikInitialValue}
          enableReinitialize
          validationSchema={createPatientValidation}
          onSubmit={onSubmit}
        >
          {({
            handleSubmit, setFieldValue, setErrors, resetForm, ...parameter
          }) => (
            <form onSubmit={handleSubmit}>

              <div className="row">
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-3">

                      <TextBox
                        heading="First Name"
                        required
                        id="firstName"
                        parameter={parameter}
                      />
                    </div>
                    <div className="col-md-3">

                      <TextBox
                        heading="Middle Name"
                        id="middleName"
                        parameter={parameter}
                      />
                    </div>
                    <div className="col-md-3">

                      <TextBox
                        heading="Last Name"
                        id="lastName"
                        parameter={parameter}
                      />
                    </div>
                    <div className="col-md-3">
                      <SearchSelect
                        options={convertEnumToArray(genderEnum)}
                        setFieldValue={setFieldValue}
                        heading="Gender"
                        id="gender"
                        required
                        parameter={parameter}
                      />
                    </div>
                    <div className="col-md-3">
                      <DatePickerRe
                        required
                        onChange={(id, date) => {
                          setFieldValue('age', fromDateToAgeConverter(date));
                          setFieldValue('dob', date);
                        }}
                        parameter={parameter}
                        id="dob"
                        heading="Date Of Birth"
                        minDate={new Date('20-20-1970')}
                        maxDate={new Date()}
                        yearsRange={{
                          start: 1970,
                          end: new Date().getFullYear() + 1,
                        }}
                      />
                    </div>

                    <div className="col-md-3">
                      <TextBox
                        heading="Age"
                        id="age"
                        readOnly
                        parameter={parameter}
                      />
                    </div>

                    <div className="col-md-3">
                      <TextBox
                        heading="Phone"
                        id="phone"
                        required
                        parameter={parameter}
                      />
                    </div>
                    <div className="col-md-3">
                      <TextBox
                        heading="Email Id"
                        id="email"
                        parameter={parameter}
                      />
                    </div>

                    <div className="col-md-3">

                      <TextBox
                        heading="Aadhaar Number"
                        id="aadhaarNumber"
                        parameter={parameter}
                      />
                    </div>

                    <div className="col-md-3">
                      <SearchSelect
                        options={convertEnumToArray(martialStatusEnum)}
                        setFieldValue={setFieldValue}
                        heading="Martial status"
                        id="martialStatus"
                        required
                        parameter={parameter}
                      />
                    </div>

                    <div className="col-md-3">
                      <TextBox
                        heading="Occupation"
                        id="occupation"
                        parameter={parameter}
                      />
                    </div>
                    <div className="col-md-3">
                      <TextBox
                        heading="Idenity No"
                        id="idenityNo"
                        parameter={parameter}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  {/* <AvatarUpload
                    code='patient'
                    id='fileName'
                    className='mt-3'
                    parameter={parameter}
                    setFieldValue={setFieldValue}
                  /> */}
                </div>
                <hr />
                <AddressForm
                  setFieldValue={setFieldValue}
                  parameter={parameter}
                />

              </div>

              <div className="row">

                <div className="col-md-9">
                  <div className="mt-3 d-flex justify-content-end">
                    {
                      formikInitialValue._id
                        ? (
                          <div>
                            <ClickButton className="mx-4" onClick={() => navigate('/list-patient')} text="Cancel" id="patient-cancel" />
                            <SubmitButton
                              text="Update"
                              id="patient-submit"
                            />
                          </div>
                        )
                        : (
                          <div>
                            <ClickButton className="mx-4" onClick={() => handleReset(setFieldValue, resetForm)} text="Cancel" id="patient-cancel" />
                            <SubmitButton
                              id="patient-submit"
                            />
                          </div>
                        )
                    }

                  </div>
                </div>
              </div>

            </form>
          )}
        </Formik>
      </div>
      <br />
      <br />

    </div>
  );
};

export default CreatePatientComp;
