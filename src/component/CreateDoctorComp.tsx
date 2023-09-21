import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Hb from '../reusable/Hb';
import TextBox from '../reusable/TextBox';
import { ClickButton, SubmitButton } from '../reusable/Button';
import { post, put } from '../service/doctor.service';
import { uploadFile } from '../service/curd.service';
import { useLoadContext } from '../reusable/LoaderContext';
import { doctorValueType } from '../type/type';
import CheckBox from '../reusable/CheckBox';
import Icons from '../reusable/Icons';
import TimePicker from '../reusable/TimePickerRe';
import DatePickerRe from '../reusable/DatePickerRe';
import SearchSelect from '../reusable/SearchSelect';
import { genderEnum } from '../lib/enum';
import { convertEnumToArray, imagePath } from '../lib';
import AddressForm from '../reusable/AddressForm';
import msg from '../lib/msg';

const availableDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

const selectedTimeInitialState = [{ from: null, to: null }];

const CreateDoctorComp = () => {
  const navigate = useNavigate();
  const [formikInitialValue, setFormikInitialValue] = useState<doctorValueType>(
    {
      name: '',
      specialist: '',
      address: '',
      availableTime: [{ from: null, to: null }],
      timePerPatient: '',
      availableDay: availableDays,
      licenseNo: '',
      licenseExpiryDate: '',
      email: '',
      gender: '',
      phone: '',
      alternatePhone: '',
      fileName: '',
      zipCode: '',
    },
  );
  const [selectedTime, setSelectedTime] = useState(selectedTimeInitialState);
  // const [availableDay, setAvailableDay] = useState<any>(availableDays);
  const location = useLocation();
  const { setLoader } = useLoadContext();

  useEffect(() => {
    const { state } = location;
    if (state?._id) {
      setFormikInitialValue({
        ...state,
        licenseExpiryDate: new Date(state.licenseExpiryDate),
      });
      setSelectedTime(state.availableTime);
    } else {
      console.log('else state is here');
    }
  }, [location.state]);

  const onSubmit = (values: any, { setErrors, setFieldValue, resetForm }: any) => {
    values.availableTime = selectedTime;
    values.timePerPatient = '10';
    console.log(values);

    if (values._id) updateDoctor(values, resetForm, setErrors);
    else createDoctor(values, resetForm, setErrors);
  };

  const updateDoctor = async (values: doctorValueType, resetForm: Function, setErrors: Function) => {
    setLoader(true);
    const result = await put(values._id, values);
    console.log('result', result.status);
    setLoader(false);
    if (result.status === 200) {
      if (values.fileName) await uploadImage(values);
      toast.success('Doctor updated successfully');
      navigate('/list-doctor');
    } else if (result.status === 409) {
      const { data } = result;
      toast.error(data.message);
    } else {
      toast.error('Oops! Something went wrong. Please try again later.');
    }
  };
  const createDoctor = async (values: doctorValueType, resetForm: Function, setErrors: Function) => {
    setLoader(true);
    const result = await post(values);
    console.log('result', result.status);
    setLoader(false);
    if (result.status === 409) {
      toast.error('Doctor already exists');
      return;
    }
    if (result.status !== 201) {
      toast.error('Oops! Something went wrong. Please try again later.');
      return;
    }

    toast.success('Doctor created successfully');

    if (values.fileName) await uploadImage(values);
    handleReset(resetForm);
  };

  const uploadImage = async (values) => {
    console.log('uploadImage', values);
    const path = imagePath('doctor', values.fileName).setUrl;
    const { file } = values;
    const result = await uploadFile({ file, path });
    console.log('result', result);
  };

  const handleReset = (resetForm: Function): void => {
    if (formikInitialValue._id) navigate('/list-doctor');

    resetForm();
    console.log('selectedTime', selectedTime);
    setSelectedTime([{ from: null, to: null }]);
    // navigate("/dummy", { state: { backToNavigate: '/create-doctor'} });
  };

  const onHandleCheckBox = (isChecked: boolean, name: any, setFieldValue: any, _availableDays) => {
    const data = { ..._availableDays, [name]: isChecked };
    setFieldValue('availableDay', data);
  };

  const availableDaysValidation = (value: any) => {
    let retValue = false;
    Object.keys(value).forEach((key) => {
      if (value[key] === true) retValue = true;
    });
    return retValue;
  };

  const availableTimeValidation = (value: any) => {
    let retValue = false;
    selectedTime.forEach((item) => {
      if (item.from && item.to) retValue = true;
    });
    return retValue;
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required()
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name must be less than 30 characters'),
    specialist: Yup.string()
      .required()
      .min(3, 'Specialist must be at least 3 characters')
      .max(30, 'Specialist must be less than 30 characters'),
    email: Yup.string()
      .email('Invalid email'),
    licenseNo: Yup.string(),
    licenseExpiryDate: Yup.date(),
    gender: Yup.string()
      .required()
      .oneOf(Object.keys(genderEnum)), // ["1", "2", "3"],
    phone: Yup.string().required('Phone is required'),
    alternatePhone: Yup.string(),
    fileName: Yup.string(),
    availableDay: Yup.object()
      .required('Please select at least one day')
      .test('availableDays', msg.ERR03, availableDaysValidation),
    availableTime: Yup.array()
      .required('Please select doctor available time')
      .test('availableTime', 'Please select doctor available time', availableTimeValidation),
  });

  const addTimeSheet = (setFieldValue: any, _availableTime) => {
    const lastSelectedTime = selectedTime.slice(
      selectedTime.length - 1,
      selectedTime.length,
    );
    if (!lastSelectedTime[0].from || !lastSelectedTime[0].to) {
      toast.info('Please select the From and To in the doctor available time');
      return;
    }
    console.log('lastSelectedTime', lastSelectedTime);
    setSelectedTime([...selectedTime, { from: null, to: null }]);
  };

  const removeTimeSheet = (setFieldValue: any, _availableTime) => {
    const updatedTime = selectedTime.slice(0, selectedTime.length - 1);
    setSelectedTime([...updatedTime]);
  };

  return (
    <div className="">
      <Hb text="Create Doctor" />
      <hr />
      <div>
        <Formik
          initialValues={formikInitialValue}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            handleSubmit, setFieldValue, setErrors, resetForm, ...parameter
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="row">
                  <div className="col md-9">
                    <div className="row">
                      <div className="col-md-3">
                        <TextBox heading="Name" id="name" parameter={parameter} />
                      </div>
                      <div className="col-md-3">
                        <TextBox heading="Specialist" id="specialist" parameter={parameter} />
                      </div>
                      <div className="col-md-3">
                        <TextBox heading="License No" id="licenseNo" parameter={parameter} />
                      </div>
                      <div className="col-md-3">
                        <DatePickerRe
                          heading="License Expiry Date"
                          id="licenseExpiryDate"
                          onChange={(id, date) => {
                  setFieldValue(id, date);
                }}
                          parameter={parameter}
                          minDate={new Date(new Date().getTime() + (24 * 60 * 60 * 1000))}
                          maxDate={new Date('20-20-2120')}
                          yearsRange={{
                  start: new Date().getFullYear(),
                  end: new Date().getFullYear() + 10,
                }}
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
                        <TextBox heading="Phone" id="phone" required parameter={parameter} />
                      </div>
                      <div className="col-md-3">
                        <TextBox heading="Email Id" id="email" parameter={parameter} />
                      </div>
                      <div className="col-md-3">
                        <TextBox heading="Alternate Phone" id="alternatePhone" parameter={parameter} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    {/* <AvatarUpload
                      code='doctor'
                      id='fileName'
                      className='mt-3'
                      parameter={parameter}
                      setFieldValue={setFieldValue}
                    /> */}
                  </div>
                </div>

                <hr />
                <AddressForm
                  setFieldValue={setFieldValue}
                  parameter={parameter}
                />
                <hr />
                <div className="mt-3">
                  <h6>Select doctor available Days</h6>
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day: string) => (
                    <CheckBox
                      label={day}
                      name={day.toLowerCase()}
                      keyValue={day}
                      id={day.toLowerCase()}
                      checked={parameter.values.availableDay[day.toLowerCase()]}
                      onChange={(isChecked, name) => onHandleCheckBox(isChecked, name, setFieldValue, parameter.values.availableDay)}
                    />
                  ))}

                  {parameter.touched.availableDay && (<div id="error-days" className="text-danger">{parameter.errors.availableDay}</div>)}
                </div>

                <div className="col-md-6 ">
                  <div className="border rounded p-4 mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6>Select doctor available time</h6>
                      <div className="d-flex">
                        <h6 className="pointer mr-2" id="time-add" onClick={() => addTimeSheet(setFieldValue, selectedTime)}>
                          {' '}
                          <Icons icon="addCircle" size={20} />
                          {' '}
                        </h6>
                        {selectedTime.length > 1 && (
                        <h6 className="pointer" id="time-sub" onClick={() => removeTimeSheet(setFieldValue, selectedTime)}>
                <Icons icon="subCircle" size={20} />
                {' '}
              </h6>
                        )}
                      </div>
                    </div>
                    {selectedTime.map((obj, index) => (
                      <div>
                        <TimePicker
                          setFieldValue={setFieldValue}
                          setSelectedTime={setSelectedTime}
                          selectedTime={selectedTime}
                          index={index}
                        />
                      </div>
                    ))}
                  </div>
                  {parameter.touched.availableTime && (<div id="error-time-piker" className="text-danger">{parameter.errors.availableTime}</div>)}
                </div>

                <div className="col-md-6" />
                <div className="col-md-6">
                  <br />
                  <div className="mt-3 d-flex justify-content-end">
                    <ClickButton
                      className="mx-4"
                      onClick={() => handleReset(resetForm)}
                      text="Cancel"
                      id="doctor-cancel"
                    />
                    <SubmitButton
                      id="doctor-submit"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateDoctorComp;
