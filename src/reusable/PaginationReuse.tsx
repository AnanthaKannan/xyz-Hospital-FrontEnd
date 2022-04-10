import React from 'react'
import { pageChange } from "../lib"
import Pagination from '@mui/material/Pagination';

const PaginationReuse = ({setPage, totalCount, perPage}) => {

  const onPageChange = (e, page) => {
    setPage(pageChange(page));
  }

  return (
    <div className="d-flex justify-content-end">
       <Pagination onChange={onPageChange} count={Math.ceil(totalCount/perPage)} color="primary" />
  </div>
  )
}

export default PaginationReuse