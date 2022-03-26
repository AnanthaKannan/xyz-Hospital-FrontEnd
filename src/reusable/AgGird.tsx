import React, { useState } from 'react';
import { agGirdReactType } from '../type/type'
import {AgGridReact} from 'ag-grid-react';

const AgGirdReact = ({columnDefs, onCellClicked, frameworkComponents={}, rowData  }: agGirdReactType) => {

  const [gridApi, setGridApi] = useState(null);
  const [girdColumnApi, setGirdColumnApi] = useState(null);

  const onCellClicked_ = (event: any) => {
      try{
        onCellClicked(event)
      }
      catch(err){
          console.log(err);
      }
  }

  return (
    <div className='ag-theme-alpine mb-0'>
      <AgGridReact
      domLayout="autoHeight"
      onCellClicked= {(e: any) => onCellClicked_(e)}
      rowData={rowData}
      rowSelection="multiple"
      columnDefs={columnDefs}
      animateRows={true}
      onFirstDataRendered={(params: any) => params.api.sizeColumnsToFit()}
      pagination={true}
      paginationPageSize={10}
      frameworkComponents={frameworkComponents}
      ></AgGridReact>
    </div>
  )
}

export default AgGirdReact