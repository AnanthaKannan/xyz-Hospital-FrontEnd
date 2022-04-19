import React, { useState, useEffect } from "react";
import AgGirdReact from "../reusable/AgGird";
import { deletePatient, listPatient } from "../service/patient.service";
import { listPatientColumnDef } from "./columnDef";
import { toast } from "react-toastify";
import Hb from "../reusable/Hb";
import { useLoadContext } from "../reusable/LoaderContext";
import { DeleteCellRender, EditCellRender, ViewCellRender } from "../reusable/CellRender";
import { sweetConfirmation } from "../lib/sweetAlart";
import { useNavigate } from 'react-router-dom';
import PopUpModel from "../reusable/PopUpModel";


const ListPatientComp = () => {
  const [rowData, setRowData] = useState<object[]>([]);
  const navigate = useNavigate();

  const { setLoader } = useLoadContext();

  useEffect(() => {
    listPatient_();
  }, []);

  const listPatient_ = async () => {
    setLoader(true);
    const result = await listPatient(null);
    console.log(result);
    setLoader(false);
    if (result.status === 200) {
      setRowData(result.data);
    } else {
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  };

  const deletePatient_ = async (id: number) => {
    setLoader(true);
    const result = await deletePatient(id);
    setLoader(false);
    if (result.status === 204) {
      toast.success("Patient deleted successfully.");
      listPatient_();
    } else {
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  };
  

  const onCellClicked = async(event: any) => {
    console.log(event);
    const { column, data, colDef } = event;
    
    if(colDef.field === 'edit'){
      console.log('edit', data._id);
      sweetConfirmation(() => {
        return navigate('/create-patient',{state:data})
      }, 'Yes, Update it!');
    }
    else if(colDef.field === 'view'){
      console.log('view', data._id);
      navigate('/patient-record',{state:data})
    }
    else if(colDef.field === 'delete'){
      console.log('delete', data._id);
      sweetConfirmation(() => {
        return deletePatient_(data._id);
      }, 'Yes, delete it!')
    }
  };

  return (
    <div>
      <Hb text="Patients" />
      <PopUpModel />
      <AgGirdReact
        columnDefs={listPatientColumnDef}
        rowData={rowData}
        onCellClicked={onCellClicked}
        frameworkComponents={{
          DeleteCellRender,
          EditCellRender,
          ViewCellRender,
        }}
      />
    </div>
  );
};

export default ListPatientComp;
