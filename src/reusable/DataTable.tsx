import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const DataTable = ({
  rows,
  columns,
  onCellClick,
  rowCount,
  paginationModel,
  setPaginationModel,
  loading,
}) => {
  const onPageChange = (props) => {
    setPaginationModel(props);
  };

  return (
    <DataGrid
      sx={{ margin: 0, padding: 0 }}
      rowHeight={40}
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
  );
};

DataTable.prototype = {
  loading: PropTypes.bool,
  rowCount: PropTypes.number.isRequired,
  rows: PropTypes.array.isRequired,
  setPaginationModel: PropTypes.func.isRequired,
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
