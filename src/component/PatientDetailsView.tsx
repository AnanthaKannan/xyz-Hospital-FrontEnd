import React from 'react'

const PatientDetailsView = ({data}) => {
  console.log('data', data)
  return (
    <div>
           <table className="table table-bordered font-sm">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{data?._id}</td>
            </tr>
            <tr>
              <th>ID</th>
              <td>{data?.id}</td>
            </tr>
            <tr>
              <th>sdfsdfsd</th>
              <td>{data?.email}</td>
            </tr>
            <tr>
              <th>sdfsdfsd</th>
              <td>{data?.dob}</td>
            </tr>
            <tr>
              <th>sdfsdfsd</th>
              <td>{data?.age}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{data?.firstName} {data?.middleName} {data?.lastName}</td>
            </tr>
            <tr>
              <th>sdfsdfsd</th>
              <td>{data?.phone}</td>
            </tr>
            <tr>
              <th>sdfsdfsd</th>
              <td>{data?.updatedAt}</td>
            </tr>
            <tr>
              <th>sdfsdfsd</th>
              <td>{data?.createdAt}</td>
            </tr>


            <tr>
              <th>aadhaarNumber</th>
              <td>{data?.aadhaarNumber}</td>
            </tr>
            <tr>
              <th>address</th>
              <td>{data?.address}</td>
            </tr>
            <tr>
              <th>city</th>
              <td>{data?.city}</td>
            </tr>
            <tr>
              <th>country</th>
              <td>{data?.country}</td>
            </tr>
            <tr>
              <th>sdfsdfsd</th>
              <td>{data?.gender}</td>
            </tr>
            <tr>
              <th>idenityNo</th>
              <td>{data?.idenityNo}</td>
            </tr>
            <tr>
              <th>martialStatus</th>
              <td>{data?.martialStatus}</td>
            </tr>
            <tr>
              <th>occupation</th>
              <td>{data?.occupation}</td>
            </tr>
            <tr>
              <th>zipCode</th>
              <td>{data?.zipCode}</td>
            </tr>
          
          </tbody>
        </table>
    </div>
  )
}

export default PatientDetailsView