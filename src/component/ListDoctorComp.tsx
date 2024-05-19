import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { pageConversion, sweetConfirmation, timeList } from "@/lib";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { deleteDoctorThunk, listDoctorThunk } from "../redux/thunk";
import { manipulateDocListData } from "../redux/slice/doctorSlice";
import { DataTable, Hb, Icons } from "@/reusable";

const RenderDelete = ({ row }) => {
  return (
    <>
      {row.loading ? (
        <Icons icon="loader" size={22} />
      ) : (
        <Icons icon="delete" size={22} />
      )}
    </>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "Doctor Id" },
  { field: "name", headerName: "Name" },
  { field: "specialist", headerName: "Specialist", flex: 1 },
  { field: "availableDayConvert", headerName: "Available Days", flex: 1 },
  { field: "availableTimeConvert", headerName: "Available Time", flex: 1 },
  {
    field: "edit",
    headerName: "Edit",
    renderCell: () => <Icons icon="edit" size={20} />,
    display: "flex" as const, // DON'T KNOW USE OF THIS
  },
  {
    field: "delete",
    headerName: "Delete",
    renderCell: RenderDelete,
  },
];

const ListDoctorComp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data: rowData,
    tc: totalCount,
    loading: dListLoading,
  } = useAppSelector((state) => state?.doctor?.doctorList);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const availableDay = (avDay) =>
    Object.keys(avDay)
      .reduce((days, day) => {
        if (avDay[day]) {
          days.push(day);
        }
        return days;
      }, [])
      .join(", ");

  const availableTime = (availableTimeList: any) => {
    try {
      let time = "";
      availableTimeList.forEach((item) => {
        const { from, to } = item;
        const fromObj = timeList[Number(from)];
        const toObj = timeList[Number(to)];
        time += `${fromObj.hour}:${fromObj.minute} ${fromObj.ampm} - ${toObj.hour}:${toObj.minute} ${fromObj.ampm}, `;
      });
      return time.substring(0, time.length - 2);
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  const conversion = (data: any) =>
    data.map((item: any) => ({
      ...item,
      availableDayConvert: availableDay(item.availableDay),
      availableTimeConvert: availableTime(item.availableTime),
    }));

  const onHandleDelete = async (_doctorId) => {
    sweetConfirmation(async () => {
      const updatedRow = rowData.map((row) =>
        row._id === _doctorId ? { ...row, loading: true } : { ...row }
      );
      dispatch(manipulateDocListData(updatedRow));

      dispatch(deleteDoctorThunk({ id: _doctorId }))
        .then(() => listDoctor())
        .catch(() => {
          const updatedRow = rowData.map((row) => ({
            ...row,
            loading: false,
          }));
          dispatch(manipulateDocListData(updatedRow));
        });
    }, "Yes, delete it!");
  };

  const onHandleUpdate = (doctorId) => {
    const doctorDetails = rowData.find((row) => row._id === doctorId);
    console.log("doctorDetails", doctorDetails);
    sweetConfirmation(
      () => navigate("/create-doctor", { state: doctorDetails }),
      "Yes, Update it!"
    );
  };

  const listDoctor = () => {
    dispatch(listDoctorThunk(pageConversion(paginationModel)));
  };

  useEffect(() => {
    listDoctor();
  }, [paginationModel]);

  const onCellClick = ({ field, row }) => {
    if (field === "edit") onHandleUpdate(row._id);
    else if (field === "delete") onHandleDelete(row._id);
  };

  return (
    <Box>
      <Hb text="Doctors" />
      <DataTable
        paginationModel={paginationModel}
        rows={conversion(rowData)}
        rowCount={totalCount}
        columns={columns}
        setPaginationModel={setPaginationModel}
        onCellClick={onCellClick}
        loading={dListLoading}
      />
    </Box>
  );
};

export default ListDoctorComp;
