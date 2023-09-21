import React, { useEffect, useState } from 'react';
import SearchSelect from './SearchSelect';
import TextBox from './TextBox';
import { get, api } from '../service/api.service';

const AddressForm = ({ parameter, setFieldValue }) => {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    getCountryList();
  }, []);

  useEffect(() => {
    if (parameter.values.country) getStateList();
  }, [parameter.values.country]);

  useEffect(() => {
    if (parameter.values.country && parameter.values.state) getCityList();
  }, [parameter.values.state]);

  const getCountryList = async () => {
    const { isSuccess, data } = await get(api.address);
    if (!isSuccess) return;
    const countryList = data.map((countries) => ({ label: countries.country, value: countries.code }));
    setCountryList(countryList);
  };

  const getStateList = async () => {
    const params = {
      country_code: parameter.values.country,
    };
    const { isSuccess, data } = await get(api.address, params);
    if (!isSuccess) return;
    const countryList = data.map((countries) => ({ label: countries.state, value: countries.code }));
    setStateList(countryList);
  };

  const getCityList = async () => {
    const params = {
      country_code: parameter.values.country,
      state_code: parameter.values.state,
    };
    const { isSuccess, data } = await get(api.address, params);
    if (!isSuccess) return;
    const countryList = data.map((countries) => ({ label: countries.city, value: countries.code }));
    setCityList(countryList);
  };

  return (
    <>
      <div className="col-md-3">
        <TextBox heading="Address (House No.)" id="address" required parameter={parameter} />
      </div>

      <div className="col-md-3">
        <SearchSelect
          heading="Country"
          options={countryList}
          id="country"
          required
          setFieldValue={setFieldValue}
          parameter={parameter}
        />
      </div>
      <div className="col-md-3">
        <SearchSelect
          heading="State"
          options={stateList}
          id="state"
          required
          setFieldValue={setFieldValue}
          parameter={parameter}
        />
      </div>
      <div className="col-md-3" />
      <div className="col-md-3">
        <SearchSelect
          heading="City"
          options={cityList}
          id="city"
          required
          setFieldValue={setFieldValue}
          parameter={parameter}
        />
      </div>

      <div className="col-md-3">
        <TextBox
          heading="Pin code"
          id="zipCode"
          parameter={parameter}
        />
      </div>
    </>
  );
};

export default AddressForm;
