import { type } from "os";
import  CreateDoctor from "./page/CreateDoctor";
import  CreatePatient from "./page/CreatePatient";
import CreateHospital from "./page/CreateHospital";



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
    COMPONENT: <CreateDoctor />,
    PATH: '/create-doctor'
  },
  {
    COMPONENT: <CreatePatient />,
    PATH: '/'
  }
]

export default routes