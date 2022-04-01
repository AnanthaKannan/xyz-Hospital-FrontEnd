import React, { useState, useEffect } from 'react';
import AgGirdReact from '../reusable/AgGird';
import { list, delete_ } from '../service/doctor.service';
import { listPatientColumnDef } from './columnDef';
import { toast } from 'react-toastify';
import Hb from '../reusable/Hb';
import { useLoadContext } from '../reusable/LoaderContext';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { sweetConfirmation } from "../lib/sweetAlart";
import { useNavigate } from 'react-router-dom';

const ListDoctorComp = () => {

  const [rowData, setRowData] = useState<any[]>([]);
  const navigate = useNavigate();
  const { setLoader } = useLoadContext();

  useEffect(() => {
    listPatient();
  },[])

  const listPatient = async () => {
    setLoader(true);
    const result = await list(null);
    console.log(result)
    setLoader(false);
    if (result.status === 200) {
      setRowData(result.data);
    }
    else{
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  }

  const deleteDoctor = async (_doctorId: number) => {
    setLoader(true);
    const result = await delete_(_doctorId);
    setLoader(false);
    if (result.status !== 204) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    toast.success("Doctor deleted successfully"); 
    listPatient();
  }

  const onHandleDelete = async(_doctorId) => {
    sweetConfirmation(() => {
      return deleteDoctor(_doctorId);
    }, 'Yes, delete it!')
  }

  const availableDay = (avDay) => {
    let days = '';
    for(let day in avDay){
      if(avDay[day]){
        days += `${day}, ` ;
      }
    }
    return days.substr(0, days.length -1)
  }

  const onHandleUpdate =  (doctorDetails) => {
    console.log('udaate', doctorDetails);
    sweetConfirmation(() => {
      return navigate('/create-doctor',{state:doctorDetails})
    }, 'Yes, Update it!');
  }



  return (
    <div>
       <Hb text='Doctors' />
      {/* <AgGirdReact 
        columnDefs={listPatientColumnDef}
        rowData={rowData}
        onCellClicked={(e: any) => console.log(e)}

      /> */}
       <div className='row'>
        {
            rowData.map((obj) => {
                 return <div key={obj._id} className='col-md-6 mb-2'>
                <div className="card shadow">
                <div className="card-body">
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex'>
                    <p className='font-weight-bold mr-3'> { obj.name } </p>
                    {/* <StarRatings
                  rating={obj.rating}
                  starRatedColor="#FFA41C"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="1px"
                  name='rating'
                /> */}
                </div>
                    <h4> 
                    <MdDelete onClick={() => onHandleDelete(obj._id) } size={20} className='mx-3 pointer' /> 
                    <FiEdit onClick={() => onHandleUpdate(obj) } size={20} className='pointer' />
                     </h4>
                    </div>
                    <div className='card'>
                    <div className="card-body">
                    <p> { obj.specialist } </p>
                    <div className='row'>
                      <div className='col-md-6'>
                      <p className='mb-1'> <strong> {obj.timePerPatient}  </strong> Minutes</p>
                      <p className='txt-sm mb-0'> { availableDay(obj.availableDay) } </p>
                      </div>
                      <div className='col-md-6 text-right'>
                      {
                        obj.availableTime.map(obj =>  <p key={obj.from} className='m-0'>10:30AM - 10:40PM</p>)
                    }
                    </div>
                    </div>
                    
                    </div></div>
                </div>
              </div>
                </div>
            })
        }
    </div>
    </div>
  )
}

export default ListDoctorComp;