import { toast } from 'react-toastify';

import config from '../config';
import { get } from '../service/curd.service';

export const getDoctorsName = async () => {
  const res = await get(config.doctor, 'project=name');
  if (res.status === 200) {
    console.log(res.data);
    return [
      // eslint-disable-next-line no-underscore-dangle
      ...res.data.map((obj: any) => ({ value: obj._id, label: obj.name })),
    ];
  }
  toast.error('Oops! Something went wrong');
  return [];
};

export const getPatient = async (query) => {
  const res = await get(config.patient, query);
  if (res.status === 200) {
    console.log(res.data);
    return res.data;
  }

  toast.error('Oops! Something went wrong');
  return {};
};

export const getDoctor = async (query) => {
  const res = await get(config.doctor, query);
  if (res.status === 200) {
    console.log(res.data);
    return res.data;
  }

  toast.error('Oops! Something went wrong');
  return {};
};
