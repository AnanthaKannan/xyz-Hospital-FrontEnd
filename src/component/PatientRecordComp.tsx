import Hb from "../reusable/Hb"
import TextBox from "../reusable/TextBox"
import { ClickButton, SubmitButton } from '../reusable/Button';
import {useLocation, useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import { patientDetailsType } from '../type/type';

const PatientRecordComp = () => {

  const [patientDetails, setPatientDetails] = useState<patientDetailsType>({
    name: "",
    age: '',
    email: "",
    phone: "",
    dob: '',
    password: ""
  })
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const state: any = location.state;
    console.log(state)
    if (state._id) {
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
  

  const onHandleChange = () => {
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
      <div>
      <div>
                    <ClickButton className='mx-4' onClick={() => navigate('/list-patient')} text="Cancel" color='default' id='patient-cancel' />
                    {/* <SubmitButton onSubmit={handleSubmit} text="Update" id='patient-submit' /> */}
                </div>
      </div>
    </div>
  )
}

export default PatientRecordComp