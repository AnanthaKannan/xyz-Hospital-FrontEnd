import React, { useState, useEffect } from "react";
import AgGirdReact from "../reusable/AgGird";
import { get, remove } from "../service/curd.service";
import { listPatientColumnDef } from "./columnDef";
import { toast } from "react-toastify";
import Hb from "../reusable/Hb";
import { useLoadContext } from "../reusable/LoaderContext";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { sweetConfirmation } from "../lib/sweetAlart";
import { useNavigate } from "react-router-dom";
import PaginationReuse from "../reusable/PaginationReuse";
import config from "../config";

const ListDoctorComp = () => {
  const { doctor } = config;
  const navigate = useNavigate();

  const [rowData, setRowData] = useState<any[]>([]);
  const { setLoader } = useLoadContext();
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    listPatient(page);
  }, [page]);

  const listPatient = async (skip=0) => {
    setLoader(true);
    const result = await get(doctor, `limit=${perPage}&skip=${skip}`);
    console.log(result);
    setLoader(false);
    if (result.status === 200) {
      setRowData(conversion(result.data));
      setTotalCount(result.headers['x-total-count']);
    } else {
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  };

  const conversion = (data: any) => {
    return data.map((item: any) => {
      return {
        ...item,
      };
    });
  };

  const deleteDoctor = async (_doctorId: number) => {
    setLoader(true);
    const result = await remove(doctor, _doctorId);
    setLoader(false);
    if (result.status !== 204) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    toast.success("Doctor deleted successfully");
    listPatient();
  };

  const onHandleDelete = async (_doctorId) => {
    sweetConfirmation(() => {
      return deleteDoctor(_doctorId);
    }, "Yes, delete it!");
  };

  const availableDay = (avDay) => {
    let days = "";
    for (let day in avDay) {
      if (avDay[day]) {
        days += `${day}, `;
      }
    }
    return days.substr(0, days.length - 1);
  };

  const onHandleUpdate = (doctorDetails) => {
    console.log("udaate", doctorDetails);
    sweetConfirmation(() => {
      return navigate("/create-doctor", { state: doctorDetails });
    }, "Yes, Update it!");
  };

  return (
    <div>
      <Hb text="Doctors" />

      <div className="row">
        <table className="table table-bordered font-sm">
          <thead>
            <tr>
              <th scope="col">Doctor Id</th>
              <th scope="col">Name</th>
              <th scope="col">Specialist</th>
              <th scope="col">Available Days</th>
              <th scope="col">Available Time</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((obj) => {
              return (
                <tr>
                  <th>{obj.id}</th>
                  <td>{obj.name}</td>
                  <td>{obj.specialist}</td>
                  <td>{availableDay(obj.availableDay)}</td>
                  <td>
                    {obj.availableTime.map((obj) => (
                      <p key={obj.from} className="m-0">
                        10:30AM - 10:40PM
                      </p>
                    ))}
                  </td>
                  <td>
                    <FiEdit
                      onClick={() => onHandleUpdate(obj)}
                      size={20}
                      className="pointer"
                    />
                  </td>
                  <td>
                    <MdDelete
                      onClick={() => onHandleDelete(obj._id)}
                      size={20}
                      className="mx-3 pointer"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
    <PaginationReuse
    perPage={perPage}
    totalCount={totalCount}
    setPage={setPage}
    />
      <br />
    </div>
  );
};

export default ListDoctorComp;
