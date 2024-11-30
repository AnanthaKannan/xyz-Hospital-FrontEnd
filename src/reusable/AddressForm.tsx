import PropTypes from "prop-types";
import SearchSelect from "./SearchSelect";
import TextBox from "./TextBox";
import { useGetAddressQuery } from "@/service";

const AddressForm = ({ parameter, setFieldValue }) => {
  const { data: countryList = [], isFetching: isCountryLoading } =
    useGetAddressQuery({});
  const { data: stateList = [], isFetching: isStateLoading } =
    useGetAddressQuery(
      { country_code: parameter.values.country },
      { skip: !parameter?.values?.country }
    );
  const { data: cityList = [], isFetching: isCityLoading } = useGetAddressQuery(
    {
      state_code: parameter.values.state,
      country_code: parameter.values.country,
    },
    { skip: !parameter?.values?.state }
  );

  const mapping = (arr: any[], key: string) =>
    arr.map((obj) => ({ value: obj.code, label: obj[key] }));

  return (
    <>
      <div className="col-md-3">
        <TextBox
          heading="Address (House No.)"
          id="address"
          required
          parameter={parameter}
        />
      </div>

      <div className="col-md-3">
        <SearchSelect
          heading="Country"
          options={mapping(countryList, "country")}
          id="country"
          required
          setFieldValue={setFieldValue}
          parameter={parameter}
          isLoading={isCountryLoading}
        />
      </div>
      <div className="col-md-3">
        <SearchSelect
          heading="State"
          options={mapping(stateList, "state")}
          id="state"
          required
          setFieldValue={setFieldValue}
          parameter={parameter}
          isLoading={isStateLoading}
        />
      </div>
      <div className="col-md-3" />
      <div className="col-md-3">
        <SearchSelect
          heading="City"
          options={mapping(cityList, "city")}
          id="city"
          required
          setFieldValue={setFieldValue}
          parameter={parameter}
          isLoading={isCityLoading}
        />
      </div>

      <div className="col-md-3">
        <TextBox heading="Pin code" id="zipCode" parameter={parameter} />
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
