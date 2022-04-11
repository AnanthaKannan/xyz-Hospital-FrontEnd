import Hb from "../reusable/Hb";
import TextBox from "../reusable/TextBox";
import { ClickButton, SubmitButton } from "../reusable/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { patientDetailsType } from "../type/type";
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
import {patientRecordValidation } from '../lib/validationSchema'
import * as Yup from 'yup';

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
  const [text, setText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoader } = useLoadContext();
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [doctorList, setDoctorList] = useState([]);
  const [formikInitialValue, setFormikInitialValue] = useState<any>({
    disease: "",
    doctor: "",
    description: "",
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

  const onSubmit = async (values:any, { setErrors, setFieldValue, resetForm}: any) => {
    console.log("submit");
    setLoader(true);
    const result = await post(patientRecord, {
      description: values.description,
      _patientId: patientDetails._id,
      status: false,
      disease: values.disease,
      _doctorId: values.doctor,
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
      <Hb text="Patient Record" />
  
        <div className="d-flex">
          <p>Name: {patientDetails.name}</p>
          <p>ID: {patientDetails._id}</p>
          <p>Age: {patientDetails.age}</p>
          <p>Email: {patientDetails.email}</p>
          <p>Phone: {patientDetails.phone}</p>
        </div>


        <Formik 
          initialValues={formikInitialValue}
          enableReinitialize={true}
          validationSchema={patientRecordValidation}
          onSubmit={onSubmit}>
            {({handleSubmit, handleChange, values, errors, touched, setFieldValue, setErrors, resetForm}) => (
              <form onSubmit={handleSubmit}>

        <div className="row">
          <div className="col-md-3">
          <DropDown
          list={doctorList}
          required={true}
          value={values.doctor}
          heading="Doctors"
          id="doctor"
          errorMsg={touched.doctor && errors.doctor}
          onChange={handleChange}
        />
          </div>

          <div className="col-md-3">  
                  <TextBox
                    heading='Disease'
                    required={true}
                    id='disease'
                    onChange={(e) => onHandleChange(e, handleChange)}
                    value={values.disease}
                    errorMsg={touched.disease && errors.disease}
                  />
                </div>
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
              color="default"
              id="patient-record-cancel"
            />
               <ClickButton className='mx-4' onClick={() =>handleReset(setFieldValue, resetForm)} text="Clear" color='default' id='patient-record-clear' />

               <SubmitButton onSubmit={handleSubmit} text="Submit" id='patient-record-submit' />
          </div>
          <br />
        </div>

         </form>
            )}
        </Formik>

        {patientDetailsList.map((item: any, index: number) => {
          return (
            <div key={item._id} className="card mt-2 shadow-sm">
              <div className="">
                <div className="d-flex justify-content-between bg-info rounded-top py-2 px-3">
                  <div>{item.createdAt}</div>
                  <MdOutlineDeleteOutline
                    onClick={() => onDeleteRecord(item)}
                    size={25}
                    className="pointer"
                  />
                </div>

                <div className="p-3">
                  <div>{item.disease}</div>
                  <div>{item.status}</div>
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
