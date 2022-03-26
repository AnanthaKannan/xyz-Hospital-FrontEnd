import React, { useState, useEffect } from 'react';
import AgGirdReact from '../reusable/AgGird';
import { listDoctor } from '../service/doctor.service';
import { listPatientColumnDef } from './columnDef';
import { toast } from 'react-toastify';
import Hb from '../reusable/Hb';
import { useLoadContext } from '../reusable/LoaderContext';

const ListDoctorComp = () => {

  const [rowData, setRowData] = useState<object[]>([]);
  const { setLoader } = useLoadContext();

  useEffect(() => {
    listPatient_();
  },[])

  const listPatient_ = async () => {
    setLoader(true);
    const result = await listDoctor(null);
    console.log(result)
    setLoader(false);
    if (result.status === 200) {
      setRowData(result.data);
    }
    else{
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  }

  return (
    <div>
       <Hb text='Doctors' />
      <AgGirdReact 
        columnDefs={listPatientColumnDef}
        rowData={rowData}
        onCellClicked={(e: any) => console.log(e)}

      />
    </div>
  )
}

export default ListDoctorComp;