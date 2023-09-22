import React, { useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { agGirdReactType } from '../type/type';

const AgGirdReact = ({
  columnDefs, onCellClicked, frameworkComponents = {}, rowData,
}: agGirdReactType) => {
  const onCellClickedEvent = (event: any) => {
    try {
      onCellClicked(event);
    } catch (err) {
      console.log(err);
    }
  };

  const onSortChanged = useCallback((event: any) => {
    // console.log('event', event)
    const sortState = event.columnApi
      .getColumnState()
      .find((column:any) => (column.sort !== undefined && column.sort !== null));
    console.log('sortState', sortState);
    console.log('again-state', event.api.paginationGetCurrentPage());
  }, []);

  // const onPaginationChanged = useCallback((event: any) => {
  //   console.log('event------------', event);
  //     console.log('pageNow', event.api.paginationGetCurrentPage())
  // }, [])

  const onFilterChanged = useCallback((event: any) => {
    console.log('onFilterChanged', event.api.getFilterModel());
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    console.log('------------------------------', params);
    // params.api.paginationGoToPage(1);
    // params.api.paginationSetPageSize(1);
  }, []);

  return (
    <div className="ag-theme-alpine mb-0">
      <AgGridReact
        onSortChanged={onSortChanged}
        onFilterChanged={onFilterChanged}
        domLayout="autoHeight"
        onCellClicked={(e: any) => onCellClickedEvent(e)}
        rowData={rowData}
        rowSelection="multiple"
        columnDefs={columnDefs}
        animateRows
        onFirstDataRendered={onFirstDataRendered}
        // onFirstDataRendered={(params: any) => params.api.sizeColumnsToFit()}
        pagination
        paginationPageSize={10}
        // onPaginationChanged={(e: any) => console.log('onPaginationChanged', e)}
        // onPaginationChanged={(e) => onPaginationChanged(e)}
        frameworkComponents={frameworkComponents}
        sortingOrder={['asc', 'desc']}
      />
    </div>
  );
};

export default AgGirdReact;
