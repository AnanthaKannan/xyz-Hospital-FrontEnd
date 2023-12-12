import dateFn from 'date-fn';
import { genderEnum } from './enum';
import config from '../config';
import { imageUploadCodeType, imagePathResponseType } from '../type/type';

export const onHandleChange = (e: any, handleChange: Function) => {
  const element = {
    target: {
      id: e.target.id,
      value: e.target.value.trimStart(),
    },
  };
  handleChange(element);
};

export const convertToDigit = (e: any, sliceValue: number): number => e.target.value.replace(/[^0-9]/g, '').slice(0, sliceValue);

export const imagePath = (code: imageUploadCodeType, fileName: string): imagePathResponseType => {
  const hospitalId = localStorage.getItem('_hospitalId');
  if (code === 'patient') {
    return {
      setUrl: `patient/${hospitalId}/${fileName}`,
      getUrl: `${config.imgURL}/patient/${hospitalId}/${fileName}`,
    };
  }

  if (code === 'doctor') {
    return {
      setUrl: `doctor/${hospitalId}/${fileName}`,
      getUrl: `${config.imgURL}/doctor/${hospitalId}/${fileName}`,
    };
  }

  return { setUrl: '', getUrl: '' };
};

export const pageChange = (page: number, perPage: number) => {
  let updatedPage = page;
  console.log('page change', updatedPage);
  if (page === 1) {
    updatedPage = 0;
  } else {
    updatedPage = (updatedPage - 1) * perPage;
  }
  return updatedPage;
};

export const convertDate = (date: string): Date => {
  try {
    return dateFn.date(date, 102, '-');
  } catch (e) {
    return new Date();
  }
};

export const handleReset = (setFieldValue: Function, resetForm: Function): void => {
  resetForm();
};

export const getStorageDetails = (): any => {
  const items = { ...localStorage };
  return items;
};

export const setStorageDetails = (data: any): void => {
  console.log('storage data', data);
  const storage = window.localStorage;
  Object.keys(data).forEach((key) => {
    storage.setItem(key, data[key]);
  });
};

export const convertEnumToArray = (obj) => {
  const arr = Object.entries(obj).map(([key, value]) => ({ label: value, value: key }));
  return arr || [];
};

// get the gender name using pass the value
// if you passing the "1" as a value then you can get "Male" as response
export const getGenderByValue = (value: string): string => {
  if (!genderEnum[value]) return '';
  return genderEnum[value];
};

// used to convert the date to age
export const fromDateToAgeConverter = (date: Date): string => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  if (age < 1) return `${m} month`;

  return `${age} year`;
};

// used to get the initial formik values from the yup schema
export const getInitialValuesFromYup = (yupSchema): any => {
  const { fields } = yupSchema;
  const initialValues = Object.keys(fields).reduce((result, key) => {
    let value:any = '';
    const { type } = fields[key];
    if (type === 'boolean') value = true;
    else if (type === 'number') value = 0;
    // eslint-disable-next-line no-param-reassign
    result[key] = value;
    return result;
  }, {});
  console.log(initialValues);
  return initialValues;
};

// used to remove the key if the keys are don't have any value
export const valueRefinement = () => {

};

export const addLoaderInArray = (listData: any[], id: string, loading: boolean) => {
  return listData.map((obj) => {
    if(id === obj._id) obj.loading = loading;
    return obj
  })
}

export const getTotalCount = (result): number => {
  const tc: string = result.headers['x-total-count']
  if(tc) return Number(tc)
  return 0
}

export const onlyNumbers = (value) => (value ? value.replace(/[^\d]+/g, '') : value);
