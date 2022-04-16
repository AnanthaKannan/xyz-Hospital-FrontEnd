import dateFn from 'date-fn';

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
  for(let key in data){
    storage.setItem(key, data[key]);
  }
}