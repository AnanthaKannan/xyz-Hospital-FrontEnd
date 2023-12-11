import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hb from '../reusable/Hb';
import Hc from '../reusable/Hc';
import Icons from '../reusable/Icons';
import { sweetConfirmation } from '../lib/sweetAlart';
import PaginationReuse from '../reusable/PaginationReuse';
import { timeList } from '../lib/times';
import { convertDate } from '../lib';
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { deleteDoctorThunk, listDoctorThunk } from '../redux/thunk';
import LoadingOverlayComp from '../reusable/LoadingOverlayComp';


const ListDoctorComp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: rowData, tc: totalCount, loading: dListLoading } = useAppSelector((state) => state.doctor.doctorList);
  const { refresh } = useAppSelector((state) => state.doctor);
  const { loading: dDeleteLoading } = useAppSelector((state) => state.doctor.deleteDoctor);

  const [page, setPage] = useState(0);
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

  const onHandleDelete = async (_doctorId) => {
    sweetConfirmation(async () => {
     const result = await dispatch(deleteDoctorThunk({ id: _doctorId }));
     if (result?.meta?.requestStatus === 'fulfilled') setPage(0)
     console.log('result', result)
    }, 'Yes, delete it!');
  };

  const onHandleUpdate = (doctorDetails) => {
    console.log('doctorDetails', doctorDetails);
    sweetConfirmation(() => navigate('/create-doctor', { state: doctorDetails }), 'Yes, Update it!');
  };

  useEffect(() => {
    const params = {
      limit: perPage,
      skip: page
    }
    dispatch(listDoctorThunk(params))
  }, [page]);

  return (
    <div>
      <Hb text="Doctors" />

      <div className="row">
        {/* {
          rowData.length < 1 ?
            <Hc className='text-center mt-5' text='No Record Found...' />
            : */}
            <LoadingOverlayComp loading={dListLoading || dDeleteLoading}>
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
                  {conversion(rowData).map((obj) => (
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
            </LoadingOverlayComp>
        {/* } */}
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
