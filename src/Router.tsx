import { type } from "os";
import  CreateDoctor from "./page/CreateDoctor";
import  CreatePatient from "./page/CreatePatient";
import CreateHospital from "./page/CreateHospital";
import ListPatient from "./page/ListPatient";
import ListDoctor from "./page/ListDoctor";
import PatientRecord from "./page/PatientRecord";
import FeedBack from "./page/FeedBack";
import Login from "./page/Login";
import SignUp from "./page/SignUp";

type routeType = {
    PATH: string,
    COMPONENT: any
}

const routes: routeType[] = [
  {
    COMPONENT: <SignUp />,
    PATH: '/sing-up'
  },
  {
    COMPONENT: <Login />,
    PATH: '/login'
  },
  {
    COMPONENT: <FeedBack />,
    PATH: '/feed-back'
  },
  {
    COMPONENT: <CreatePatient />,
    PATH: '/create-patient'
  },
  {
    COMPONENT: <CreateDoctor />,
    PATH: '/create-doctor'
  },
  {
    COMPONENT: <ListDoctor />,
    PATH: '/list-doctor'
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
    COMPONENT: <PatientRecord />,
    PATH: '/patient-record'
  },
  {
    COMPONENT: <Login />,
    PATH: '/'
  }
]

export default routes