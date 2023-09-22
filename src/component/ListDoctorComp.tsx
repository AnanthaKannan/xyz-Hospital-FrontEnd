/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { get, remove } from '../service/curd.service';
import Hb from '../reusable/Hb';
import { useLoadContext } from '../reusable/LoaderContext';
import Icons from '../reusable/Icons';
import { sweetConfirmation } from '../lib/sweetAlart';
import PaginationReuse from '../reusable/PaginationReuse';
import config from '../config';
import { timeList } from '../lib/times';
import { convertDate } from '../lib';

const ListDoctorComp = () => {
  const { doctor } = config;
  const navigate = useNavigate();

  const [rowData, setRowData] = useState<any[]>([]);
  const { setLoader } = useLoadContext();
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  // const [perPage, setPerPage] = useState(10);
  const perPage = 10;

  const availableDay = (avDay) => Object.keys(avDay)
    .reduce((days, day) => {
      if (avDay[day]) {
        days.push(day);
      }
      return days;
    }, [])
    .join(', ');

  const availableTime = (availableTimeList: any) => {
    try {
      let time = '';
      availableTimeList.forEach((item) => {
        const { from, to } = item;
        const fromObj = timeList[Number(from)];
        const toObj = timeList[Number(to)];
        time += `${fromObj.hour}:${fromObj.minute} ${fromObj.ampm} - ${toObj.hour}:${toObj.minute} ${fromObj.ampm}, `;
      });
      return time.substring(0, time.length - 2);
    } catch (e) {
      console.log(e);
      return '';
    }
  };

  const conversion = (data: any) => data.map((item: any) => ({
    ...item,
    availableDayConvert: availableDay(item.availableDay),
    availableTimeConvert: availableTime(item.availableTime),
  }));

  const listPatient = async (skip = 0) => {
    setLoader(true);
    const result = await get(doctor, `limit=${perPage}&skip=${skip}`);
    console.log(result);
    setLoader(false);
    if (result.status === 200) {
      setRowData(conversion(result.data));
      setTotalCount(result.headers['x-total-count']);
    } else {
      toast.error('Oops! Something went wrong. Please try again later.');
    }
  };

  const deleteDoctor = async (_doctorId: number) => {
    setLoader(true);
    const result = await remove(doctor, _doctorId);
    setLoader(false);
    if (result.status !== 204) {
      toast.error('Oops! Something went wrong. Please try again later.');
      return;
    }
    toast.success('Doctor deleted successfully');
    listPatient();
  };

  const onHandleDelete = async (_doctorId) => {
    sweetConfirmation(() => deleteDoctor(_doctorId), 'Yes, delete it!');
  };

  const onHandleUpdate = (doctorDetails) => {
    console.log('doctorDetails', doctorDetails);
    sweetConfirmation(() => navigate('/create-doctor', { state: doctorDetails }), 'Yes, Update it!');
  };

  useEffect(() => {
    listPatient(page);
  }, [page]);

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
              <th scope="col">Record created</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((obj) => (
              <tr>
                <th>{obj.id}</th>
                <td>{obj.name}</td>
                <td>{obj.specialist}</td>
                <td>{obj.availableDayConvert}</td>
                <td>{obj.availableTimeConvert}</td>
                <td>{convertDate(obj.createdAt)}</td>
                <td>
                  <Icons
                    icon="edit"
                    onClick={() => onHandleUpdate(obj)}
                    size={20}
                  />
                </td>
                <td>
                  <Icons
                    icon="delete"
                    onClick={() => onHandleDelete(obj._id)}
                    size={20}
                    className="mx-3 pointer"
                  />
                </td>
              </tr>
            ))}
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
