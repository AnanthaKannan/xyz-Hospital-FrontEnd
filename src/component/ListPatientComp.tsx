import React, { useState, useEffect } from 'react';
import AgGirdReact from '../reusable/AgGird';
import { listPatient } from '../service/patient.service';
import { listPatientColumnDef } from './columnDef';
import { toast } from 'react-toastify';
import Hb from '../reusable/Hb';
import { useLoadContext } from '../reusable/LoaderContext';

const ListPatientComp = () => {

  const [rowData, setRowData] = useState<object[]>([]);
  const { setLoader } = useLoadContext();

  useEffect(() => {
    listPatient_();
  },[])

  const listPatient_ = async () => {
    setLoader(true);
    const result = await listPatient(null);
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
       <Hb text='Patients' />
      <AgGirdReact 
        columnDefs={listPatientColumnDef}
        rowData={rowData}
        onCellClicked={(e: any) => console.log(e)}

      />
    </div>
  )
}

export default ListPatientComp