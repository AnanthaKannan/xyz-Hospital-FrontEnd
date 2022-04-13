import Hb from "../reusable/Hb";
import TextBox from "../reusable/TextBox";
import { ClickButton, SubmitButton } from "../reusable/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { patientDetailsType, patientRecordType } from "../type/type";
import TextEditor from "../reusable/TextEditor";
import { useLoadContext } from "../reusable/LoaderContext";
import { toast } from "react-toastify";
import { post, get, remove } from "../service/curd.service";
import { MdOutlineDeleteOutline } from "react-icons/md";
import parse from "html-react-parser";
import config from "../config";
import PaginationReuse from "../reusable/PaginationReuse";
import DropDown from "../reusable/DropDown";
import { Formik } from 'formik'
import { onHandleChange, imgUploadPath, handleReset } from '../lib';
import { patientRecordValidation } from '../lib/validationSchema'
import CheckBox from "../reusable/CheckBox";
import DatePickerRe from '../reusable/DatePickerRe';
import { convertDate } from '../lib'
import ToggleSwitch from '../reusable/ToggleSwitch';
import {TransitionGroup } from 'react-transition-group'; // ES6


const PatientRecordComp = () => {
  const [patientDetails, setPatientDetails] = useState<patientDetailsType>({
    name: "",
    age: "",
    email: "",
    phone: "",
    dob: null,
    password: "",
  });
  const { patientRecord } = config;
  const [patientDetailsList, setPatientDetailsList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoader } = useLoadContext();
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [doctorList, setDoctorList] = useState([]);
  const [isShowAddRecord, setIsShowAddRecord] = useState(false);
  const [formikInitialValue, setFormikInitialValue] = useState<patientRecordType>({
    diagnosis: "",
    description: "",
    admittedOn: new Date(),
    roomNo: "",
    isAdmitted: false,
    _doctorId: "",
    status: false
  });

  useEffect(() => {
    const state: any = location.state;
    console.log(state);
    if (state._id) {
      patientRecordList(state._id, page);
      getDoctorList();
      setPatientDetails({
        _id: state._id,
        name: state.name,
        age: state.age,
        email: state.email,
        phone: state.phone,
        dob: state.dob,
        password: state.password,
      });
    } else {
      navigate("/list-patient");
    }
  }, [page]);

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

  const getDocotorName = (id: string) => {
    const doc = doctorList.find((obj: any) => obj.value === id);
    return doc ? doc.label : "";
  };

  const onSubmit = async (values: any, { setErrors, setFieldValue, resetForm }: any) => {
    console.log("submit", values);
    setLoader(true);
    const result = await post(patientRecord, { ...values, _patientId: patientDetails._id });
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

  const patientRecordList = async (patient_id, skip = 0) => {
    setLoader(true);
    const result = await get(
      patientRecord,
      `filter=_patientId:eq:${patient_id}&limit=${perPage}&skip=${skip}`
    );
    console.log("result", result);
    console.log("result", result.status);
    setLoader(false);
    if (result.status !== 200) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    setTotalCount(result.headers["x-total-count"]);
    setPatientDetailsList(result.data);
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
          <p> <strong>Name:</strong> {patientDetails.name}</p>
          <p> <strong>ID: </strong>{patientDetails._id}</p>
          <p><strong>Age:</strong>  {patientDetails.age}</p>
          <p><strong>Email: </strong> {patientDetails.email}</p>
          <p> <strong>Phone:</strong>  {patientDetails.phone}</p>
        </div>
      

      <div>
        { isShowAddRecord &&
        <Formik
          initialValues={formikInitialValue}
          enableReinitialize={true}
          validationSchema={patientRecordValidation}
          onSubmit={onSubmit}>
          {({ handleSubmit, handleChange, values, errors, touched, setFieldValue, setErrors, resetForm }) => (
            <form onSubmit={handleSubmit}>

              <div className="row">
                <div className="col-md-3">
                  <DropDown
                    list={doctorList}
                    required={true}
                    value={values._doctorId}
                    heading="Doctors"
                    id="_doctorId"
                    errorMsg={touched._doctorId && errors._doctorId}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <TextBox
                    heading='Diagnosis'
                    required={true}
                    id='diagnosis'
                    onChange={(e) => onHandleChange(e, handleChange)}
                    value={values.diagnosis}
                    errorMsg={touched.diagnosis && errors.diagnosis}
                  />
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3"></div>
                <div className="col-md-3 d-flex">
                  <CheckBox
                    label="Is He/She Admitted?"
                    id="isAdmitted"
                    onChange={(checked, name) => {
                      setFieldValue("isAdmitted", checked);
                    }}
                    checked={values.isAdmitted}

                  />
                </div>
                {values.isAdmitted && (
                  <>
                    <div className="col-md-3">
                      <TextBox
                        heading='Room No'
                        required={true}
                        id='roomNo'
                        onChange={(e) => onHandleChange(e, handleChange)}
                        value={values.roomNo}
                        errorMsg={touched.roomNo && errors.roomNo}
                      />
                    </div>
                    <div className="col-md-3">
                      <DatePickerRe
                        required={true}
                        onChange={(id, date) => {
                          setFieldValue('admittedOn', date);
                        }}
                        id='admittedOn'
                        value={values.admittedOn}
                        errorMsg={touched.admittedOn && errors.admittedOn}
                        heading='Admitted On'
                      />
                    </div>
                    <div className="col-md-3"></div>
                  </>
                )}
              </div>
              <br />


              <TextEditor
                id="description"
                value={values.description}
                handleChange={(value) => {
                  setFieldValue("description", value);
                }}
                placeholder="Enter your Description"
                errorMsg={touched.description && errors.description}
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
                  <ClickButton className='mx-4' onClick={() => handleReset(setFieldValue, resetForm)} text="Clear" id='patient-record-clear' />

                  <SubmitButton
                    //  onSubmit={handleSubmit}
                    id='patient-record-submit' />
                </div>
                <br />
              </div>

            </form>
          )}
        </Formik>
      }
      </div>
        {patientDetailsList.map((item: any, index: number) => {
          return (
            <div key={item._id} className="card mt-2 shadow-sm">
              <div className="">
                <div className="d-flex justify-content-between bg-info rounded-top py-2 px-3">
                  <div>{convertDate(item.createdAt)}</div>
                  <MdOutlineDeleteOutline
                    onClick={() => onDeleteRecord(item)}
                    size={25}
                    className="pointer"
                  />
                </div>

                <div className="p-3">
                  <div className="border rounded px-1 pt-1">
                  <table className="table table-borderless font-sm">
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
                        <td>{ getDocotorName(item._doctorId) }</td>
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
          );
        })}

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
