import { type FC, type ChangeEvent } from "react";
import Pagination from "@mui/material/Pagination";
import { pageChange } from "../lib";

type PaginationReuseProp = {
  setPage: (number: number) => void;
  totalCount: number;
  perPage: number;
};

const PaginationReuse: FC<PaginationReuseProp> = ({
  setPage,
  totalCount,
  perPage,
}) => {
  const onPageChange = (e: ChangeEvent<unknown>, page: number) => {
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

export default PaginationReuse;
