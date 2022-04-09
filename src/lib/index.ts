export const onHandleChange =  (e:any, handleChange:Function) => {
  const element = {
    target:{
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
  if(code === 'patientImg'){
    return 'patientImg'
  }
}

export const pageChange = (page) => {
  console.log('page change', page)
  if(page === 1) {
    page = 0
  }
  else {
    page = (page - 1) * 2
  }
  return page
}