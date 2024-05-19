import React, { useState } from "react";
import dateFn from "date-fn";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";

import {
  fromDateToAgeConverter,
  getGenderByValue,
  pageConversion,
  sweetConfirmation,
} from "@/lib";
import { PatientDetailsView } from "@/component";
import { DataTable, Hb, Icons, PopUpModel } from "@/reusable";
import { useGetPatientsQuery, useDeletePatientMutation } from "@/service";

const ListPatientComp = () => {
  const navigate = useNavigate();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState({});

  const {
    data: { data: rowData = [], tc: totalCount = 0 } = {},
    isFetching: pListLoading,
  } = useGetPatientsQuery(
    { ...pageConversion(paginationModel) },
    { skip: !paginationModel }
  );

  const [deletePatient, { isLoading: isDeleting }] = useDeletePatientMutation();

  const onCellClick = async ({ field, row }) => {
    if (field === "edit") {
      console.log("edit", row._id);
      sweetConfirmation(
        () => navigate("/create-patient", { state: row }),
        "Yes, Update it!"
      );
    } else if (field === "view") {
      setPatientDetails(row);
      setIsPopUpOpen(true);
    } else if (field === "record") {
      console.log("record", row._id);
      navigate("/patient-record", { state: row });
    } else if (field === "delete") {
      console.log("delete", row._id);
      sweetConfirmation(
        () =>
          deletePatient({ id: row._id })
            .unwrap()
            .then(() => toast.success("Patient deleted successfully."))
            .catch((rejected) => {
              console.error(rejected);
              toast.error(
                "Oops! Something went wrong. Please try again later."
              );
            }),
        "Yes, delete it!"
      );
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "idenityNo", headerName: "Idenity No" },
    {
      field: "name",
      headerName: "Name",

      renderCell({ row }) {
        const { firstName = "", lastName = "", middleName = "" } = row;
        return `${firstName} ${middleName} ${lastName}`;
      },
    },
    {
      field: "gender",
      headerName: "Gender",

      renderCell: ({ value }) => getGenderByValue(value),
    },
    { field: "email", headerName: "Email" },
    {
      field: "phone",
      headerName: "Phone",
    },
    {
      field: "dob",
      headerName: "Date Of Birth",

      renderCell: ({ value }) => dateFn.date(value, 104, "-"),
    },
    {
      field: "age",
      headerName: "Age",

      renderCell: ({ row }) => fromDateToAgeConverter(row.dob),
    },
    {
      field: "view",
      headerName: "View",
      renderCell: () => <Icons icon="view" size={20} />,
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: () => <Icons icon="delete" size={20} />,
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: () => <Icons icon="edit" size={20} />,
    },
    {
      field: "record",
      headerName: "Record",
      renderCell: () => <Icons icon="entry" size={20} />,
    },
  ];

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
      <DataTable
        paginationModel={paginationModel}
        rows={rowData.map((row) => ({ ...row, id: row._id }))}
        rowCount={totalCount}
        columns={columns}
        setPaginationModel={setPaginationModel}
        onCellClick={onCellClick}
        loading={pListLoading || isDeleting}
      />
    </div>
  );
};

export default ListPatientComp;
