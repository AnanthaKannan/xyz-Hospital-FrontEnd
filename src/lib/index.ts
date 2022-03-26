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