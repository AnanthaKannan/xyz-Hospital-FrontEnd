import dateFn from 'date-fn';
import { genderEnum } from './enum';

export const onHandleChange = (e: any, handleChange: Function) => {
  const element = {
    target: {
      id: e.target.id,
      value: e.target.value.trimStart()
    }
  }
  handleChange(element)
}

export const convertToDigit = (e: any, sliceValue: number): number => {
  return e.target.value.replace(/[^0-9]/g, '').slice(0, sliceValue);
}

export const imgUploadPath = (code: string, _hospitalId: string): string => {
  if (code === 'patientImg') {
    return 'patientImg'
  }
}

export const pageChange = (page, perPage) => {
  console.log('page change', page)
  if (page === 1) {
    page = 0
  }
  else {
    page = (page - 1) * perPage
  }
  return page
}

export const convertDate = (date: string): Date => {
  return dateFn.date(date, 102, '-');
}

export const handleReset = (setFieldValue: Function, resetForm: Function): void => {
  resetForm();
}

export const getStorageDetails = (): any => {
  const items = { ...localStorage };
  return items;
}

export const setStorageDetails = (data: any): void => {
  console.log('storage data', data)
  const storage = window.localStorage;
  for (let key in data) {
    storage.setItem(key, data[key]);
  }
}

export const convertEnumToArray = (obj) => {
  let arr = []
  for (let key in obj) {
    arr.push({ label: obj[key], value: key })
  }
  return arr;
}

// get the gender name using pass the value
// if you passing the "1" as a value then you can get "Male" as response
export const getGenderByValue = (value: string): string => {
  return value ? genderEnum[value] : '';
}

// used to convert the date to age
export const fromDateToAgeConverter = (date: Date): string => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 1)
    return `${m} month`

  return `${age} year`
}

// used to get the initial formik values from the yup schema
export const getInitialValuesFromYup = (yupSchema): any => {
  const fields = yupSchema.fields;
  let initialValues = {};
  for (let key in fields) {
    // console.log(fields[key])
    let value: any = "";
    const type = fields[key].type;
    if (type === 'boolean')
      value = true;
    else if (type === 'number')
      value = 0;
    initialValues[key] = value;
  }
  console.log(initialValues);
  return initialValues;
}