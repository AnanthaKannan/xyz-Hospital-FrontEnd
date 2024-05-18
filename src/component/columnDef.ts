// const dateFn = require('date-fn');
import dateFn from 'date-fn'
import { fromDateToAgeConverter, getGenderByValue } from '../lib/index'

export const listPatientColumnDef: any = [
  {
    headerName: 'ID',
    field: 'id',
    sortable: true,
    filter: true,
    width: 100,
  },
  {
    headerName: 'IdenityNo',
    field: 'idenityNo',
    sortable: true,
    filter: true,
    width: 100,
  },
  {
    headerName: 'Name',
    field: 'name',
    sortable: true,
    filter: true,
    cellRenderer: (params) => {
      const { data } = params;
      const fullName = {
        firstName: data.firstName ? data.firstName : '',
        lastName: data.lastName ? data.lastName : '',
        middleName: data.middleName ? data.middleName : '',
        name: data.name ? data.name : '', // remove the name once name converted into first, middle last name
      };
      const {
        firstName, lastName, middleName, name,
      } = fullName;
      return `${name} ${firstName} ${middleName} ${lastName}`;
    },
  },
  {
    headerName: 'Gender',
    field: 'gender',
    width: 100,
    sortable: true,
    filter: true,
    cellRenderer: ({ value }: any) => getGenderByValue(value),
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Phone',
    field: 'phone',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Date Of Birth',
    field: 'dob',
    sortable: true,
    filter: true,
    cellRenderer: ({ value }: any) => dateFn.date(value, 104, '-'),
  },
  {
    headerName: 'Age',
    field: 'age',
    sortable: true,
    width: 100,
    filter: true,
    cellRenderer: (params) => fromDateToAgeConverter(params.data?.dob),
  },
  {
    headerName: 'View',
    field: 'view',
    cellRenderer: 'ViewCellRender',
    width: 100,
  },
  {
    headerName: 'Record',
    field: 'record',
    cellRenderer: 'RecordCellRender',
    width: 100,
  },
  {
    headerName: 'Delete',
    field: 'delete',
    cellRenderer: 'DeleteCellRender',
    width: 100,
  },
  {
    headerName: 'Edit',
    field: 'edit',
    cellRenderer: 'EditCellRender',
    width: 100,
  },
];

