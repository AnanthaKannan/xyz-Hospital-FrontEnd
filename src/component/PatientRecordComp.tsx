import Hb from "../reusable/Hb"
import TextBox from "../reusable/TextBox"
import { ClickButton } from '../reusable/Button';
import {useLocation, useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import { patientDetailsType } from '../type/type';
import TextEditor from "../reusable/TextEditor";
import { useLoadContext } from '../reusable/LoaderContext';
import { toast } from 'react-toastify';
import { post, get } from '../service/patientRecord.service';
import ListQuilData from "./PatientRecordDetails";
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
  const [patientDetailsList, setPatientDetailsList] = useState([]);
  const [text, setText] = useState('')
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoader } = useLoadContext();


  useEffect(() => {
    const state: any = location.state;
    console.log(state)
    if (state._id) {
      patientRecordList();
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
      const result = await post({
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
        patientRecordList();
        setText('');
  }

  const patientRecordList = async() => {
    setLoader(true);
    // const query =  `?query={"_id" : ${patientDetails._id} }`
    const result = await get(null);
    console.log('result', result.status);
    setLoader(false);
    if(result.status !== 200) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    setPatientDetailsList(result.data)
    
  }

  return (
    <div>
      <Hb text="Patient Record" />
      <div className="row">
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
      <ListQuilData list={patientDetailsList}/>
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