import Hb from "../reusable/Hb"
import TextBox from "../reusable/TextBox"
import { ClickButton } from '../reusable/Button';
import {useLocation, useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import { patientDetailsType } from '../type/type';
import TextEditor from "../reusable/TextEditor";
import { useLoadContext } from '../reusable/LoaderContext';
import { toast } from 'react-toastify';
import { post, get, remove } from '../service/curd.service';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import parse from 'html-react-parser';
import config from "../config";
import Pagination from '@mui/material/Pagination';


const PatientRecordComp = () => {

  const [patientDetails, setPatientDetails] = useState<patientDetailsType>({
    name: "",
    age: '',
    email: "",
    phone: "",
    dob: null,
    password: ""
  });
  const { patientRecord } = config;
  const [patientDetailsList, setPatientDetailsList] = useState([]);
  const [text, setText] = useState('')
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoader } = useLoadContext();


  useEffect(() => {
    const state: any = location.state;
    console.log(state)
    if (state._id) {
      patientRecordList(state._id);
      setPatientDetails({
        _id: state._id,
        name: state.name,
        age: state.age,
        email: state.email,
        phone: state.phone,
        dob: state.dob,
        password: state.password
      })
    }
    else{
      navigate('/list-patient')
    }
  },[])
  

  const onHandleSubmit = async() => {
      console.log('submit')
      setLoader(true);
      const result = await post(patientRecord,{
        description: text,
        _patientId: patientDetails._id,
        status: false,
        disease: 'feeling sick'
      });
      console.log('result', result.status);
      setLoader(false);
      if(result.status !== 201) {
        toast.error("Oops! Something went wrong. Please try again later.");
        return;
      }
  
        toast.success("successfully added");
        console.log('Patient added successfully');
        patientRecordList(patientDetails._id);
        setText('');
  }

  const patientRecordList = async(patient_id) => {
    setLoader(true);
    const result = await get(patientRecord, `filter=_patientId:eq:${patient_id}&limit=10`);
    console.log('result', result);
    console.log('result', result.status);
    setLoader(false);
    if(result.status !== 200) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    setPatientDetailsList(result.data)
    
  }

  const onDeleteRecord = async(item) => {
    const { _patientId, _id:_patientRecordId } = item;
    console.log('delete', _patientRecordId)
    setLoader(true);
    const result = await remove(patientRecord, _patientRecordId);
    console.log('result', result.status);
    setLoader(false);
    if(result.status !== 200) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    toast.success("successfully deleted");
    patientRecordList(_patientId);
  }

  return (
    <div>
      <Hb text="Patient Record" />
      <div className=" d-flex">
        <p>Name: {patientDetails.name}</p>
        <p>ID: {patientDetails._id}</p>
        <p>Age: {patientDetails.age}</p>
        <p>Email: {patientDetails.email}</p>
        <p>Phone: {patientDetails.phone}</p>
       </div>

       <TextEditor 
        text={text}
        setText={setText}
       />
       <br />
      <div>
      <div className="d-flex justify-content-end">
                    <ClickButton className='mx-4' onClick={() => navigate('/list-patient')} text="Cancel" color='default' id='patient-cancel' />
                    <ClickButton className='' onClick={onHandleSubmit} text="Submit" color='secondary' id='submit' />
                </div>
                <br />
      
      {
        patientDetailsList.map((item: any, index: number) => {
          return (
            <div key={item._id} className='card mt-2 shadow-sm'>
            <div className="">
              <div className="d-flex justify-content-between bg-info rounded-top py-2 px-3">
              <div>{item.createdAt}</div>
              <MdOutlineDeleteOutline onClick={() =>onDeleteRecord(item)} size={25} className='pointer' />
              </div>
            
              <div className="p-3">
              <div>{item.disease}</div>
              <div>{item.status}</div>
              { parse(item.description) }
              </div>   
            </div>
          </div>
          )
        })
      }

      <br />
      <div className="d-flex align-items-end">
        <Pagination count={10} color="primary" />
      </div>
      <br />
      </div>
    </div>
  )
}

export default PatientRecordComp