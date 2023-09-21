import React from 'react';
import Pagination from '@mui/material/Pagination';
import { pageChange } from '../lib';

const PaginationReuse = ({ setPage, totalCount, perPage }) => {
  const onPageChange = (e, page) => {
    setPage(pageChange(page, perPage));
  };

  return (
    <>
      {
        (totalCount > perPage)
         && (
         <div className="d-flex justify-content-between">
           <p className="my-0 ml-3" id="totalCount">
             Total Records
             <strong>{ totalCount }</strong>
           </p>
           <Pagination onChange={onPageChange} count={Math.ceil(totalCount / perPage)} color="primary" />
         </div>
         )
      }
    </>
  );
};

export default PaginationReuse;
