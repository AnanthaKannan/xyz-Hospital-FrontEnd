import Hb from "../reusable/Hb";
import TextBox from "../reusable/TextBox";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { ClickButton, SubmitButton } from "../reusable/Button";
import { onHandleChange, convertToDigit } from "../lib";
import { post, put } from "../service/doctor.service";
import { toast } from "react-toastify";
import { useLoadContext } from "../reusable/LoaderContext";
import { doctorValueType, availableDayType } from "../type/type";
import CheckBox from "../reusable/CheckBox";
import Icons from "../reusable/Icons";
import TimePicker from "../reusable/TimePickerRe";
import { useLocation, useNavigate } from "react-router-dom";
import DatePickerRe from '../reusable/DatePickerRe';
import AddressForm from "../reusable/AddressForm";

const availableDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

const selectedTimeInitialState = [ { from: null, to: null }]

const CreateDoctorComp = () => {
  const navigate = useNavigate();
  const [formikInitialValue, setFormikInitialValue] = useState<doctorValueType>(
    {
      name: "",
      _hospitalId: sessionStorage.getItem("hospitalId"),
      specialist: "",
      availableTime: [{ from: null, to: null }],
      timePerPatient: "",
      availableDay: availableDays,
    }
  );
  const [selectedTime, setSelectedTime] = useState(selectedTimeInitialState);
  // const [availableDay, setAvailableDay] = useState<any>(availableDays);
  const location = useLocation();
  const { setLoader } = useLoadContext();

  useEffect(() => {
    const state: any = location.state;
    console.log("mystateishere", state);
    if (state?._id) {
      setFormikInitialValue({
        _id: state._id,
        name: state.name,
        _hospitalId: sessionStorage.getItem("hospitalId"),
        specialist: state.specialist,
        availableTime: state.availableTime,
        timePerPatient: state.timePerPatient,
        availableDay: state.availableDay,
      });
      setSelectedTime(state.availableTime);
      // setAvailableDay(state.availableDay);
    } else {
      console.log("else state is here");
    }
  }, []);

  const onSubmit = (
    values: any,
    { setErrors, setFieldValue, resetForm }: any
  ) => {
    values.availableTime = selectedTime;
    // values.availableDay = availableDay;
    values._hospitalId = sessionStorage.getItem("hospitalId");
    values.timePerPatient = "10";
    console.log(values);

    if (values._id) updateDoctor(values, resetForm, setErrors);
    else createDoctor(values, resetForm, setErrors);
  };

  const updateDoctor = async ( values: doctorValueType, resetForm: Function, setErrors: Function ) => {
    setLoader(true);
    const result = await put(values._id, values);
    console.log("result", result.status);
    setLoader(false);
    if (result.status === 200) {
      toast.success("Doctor updated successfully");
      navigate("/list-doctor");
    } else if (result.status === 409) {
      const data = result.data;
      toast.error(data.message);
      return;
    } else {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
  };
const createDoctor = async ( values: doctorValueType, resetForm: Function, setErrors: Function ) => {
    setLoader(true);
    const result = await post(values);
    console.log("result", result.status);
    setLoader(false);
    if (result.status === 409) {
      const data = result.data;
      toast.error("Doctor already exists");
      return;
    }
    if (result.status !== 201) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }

    toast.success("Doctor created successfully");
    handleReset(resetForm);
  };

  const handleReset = (resetForm: Function): void => {
    if (formikInitialValue._id) navigate("/list-doctor");

    resetForm();
    console.log('selectedTime', selectedTime);
    setSelectedTime([{ from: null, to: null }]);
    // navigate("/dummy", { state: { backToNavigate: '/create-doctor'} });
  };

  const onHandleCheckBox = (isChecked: boolean, name: any, setFieldValue: any, _availableDays) => {
    const data = { ..._availableDays, [name]: isChecked };
    setFieldValue("availableDay", data);
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
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be less than 30 characters"),
    specialist: Yup.string()
      .required()
      .min(3, "Specialist must be at least 3 characters")
      .max(30, "Specialist must be less than 30 characters"),
    availableDay: Yup.object()
      .required("Please select at least one day")
      .test( "availableDays", "Please select atleast one day", availableDaysValidation ),
    availableTime: Yup.array()
      .required("Please select doctor available time")
      .test( "availableTime", "Please select doctor available time", availableTimeValidation ),
  });

  const addTimeSheet = (setFieldValue: any, _availableTime) => {
    const lastSelectedTime = selectedTime.slice(
      selectedTime.length - 1,
      selectedTime.length
    );
    if (!lastSelectedTime[0].from || !lastSelectedTime[0].to) {
      toast.info("Please select the From and To in the doctor available time");
      return;
    }
    console.log("lastSelectedTime", lastSelectedTime);
    setSelectedTime([...selectedTime, { from: null, to: null }]);
  };

  const removeTimeSheet = (setFieldValue: any, _availableTime) => {
    const updatedTime = selectedTime.slice(0, selectedTime.length - 1);
    setSelectedTime([...updatedTime]);
  };

  return (
    <div className="">
      <Hb text="Create Doctor" />
      <hr/>
      <div>
        <Formik
          initialValues={formikInitialValue}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, setFieldValue, setErrors, resetForm, ...parameter}) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-3">
                  <TextBox
                    heading="Name"
                    id="name"
                    parameter={parameter}
                  />
                </div>
                <div className="col-md-3">
                  <TextBox
                    heading="Specialist"
                    id="specialist"
                    parameter={parameter}
                  />
                </div>

                {/* <div className="col-md-3">
                  <TextBox
                    heading="License No"
                    id="licenseNo"
                    parameter={parameter}
                  />
                </div>

                <div className="col-md-3">
                  <DatePickerRe 
                    heading='License Expiry Date' 
                    // required={true}
                    id='licenseExpiryDate'
                    onChange={(id, date) => {
                      setFieldValue(id, date);
                    }}
                    parameter={parameter}
                    />
                  </div>
  
                  <AddressForm 
                  parameter={parameter}
                  setFieldValue={setFieldValue}
                   /> */}
                <div className="mt-3">
                  <h6>Select doctor available Days</h6>
                  {[ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", ].map((day: string) => {
                    return (
                      <CheckBox
                        label={day}
                        name={day.toLowerCase()}
                        keyValue={day}
                        id={day.toLowerCase()}
                        checked={parameter.values.availableDay[day.toLowerCase()]}
                        onChange={(isChecked, name) =>
                          onHandleCheckBox(isChecked, name, setFieldValue, parameter.values.availableDay)
                        }
                      />
                    );
                  })}

                  {parameter.touched.availableDay && ( <div id='error-days' className="text-danger">{parameter.errors.availableDay}</div> )}
                </div>

                <div className="col-md-6 ">
                  <div className="border rounded p-4 mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6>Select doctor available time</h6>
                      <div className="d-flex">
                        <h6 className="pointer mr-2" id="time-add" onClick={() => addTimeSheet(setFieldValue, selectedTime)}>
                          {" "}
                          <Icons icon="addCircle" size={20} />{" "}
                        </h6>
                        {selectedTime.length > 1 && (
                          <h6 className="pointer" id="time-sub" onClick={()=>removeTimeSheet(setFieldValue, selectedTime)}>
                            <Icons icon="subCircle" size={20} />{" "}
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
                  {parameter.touched.availableTime && ( <div id="error-time-piker" className="text-danger">{parameter.errors.availableTime}</div> )}
                </div>

                <div className="col-md-6"></div>
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
                      // onSubmit={handleSubmit}
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
