
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
    headerName: "createdAt",
    field: "createdAt",
    sortable: true,
    filter: true,
  },
  {
    headerName: "dob",
    field: "dob",
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
    headerName: "name",
    field: "name",
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

