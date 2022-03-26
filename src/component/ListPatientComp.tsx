import React, { useState, useEffect } from "react";
import AgGirdReact from "../reusable/AgGird";
import { deletePatient, listPatient } from "../service/patient.service";
import { listPatientColumnDef } from "./columnDef";
import { toast } from "react-toastify";
import Hb from "../reusable/Hb";
import { useLoadContext } from "../reusable/LoaderContext";
import { DeleteCellRender, EditCellRender } from "../reusable/CellRender";
import { sweetDeleteData } from "../lib/sweetAlart";

const ListPatientComp = () => {
  const [rowData, setRowData] = useState<object[]>([]);
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
      // return {
      //   success: true,
      //   meg: "Patient deleted successfully.",
      // }
    } else {
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  };

  const onCellClicked = (event: any) => {
    console.log(event);
    const { column, data, colDef } = event;
    
    if(colDef.field === 'edit'){
      console.log('edit', data._id);
      alert('edit');
    }
    else if(colDef.field === 'delete'){
      console.log('delete', data._id);
      sweetDeleteData(() => {
        return deletePatient_(data._id);
      })
    }
  };

  return (
    <div>
      <Hb text="Patients" />
      <AgGirdReact
        columnDefs={listPatientColumnDef}
        rowData={rowData}
        onCellClicked={onCellClicked}
        frameworkComponents={{
          DeleteCellRender,
          EditCellRender,
        }}
      />
    </div>
  );
};

export default ListPatientComp;
