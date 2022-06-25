import React, { useEffect, useState } from 'react'
import SearchSelect from './SearchSelect';
import TextBox from './TextBox'
// const { Country, State, City }  = require ('country-state-city');

// // console.log(Country.getAllCountries())
// // console.log(State.getStatesOfCountry('IN'))
// console.log(City.getCitiesOfState('IN', 'TN'))

const AddressForm = ({ parameter, setFieldValue }) => {

  return <></>

  // const searchSelectOptionsConverter = (options, valueKey, labelKey) => {
    
  //   return options.map(option => {
  //     let flag = option?.flag;
  //     if(!flag) 
  //       flag = ''
        
  //     return {
  //       value: option[valueKey],
  //       label: `${flag} ${option[labelKey]}`
  //     }
  //   })
  // }

  

  // const [countryList, setCountryList] = useState(searchSelectOptionsConverter(Country.getAllCountries(), 'isoCode', 'name'));
  // const [stateList, setStateList] = useState([]);
  // const [cityList, setCityList] = useState([]);

  // useEffect(() => {
  //   const stateList_ = State.getStatesOfCountry(parameter.values.country);
  //   setStateList(searchSelectOptionsConverter(stateList_, 'isoCode', 'name'));
  // }, [parameter.values.country]);

  // useEffect(() => {
  //   const cityList_ = City.getCitiesOfState(parameter.values.country, parameter.values.state);
  //   setCityList(searchSelectOptionsConverter(cityList_, 'name', 'name'));
  // }, [parameter.values.state]);

  // return (
  //   <>
  //       <div className="col-md-3">
  //                   <TextBox
  //                     heading='Address (House No.)'
  //                     id='address'
  //                     required={true}
  //                     parameter={parameter}
  //                   />
  //                 </div>

  //                 <div className="col-md-3">
  //                   <SearchSelect
  //                     heading='Country'
  //                     options={countryList}
  //                     id='country'
  //                     required={true}
  //                     setFieldValue={setFieldValue}
  //                     parameter={parameter}
  //                   />
  //                 </div>
  //                 <div className="col-md-3">
  //                 <SearchSelect
  //                     heading='State'
  //                     options={stateList}
  //                     id='state'
  //                     required={true}
  //                     setFieldValue={setFieldValue}
  //                     parameter={parameter}
  //                   />
  //                 </div>
  //                 <div className="col-md-3"></div>
  //                 <div className="col-md-3">
  //                 <SearchSelect
  //                     heading='City'
  //                     options={cityList}
  //                     id='city'
  //                     required={true}
  //                     setFieldValue={setFieldValue}
  //                     parameter={parameter}
  //                   />
  //                 </div>
                 
               

                 
  //                 <div className="col-md-3">
  //                   <TextBox
  //                     heading='Pin code'
  //                     id='zipCode'
  //                     parameter={parameter}
  //                   />
  //                 </div>
  //   </>
  // )
}

export default AddressForm