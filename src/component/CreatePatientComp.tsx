import { useState, useEffect } from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import {
  TextBox,
  Hb,
  ClickButton,
  SubmitButton,
  DatePickerRe,
  SearchSelect,
  AddressForm,
  LoadingOverlayComp,
} from "@/reusable";
import {
  onlyNumbers,
  convertEnumToArray,
  fromDateToAgeConverter,
  getInitialValuesFromYup,
} from "@/lib";
import { patientDetailsType } from "@/type/type";
import { GENDER, MATERIAL_STATUS } from "@/const";
import { createPatientValidation } from "@/lib";
import { useUpdatePatientMutation, useAddPatientMutation } from "@/service";

const CreatePatientComp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [addPatient, { isLoading: isAdding }] = useAddPatientMutation();
  const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();

  const [formikInitialValue, setFormikInitialValue] =
    useState<patientDetailsType>(
      getInitialValuesFromYup({
        ...createPatientValidation,
        file: null,
      })
    );

  useEffect(() => {
    const state: any = location.state;
    if (state?._id) {
      setFormikInitialValue({
        ...state,
        age: fromDateToAgeConverter(state.dob),
        dob: new Date(state.dob),
      });
    }
  }, [location.state]);

  const uploadImage = async (values) => {
    // const path = imagePath("patient", values.fileName).setUrl;
    // const { file } = values;
    // const result = await uploadFile({ file, path });
  };

  const createPatient = async (
    values: patientDetailsType,
    resetForm: Function
  ) => {
    const { error, data } = await addPatient(values);
    if (error?.status === 409) {
      toast.error(error.data.message);
      return;
    }
    if (!data?._id) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    toast.success("Patient created successfully.");
    if (values.fileName) {
      await uploadImage(values);
    }

    resetForm();
  };

  const updatePatient_ = async (values: patientDetailsType) => {
    const { error, data } = await updatePatient({
      id: values._id,
      body: values,
    });
    if (error?.status === 409) {
      toast.error(error.data.message);
      return;
    }
    if (!data?._id) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }

    toast.success("Patient updated successfully.");
    if (values.fileName) await uploadImage(values);
    navigate("/list-patient");
  };

  const onSubmit = (values: patientDetailsType, { resetForm }: any) => {
    if (values._id) updatePatient_(values);
    else createPatient(values, resetForm);
    // resetForm();
  };

  const handleReset = (setFieldValue: Function, resetForm: Function): void => {
    if (document.getElementById("fileName")) {
      (document.getElementById("fileName") as HTMLInputElement).value = "";
    }
    resetForm();
  };

  const aadhaarNumber = (value) => {
    if (!value) return value;
    let number = value.replace(/[^\d]+/g, "");
    if (number.length >= 12) number = number.substring(0, 12);
    return number;
  };

  return (
    <div className="">
      <LoadingOverlayComp loading={isAdding || isUpdating}>
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
              handleSubmit,
              setFieldValue,
              setErrors,
              resetForm,
              ...parameter
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
                          options={convertEnumToArray(GENDER)}
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
                            setFieldValue("age", fromDateToAgeConverter(date));
                            setFieldValue("dob", date);
                          }}
                          parameter={parameter}
                          id="dob"
                          heading="Date Of Birth"
                          minDate={new Date("20-20-1970")}
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
                          customValueFn={onlyNumbers}
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
                          customValueFn={aadhaarNumber}
                        />
                      </div>
                      <div className="col-md-3">
                        <SearchSelect
                          options={convertEnumToArray(MATERIAL_STATUS)}
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
                      {formikInitialValue._id ? (
                        <div>
                          <ClickButton
                            className="mx-4"
                            onClick={() => navigate("/list-patient")}
                            text="Cancel"
                            id="patient-cancel"
                          />
                          <SubmitButton text="Update" id="patient-submit" />
                        </div>
                      ) : (
                        <div>
                          <ClickButton
                            className="mx-4"
                            onClick={() =>
                              handleReset(setFieldValue, resetForm)
                            }
                            text="Cancel"
                            id="patient-cancel"
                          />
                          <SubmitButton id="patient-submit" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <br />
        <br />
      </LoadingOverlayComp>
    </div>
  );
};

export default CreatePatientComp;
