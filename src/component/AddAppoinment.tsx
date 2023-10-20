/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useLoadContext } from '../reusable/LoaderContext';

import { Hb, DropDown } from '../reusable';
import { patientAppoinment } from '../type/type';
import { patientAppoinmentValidation } from '../lib/validationSchema';
import { call } from '../lib';

const formikInitialValue: patientAppoinment = {
  diagnosis: null,
  _doctorId: null,
  _patientId: '65327d79266bae432dade37b',
};

export const AddAppoinment = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [PatientDetail, setPatientDetail] = useState({});
  const [doctorDetail, setDoctorDetail] = useState({});

  const { setLoader } = useLoadContext();

  const init = async () => {
    setDoctorList(await call.getDoctorsName());
    setPatientDetail(await call.getPatient(`filter=_id:eq:${formikInitialValue._patientId}`));
  };

  useEffect(() => {
    init();
  }, []);

  const onSubmit = async (values: any, { resetForm }: any) => {
    console.log('submit', values);
    call.getDoctorsName();
    setLoader(true);
    resetForm();
    setLoader(true);
  };

  const docXyz = async (e) => {
    const result = await call.getDoctor(`filter=_id:eq:${e.target.value}`);
    // setDoctorDetail({});
  };

  return (
    <div>
      <Hb text="Add Appoinment" />
      eeeeeeeeee
      {
        JSON.stringify(PatientDetail)
      }
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      doctorDetail
      {
        JSON.stringify(doctorDetail)
      }
      <Formik
        initialValues={formikInitialValue}
        enableReinitialize
        validationSchema={patientAppoinmentValidation}
        onSubmit={onSubmit}
      >
        {
          ({
            handleSubmit, setFieldValue, setErrors, resetForm, ...parameter
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-3">
                  <DropDown
                    list={doctorList}
                    required
                    value={parameter.values._doctorId}
                    heading="Doctors"
                    id="_doctorId"
                    errorMsg={parameter.touched._doctorId && parameter.errors._doctorId}
                    // onChange={parameter.handleChange}
                    onChange={docXyz}
                  />
                </div>
              </div>
            </form>
          )
        }
      </Formik>
    </div>
  );
};

export default AddAppoinment;
