import PropTypes from "prop-types";
import Pagination from "@mui/material/Pagination";
import { pageChange } from "../lib";

type PaginationReuseProp = {
  setPage: (number: number) => void;
  totalCount: number;
  perPage: number;
};

const PaginationReuse = ({
  setPage,
  totalCount,
  perPage,
}: PaginationReuseProp) => {
  const onPageChange = (e, page: number) => {
    setPage(pageChange(page, perPage));
  };

  return (
    <>
      {totalCount > perPage && (
        <div className="d-flex justify-content-between">
          <p className="my-0 ml-3" id="totalCount">
            Total Records <strong>{totalCount}</strong>
          </p>
          <Pagination
            onChange={onPageChange}
            count={Math.ceil(totalCount / perPage)}
            color="primary"
          />
        </div>
      )}
    </>
  );
};

PaginationReuse.propTypes = {
  setPage: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};

export default PaginationReuse;
