import PropTypes from 'prop-types';
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

PaginationReuse.propTypes = {
  setPage: PropTypes.func.isRequired, // Ensure setPage is a function and is required
  totalCount: PropTypes.number.isRequired, // Ensure totalCount is a number and is required
  perPage: PropTypes.number.isRequired, // Ensure perPage is a number and is required
};

export default PaginationReuse;
