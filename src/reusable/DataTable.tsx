import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({
  rows,
  columns,
  onPageChange,
  onCellClick,
  rowCount,
  paginationModel,
  loading,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rowCount={rowCount}
        paginationMode="server"
        onPaginationModelChange={onPageChange}
        onCellClick={onCellClick}
        loading={loading}
        // onRowCountChange={onRowCountChange}
        rows={rows}
        columns={columns}
        autoHeight
        paginationModel={paginationModel}
        // pageSizeOptions={[5, 10]}
        checkboxSelection={false}
      />
    </div>
  );
};

DataTable.prototype = {
  loading: PropTypes.bool,
  rowCount: PropTypes.number.isRequired,
  rows: PropTypes.array.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onCellClick: PropTypes.func,
  columns: PropTypes.any.isRequired, // TODO: needs to provide proper type
  paginationModel: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
  }).isRequired,
};

DataTable.defaultProps = {
  onCellClick: () => {},
  loading: false,
};

export default DataTable;
