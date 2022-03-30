import React from 'react'
import parse from 'html-react-parser';

const ListQuilData = ({ list }: any) => {
  return (
    <div className='patient-description'>
      { 
      list.map((item: any, index: number) => {
        return (
          <div key={index} className='card mt-2 p-3'>
            <div>{item.createdAt}</div>
            <div>{item.disease}</div>
            <div>{item.status}</div>
            <div>{ parse(item.description) }</div>   

          </div>
        )
      }
      )}
    </div>
  )
}

export default ListQuilData