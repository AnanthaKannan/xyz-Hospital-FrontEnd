const dateFn = require('date-fn')
export const listPatientColumnDef: any = [
  {
    headerName: "ID",
    field: "_id",
    sortable: true,
    filter: true,
    width: 100,
    // cellStyle: {
    //   textAlign: "center"
    // }

  },
  {
    headerName: "name",
    field: "name",
    sortable: true,
    filter: true,
  },
  {
    headerName: "email",
    field: "email",
    sortable: true,
    filter: true,
  },
  {
    headerName: "phone",
    field: "phone",
    sortable: true,
    filter: true,
  },
  {
    headerName: "dob",
    field: "dob",
    sortable: true,
    filter: true,
    cellRenderer: ({value}: any) => {
      return dateFn.date(value, 104, '-')
    }
  },
  {
    headerName: "Age",
    field: "age",
    sortable: true,
    filter: true,
    cellRenderer:(params)=>{
      return params.value+" years";
    }
  },
  {
    headerName: "View",
    field: "view",
    cellRenderer: "ViewCellRender",
    width: 100
  },
  {
    headerName: "Delete",
    field: "delete",
    cellRenderer: "DeleteCellRender",
    width: 100,
  },
  {
    headerName: "Edit",
    field: "edit",
    cellRenderer: "EditCellRender",
    width: 100,
  },
]

