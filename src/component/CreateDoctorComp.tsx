import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import {
  Hb,
  TextBox,
  CheckBox,
  Icons,
  TimePicker,
  DatePickerRe,
  SearchSelect,
  AddressForm,
  ClickButton,
  SubmitButton,
  FullScreenLoader,
} from "@/reusable";
import { post, put } from "../service/doctor.service";
import { uploadFile } from "../service/curd.service";
import { useLoadContext } from "../reusable/LoaderContext";
import { doctorValueType } from "../type/type";
import { genderEnum } from "@/lib/enum";
import { convertEnumToArray, imagePath } from "@/lib";
import msg from "../lib/msg";

import {
  useGetDoctorsByIdQuery,
  useAddDoctorMutation,
  useUpdateDoctorMutation,
} from "@/service";

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
  const { doctorId } = useParams();

  const [formikInitialValue, setFormikInitialValue] = useState<doctorValueType>(
    {
      name: "",
      specialist: "",
      address: "",
      availableTime: [{ from: null, to: null }],
      timePerPatient: "",
      availableDay: availableDays,
      licenseNo: "",
      licenseExpiryDate: "",
      email: "",
      gender: "",
      phone: "",
      alternatePhone: "",
      fileName: "",
      zipCode: "",
    }
  );
  const [selectedTime, setSelectedTime] = useState(selectedTimeInitialState);

  const [addDoctor, { isLoading: isAddingDoctor }] = useAddDoctorMutation();
  const [updateDoctorDetail, { isLoading: isUpdatingDoctor }] =
    useUpdateDoctorMutation();
  const { data: doctorDetails, isFetching: isDoctorDetailFetching } =
    useGetDoctorsByIdQuery({ id: doctorId }, { skip: !doctorId });

  useEffect(() => {
    if (!doctorDetails) return;

    setFormikInitialValue({
      ...doctorDetails,
      licenseExpiryDate: doctorDetails.licenseExpiryDate
        ? new Date(doctorDetails.licenseExpiryDate)
        : null,
    });
    setSelectedTime(doctorDetails.availableTime);
  }, [doctorDetails]);

  const uploadImage = async (values) => {
    const path = imagePath("doctor", values.fileName).setUrl;
    const { file } = values;
  };

  const handleReset = (resetForm: Function): void => {
    if (formikInitialValue._id) navigate("/list-doctor");

    resetForm();
    setSelectedTime([{ from: null, to: null }]);
  };

  const createDoctor = async (values: doctorValueType, resetForm: Function) => {
    try {
      const result = await addDoctor(values).unwrap();
      toast.success("Doctor created successfully");
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.error("Doctor already exists");
        return;
      }
      toast.error("Oops! Something went wrong. Please try again later.");
    }

    if (values.fileName) await uploadImage(values);
    handleReset(resetForm);
  };

  const updateDoctor = async (values: doctorValueType) => {
    try {
      const result = await updateDoctorDetail({
        id: values._id,
        body: values,
      }).unwrap();
      if (values.fileName) await uploadImage(values);
      toast.success("Doctor updated successfully");
      navigate("/list-doctor");
    } catch (error) {
      if (error?.response?.data) toast.error(data.message);
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  };

  const onSubmit = (values: any, { resetForm }: any) => {
    const updatedValues = { ...values };
    updatedValues.availableTime = selectedTime;
    updatedValues.timePerPatient = "10";

    if (updatedValues._id) updateDoctor(updatedValues);
    else createDoctor(updatedValues, resetForm);
  };

  const onHandleCheckBox = (
    isChecked: boolean,
    name: any,
    setFieldValue: any,
    _availableDays
  ) => {
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

  const availableTimeValidation = () => {
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
    email: Yup.string().email("Invalid email"),
    licenseNo: Yup.string(),
    licenseExpiryDate: Yup.date(),
    gender: Yup.string().required().oneOf(Object.keys(genderEnum)), // ["1", "2", "3"],
    phone: Yup.string().required("Phone is required"),
    alternatePhone: Yup.string(),
    fileName: Yup.string(),
    availableDay: Yup.object()
      .required("Please select at least one day")
      .test("availableDays", msg.ERR03, availableDaysValidation),
    availableTime: Yup.array()
      .required("Please select doctor available time")
      .test(
        "availableTime",
        "Please select doctor available time",
        availableTimeValidation
      ),
  });

  const addTimeSheet = () => {
    const lastSelectedTime = selectedTime.slice(
      selectedTime.length - 1,
      selectedTime.length
    );
    if (!lastSelectedTime[0].from || !lastSelectedTime[0].to) {
      toast.info("Please select the From and To in the doctor available time");
      return;
    }

    setSelectedTime([...selectedTime, { from: null, to: null }]);
  };

  const removeTimeSheet = () => {
    const updatedTime = selectedTime.slice(0, selectedTime.length - 1);
    setSelectedTime([...updatedTime]);
  };

  return (
    <div className="">
      <FullScreenLoader
        isFetching={
          isAddingDoctor || isUpdatingDoctor || isDoctorDetailFetching
        }
      />
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
            handleSubmit,
            setFieldValue,
            setErrors,
            resetForm,
            ...parameter
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="row">
                  <div className="col md-9">
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
                      <div className="col-md-3">
                        <TextBox
                          heading="License No"
                          id="licenseNo"
                          parameter={parameter}
                        />
                      </div>
                      <div className="col-md-3">
                        <DatePickerRe
                          heading="License Expiry Date"
                          id="licenseExpiryDate"
                          onChange={(id, date) => {
                            setFieldValue(id, date);
                          }}
                          parameter={parameter}
                          minDate={
                            new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                          }
                          maxDate={new Date("20-20-2120")}
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
                          heading="Alternate Phone"
                          id="alternatePhone"
                          parameter={parameter}
                        />
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
                  {[
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day: string) => (
                    <CheckBox
                      label={day}
                      name={day.toLowerCase()}
                      keyValue={day}
                      id={day.toLowerCase()}
                      checked={parameter.values.availableDay[day.toLowerCase()]}
                      onChange={(isChecked, name) =>
                        onHandleCheckBox(
                          isChecked,
                          name,
                          setFieldValue,
                          parameter.values.availableDay
                        )
                      }
                    />
                  ))}

                  {parameter.touched.availableDay && (
                    <div id="error-days" className="text-danger">
                      {parameter.errors.availableDay}
                    </div>
                  )}
                </div>

                <div className="col-md-6 ">
                  <div className="border rounded p-4 mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6>Select doctor available time</h6>
                      <div className="d-flex">
                        <h6
                          className="pointer mr-2"
                          id="time-add"
                          onClick={() => addTimeSheet()}
                        >
                          {" "}
                          <Icons icon="addCircle" size={20} />{" "}
                        </h6>
                        {selectedTime.length > 1 && (
                          <h6
                            className="pointer"
                            id="time-sub"
                            onClick={() => removeTimeSheet()}
                          >
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
                  {parameter.touched.availableTime && (
                    <div id="error-time-piker" className="text-danger">
                      {parameter.errors.availableTime}
                    </div>
                  )}
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
                    <SubmitButton id="doctor-submit" />
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
