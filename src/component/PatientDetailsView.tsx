import React from 'react';
import { imagePath, fromDateToAgeConverter, getGenderByValue } from '../lib';
// import maleAvatar from '../assets/male_avatar.png'
// import femaleAvatar from '../assets/female_avatar.png'

const PatientDetailsView = ({ data }) => (
  <div>

    {/* <div className='d-flex justify-content-center mt-5 mb-2'>
        {
          data.fileName ?
            <img className='patient-img' src={imagePath('patient', data.fileName).getUrl} alt="patient Img" />
            :
            <img className='patient-img' src={data?.gender === 'male' ? maleAvatar : femaleAvatar} alt="patient Img" />
        }
      </div> */}

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

export default PatientDetailsView;
