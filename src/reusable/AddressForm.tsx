import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import SearchSelect from './SearchSelect';
import TextBox from './TextBox';
import { get, apiRoute } from '../service/api.service';

const AddressForm = ({ parameter, setFieldValue }) => {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const getCountryList = async () => {
    const { isSuccess, data } = await get(apiRoute.address);
    if (!isSuccess) return;
    const countries = data.map((country) => ({
      label: country.country,
      value: country.code,
    }));
    setCountryList(countries);
  };

  const getStateList = async () => {
    const params = {
      country_code: parameter.values.country,
    };
    const { isSuccess, data } = await get(apiRoute.address, params);
    if (!isSuccess) return;
    const countries = data.map((country) => ({
      label: country.state,
      value: country.code,
    }));
    setStateList(countries);
  };

  const getCityList = async () => {
    const params = {
      country_code: parameter.values.country,
      state_code: parameter.values.state,
    };
    const { isSuccess, data } = await get(apiRoute.address, params);
    if (!isSuccess) return;
    const countries = data.map((country) => ({ label: country.city, value: country.code }));
    setCityList(countries);
  };

  useEffect(() => {
    getCountryList();
  }, []);

  useEffect(() => {
    if (parameter.values.country) getStateList();
  }, [parameter.values.country]);

  useEffect(() => {
    if (parameter.values.country && parameter.values.state) getCityList();
  }, [parameter.values.state]);

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

AddressForm.propTypes = {
  parameter: PropTypes.shape({
    values: PropTypes.shape({
      country: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default AddressForm;
