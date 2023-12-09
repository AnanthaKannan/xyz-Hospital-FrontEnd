import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AgGirdReact from '../reusable/AgGird';
import { deletePatient, listPatient } from '../service/patient.service';
import { listPatientColumnDef } from './columnDef';
import Hb from '../reusable/Hb';
import {
  DeleteCellRender, EditCellRender, ViewCellRender, RecordCellRender,
} from '../reusable/CellRender';
import { sweetConfirmation } from '../lib/sweetAlart';
import PopUpModel from '../reusable/PopUpModel';
import PatientDetailsView from './PatientDetailsView';
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { listPatientThunk, deletePatientThunk } from '../redux/thunk';
import LoadingOverlayComp from '../reusable/LoadingOverlayComp';

const ListPatientComp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const { data: rowData, tc: totalCount, loading: pListLoading } = useAppSelector((state) => state.patient.patientList)
  const { loading: pDeleteLoading } = useAppSelector((state) => state.patient.deletePatient);
  const { refresh } = useAppSelector((state) => state.patient);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState({});

  const onCellClicked = async (event: any) => {
    console.log(event);
    const { data, colDef } = event;

    if (colDef.field === 'edit') {
      console.log('edit', data._id);
      sweetConfirmation(() => navigate('/create-patient', { state: data }), 'Yes, Update it!');
    } else if (colDef.field === 'view') {
      setPatientDetails(data);
      setIsPopUpOpen(true);
    } else if (colDef.field === 'record') {
      console.log('record', data._id);
      navigate('/patient-record', { state: data });
    } else if (colDef.field === 'delete') {
      console.log('delete', data._id);
      sweetConfirmation(() => dispatch(deletePatientThunk({id: data._id})), 'Yes, delete it!');
    }
  };

  useEffect(() => {
    dispatch(listPatientThunk({}))
  }, [refresh]);

  return (
    <div>
      <Hb text="Patients" />
      <PopUpModel
        isOpen={isPopUpOpen}
        setIsOpen={setIsPopUpOpen}
        tittle="Patient Details"
      >
        <PatientDetailsView data={patientDetails} />
      </PopUpModel>
      <LoadingOverlayComp loading={pListLoading || pDeleteLoading} >
        <AgGirdReact
          columnDefs={listPatientColumnDef}
          rowData={rowData}
          onCellClicked={onCellClicked}
          frameworkComponents={{
            DeleteCellRender,
            EditCellRender,
            ViewCellRender,
            RecordCellRender,
          }}
        />
      </LoadingOverlayComp>
    </div>
  );
};

export default ListPatientComp;
