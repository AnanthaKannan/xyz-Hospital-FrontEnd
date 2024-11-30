import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";

import { pageConversion, sweetConfirmation, timeList } from "@/lib";
import { DataTable, Hb, Icons } from "@/reusable";
import { useGetDoctorsQuery, useDeleteDoctorMutation } from "@/service";

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
  {
    field: "availableTimeConvert",
    headerName: "Available Time",
    flex: 1,
    sortable: false,
  },
  {
    field: "edit",
    headerName: "Edit",
    sortable: false,
    renderCell: () => <Icons icon="edit" size={20} />,
    display: "flex" as const, // DON'T KNOW USE OF THIS
  },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    renderCell: RenderDelete,
  },
];

const ListDoctorComp = () => {
  const navigate = useNavigate();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const {
    data: { data: rowData = [], tc: totalCount = 0 } = {},
    isFetching: dListLoading,
  } = useGetDoctorsQuery(
    { ...pageConversion(paginationModel) },
    { skip: !paginationModel }
  );
  const [deleteDoctor, { isLoading: isDeleting }] = useDeleteDoctorMutation();

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

  const onHandleDelete = async (_doctorId: string) => {
    sweetConfirmation(async () => {
      deleteDoctor({ id: _doctorId })
        .unwrap()
        .then(() => toast.success("Doctor deleted successfully"))
        .catch((rejected) => {
          console.error(rejected);
          toast.error("Oops! Something went wrong. Please try again later.");
        });
    }, "Yes, delete it!");
  };

  const onHandleUpdate = (doctorId) => {
    const doctorDetails = rowData.find((row) => row._id === doctorId);
    console.log("doctorDetails", doctorDetails);
    sweetConfirmation(
      () => navigate(`/update-doctor/${doctorDetails?._id}`),
      "Yes, Update it!"
    );
  };

  const onCellClick = ({ field, row }) => {
    if (field === "edit") onHandleUpdate(row._id);
    else if (field === "delete") onHandleDelete(row._id);
  };

  return (
    <>
      <Hb text="Doctors" />
      <DataTable
        paginationModel={paginationModel}
        rows={conversion(rowData)}
        rowCount={totalCount}
        columns={columns}
        setPaginationModel={setPaginationModel}
        onCellClick={onCellClick}
        loading={dListLoading || isDeleting}
      />
    </>
  );
};

export default ListDoctorComp;
