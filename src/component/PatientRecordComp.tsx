/* eslint-disable no-underscore-dangle */
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import { Formik } from "formik";
import Hb from "../reusable/Hb";
import TextBox from "../reusable/TextBox";
import { ClickButton, SubmitButton } from "../reusable/Button";
import { patientDetailsType, patientRecordType } from "../type/type";
import TextEditor from "../reusable/TextEditor";
import { useLoadContext } from "../reusable/LoaderContext";
import { post, get, remove } from "../service/curd.service";
import Icons from "../reusable/Icons";
import config from "../config";
import PaginationReuse from "../reusable/PaginationReuse";
import DropDown, { Option as OptionType } from "../reusable/DropDown";
import { handleReset, getInitialValuesFromYup, convertDate } from "../lib";
import {
  patientRecordValidation,
  createPatientValidation,
} from "../lib/validationSchema";
import DatePickerRe from "../reusable/DatePickerRe";
import ToggleSwitch from "../reusable/ToggleSwitch";
import Transitions from "../reusable/Transitions";

const PatientRecordComp = () => {
  const [patientDetails, setPatientDetails] = useState<patientDetailsType>(
    getInitialValuesFromYup(createPatientValidation)
  );
  const { patientRecord } = config;
  const [patientDetailsList, setPatientDetailsList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoader } = useLoadContext();
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [doctorList, setDoctorList] = useState<OptionType[]>([]);
  const [isShowAddRecord, setIsShowAddRecord] = useState(false);
  const [formikInitialValue, setFormikInitialValue] =
    useState<patientRecordType>({
      diagnosis: "",
      description: "",
      admittedOn: new Date(),
      roomNo: "",
      isAdmitted: false,
      _doctorId: "",
      status: false,
    });

  const getDoctorList = async () => {
    const res = await get(config.doctor, "project=name");
    if (res.status === 200) {
      console.log(res.data);
      setDoctorList([
        ...res.data.map((obj: any) => ({ value: obj._id, label: obj.name })),
      ]);
    } else {
      setDoctorList([]);
      toast.error("Oops! Something went wrong");
    }
  };

  const getDoctorName = (id: string) => {
    const doc = doctorList.find((obj: any) => obj.value === id);
    return doc ? doc.label : "";
  };

  const patientRecordList = async (patientId, skip = 0) => {
    setLoader(true);
    const result = await get(
      patientRecord,
      `filter=_patientId:eq:${patientId}&limit=${perPage}&skip=${skip}`
    );
    console.log("result", result);
    console.log("result", result.status);
    setLoader(false);
    if (result.status !== 200) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    const totalCount_ = result.headers["x-total-count"];
    console.log("totalCount_", result.headers);
    setTotalCount(totalCount_);
    setPatientDetailsList(result.data);
    if (totalCount_ < 1) setIsShowAddRecord(true);
  };

  const onDeleteRecord = async (item) => {
    const { _patientId, _id: _patientRecordId } = item;
    console.log("delete", _patientRecordId);
    setLoader(true);
    const result = await remove(patientRecord, _patientRecordId);
    console.log("result", result.status);
    setLoader(false);
    if (result.status !== 200) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    toast.success("successfully deleted");
    patientRecordList(_patientId);
  };

  const onSubmit = async (values: any, { resetForm }: any) => {
    console.log("submit", values);
    setLoader(true);
    const result = await post(patientRecord, {
      ...values,
      _patientId: patientDetails._id,
      status: false,
    });
    console.log("result", result.status);
    setLoader(false);
    if (result.status !== 201) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }

    toast.success("successfully added");
    console.log("Patient added successfully");
    patientRecordList(patientDetails._id);
    resetForm();
  };

  useEffect(() => {
    // eslint-disable-next-line prefer-destructuring
    const state: any = location.state;
    console.log(state);
    if (state._id) {
      patientRecordList(state._id, page);
      getDoctorList();
      setPatientDetails({ ...state });
    } else {
      navigate("/list-patient");
    }
  }, [page]);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <Hb text="Patient Record" />
          <ToggleSwitch
            onClick={() => setIsShowAddRecord(!isShowAddRecord)}
            label="click to enable add record"
            checked={isShowAddRecord}
          />
        </div>
        <br />
        <div className="d-flex justify-content-between">
          <p>
            {" "}
            <strong>Name:</strong> {patientDetails?.firstName}
          </p>
          <p>
            {" "}
            <strong>ID: </strong>
            {patientDetails?._id}
          </p>
          <p>
            <strong>Age:</strong> {patientDetails?.age}
          </p>
          <p>
            <strong>Email: </strong> {patientDetails?.email}
          </p>
          <p>
            {" "}
            <strong>Phone:</strong> {patientDetails?.phone}
          </p>
        </div>

        <Transitions isChecked={isShowAddRecord}>
          <div>
            <Formik
              initialValues={formikInitialValue}
              enableReinitialize
              validationSchema={patientRecordValidation}
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
                    <div className="col-md-3">
                      <DropDown
                        list={doctorList}
                        required
                        value={parameter.values._doctorId}
                        heading="Doctors"
                        id="_doctorId"
                        onChange={parameter.handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <TextBox
                        heading="Diagnosis"
                        required
                        id="diagnosis"
                        parameter={parameter}
                      />
                    </div>
                    {/* <div className="col-md-3 d-flex">
                      <CheckBox
                        label="Is He/She Admitted?"
                        id="isAdmitted"
                        onChange={(checked, name) => {
                          setFieldValue(name, checked);
                        }}
                        checked={parameter.values.isAdmitted}
                      />
                    </div> */}
                    <div className="col-md-3" />
                    {/* <div className="col-md-3"></div> */}

                    {/* {parameter.values.isAdmitted && ( */}
                    <Transitions isChecked={parameter.values.isAdmitted}>
                      <div className="row">
                        <div className="col-md-3">
                          <TextBox
                            heading="Room No"
                            required
                            id="roomNo"
                            parameter={parameter}
                          />
                        </div>
                        <div className="col-md-3">
                          <DatePickerRe
                            required
                            onChange={(id, date) => {
                              setFieldValue("admittedOn", date);
                            }}
                            id="admittedOn"
                            parameter={parameter}
                            heading="Admitted On"
                            minDate={new Date("20-20-1970")}
                            maxDate={new Date()}
                            yearsRange={{
                              start: 1970,
                              end: new Date().getFullYear() + 1,
                            }}
                          />
                        </div>
                        <div className="col-md-3" />
                      </div>
                    </Transitions>
                    {/* )} */}
                  </div>
                  <br />

                  <TextEditor
                    id="description"
                    value={parameter.values.description}
                    handleChange={(value) => {
                      setFieldValue("description", value);
                    }}
                    placeholder="Enter your Description"
                    errorMsg={
                      parameter.touched.description &&
                      parameter.errors.description
                    }
                  />

                  <br />
                  <div>
                    <div className="d-flex justify-content-end">
                      <ClickButton
                        className=""
                        onClick={() => navigate("/list-patient")}
                        text="Back"
                        id="patient-record-cancel"
                      />
                      <ClickButton
                        className="mx-4"
                        onClick={() => handleReset(setFieldValue, resetForm)}
                        text="Clear"
                        id="patient-record-clear"
                      />

                      <SubmitButton
                        //  onSubmit={handleSubmit}
                        id="patient-record-submit"
                      />
                    </div>
                    <br />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </Transitions>

        {patientDetailsList.map((item: any) => (
          <div key={item._id} className="card mt-2 shadow-sm">
            <div className="">
              <div className="d-flex justify-content-between bg-hos rounded-top py-2 px-3">
                <div>{convertDate(item.createdAt)}</div>
                <Icons
                  icon="delete"
                  onClick={() => onDeleteRecord(item)}
                  className="pointer"
                />
              </div>

              <div className="p-3">
                <div className="border rounded p-1 mb-3">
                  <table className="table mb-0 table-borderless font-sm">
                    <thead>
                      <tr>
                        <th scope="col">Doctor</th>
                        <th scope="col">Diagnosis</th>
                        <th scope="col">roomNo</th>
                        <th scope="col">Admitted-on</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{getDoctorName(item._doctorId)}</td>
                        <td>{item.diagnosis}</td>
                        <td>{item.roomNo}</td>
                        <td>{convertDate(item.admittedOn)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {parse(item.description)}
              </div>
            </div>
          </div>
        ))}

        <br />
        <PaginationReuse
          perPage={perPage}
          totalCount={totalCount}
          setPage={setPage}
        />
        <br />
      </div>
    </div>
  );
};

export default PatientRecordComp;
