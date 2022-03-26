import { type } from "os";
import  CreateDoctor from "./page/CreateDoctor";
import  CreatePatient from "./page/CreatePatient";
import CreateHospital from "./page/CreateHospital";
import ListPatient from "./page/ListPatient";


type routeType = {
    PATH: string,
    COMPONENT: any
}

const routes: routeType[] = [
  {
    COMPONENT: <CreatePatient />,
    PATH: '/create-patient'
  },
  {
    COMPONENT: <CreateHospital />,
    PATH: '/create-hospital'
  },
  {
    COMPONENT: <ListPatient />,
    PATH: '/list-patient'
  },
  {
    COMPONENT: <CreatePatient />,
    PATH: '/'
  }
]

export default routes