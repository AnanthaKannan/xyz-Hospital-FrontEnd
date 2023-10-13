/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';

import { fromDateToAgeConverter, getGenderByValue } from '../lib';

const PatientDetailsView = ({ data }) => (
  <div>
    <table className="table table-bordered font-sm">
      <tbody>
        <tr>
          <th>ID</th>
          <td>{data?._id}</td>
          <th>Hospital ID</th>
          <td>{data?.id}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>
            {data?.firstName}
            {' '}
            {data?.middleName}
            {' '}
            {data?.lastName}
          </td>
          <th>Gender</th>
          <td>{getGenderByValue(data?.gender)}</td>

        </tr>
        <tr>
          <th>Date Of Birth</th>
          <td>{data?.dob}</td>
          <th>Age</th>
          <td>
            {' '}
            {fromDateToAgeConverter(data?.dob)}
          </td>

        </tr>
        <tr>
          <th>Phone</th>
          <td>{data?.phone}</td>
          <th>aadhaarNumber</th>
          <td>{data?.aadhaarNumber}</td>
        </tr>
        <tr>
          <th>Created At</th>
          <td>{data?.createdAt}</td>
          <th>Last updated</th>
          <td>{data?.updatedAt}</td>
        </tr>
        <tr>
          <th>idenityNo</th>
          <td>{data?.idenityNo}</td>
          <th>martialStatus</th>
          <td>{data?.martialStatus}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{data?.email}</td>
          <th>Occupation</th>
          <td>{data?.occupation}</td>
        </tr>
        <tr>
          <th>address</th>
          <td>{data?.address}</td>
          <th>city</th>
          <td>{data?.city}</td>
        </tr>
        <tr>
          <th>country</th>
          <td>{data?.country}</td>
          <th>zipCode</th>
          <td>{data?.zipCode}</td>
        </tr>

      </tbody>
    </table>
  </div>
);

PatientDetailsView.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
    dob: PropTypes.string,
    phone: PropTypes.string,
    aadhaarNumber: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    idenityNo: PropTypes.string,
    martialStatus: PropTypes.string,
    email: PropTypes.string,
    occupation: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    zipCode: PropTypes.string,
  }).isRequired,
};

export default PatientDetailsView;
