import { type } from "os";
import CreateDoctor from "./page/CreateDoctor";
import CreatePatient from "./page/CreatePatient";
import CreateHospital from "./page/CreateHospital";
import ListPatient from "./page/ListPatient";
import ListDoctor from "./page/ListDoctor";
import PatientRecord from "./page/PatientRecord";
import FeedBack from "./page/FeedBack";

import DummyPage from "./page/Dummy";
import Dashboard from "./page/Dashboard";

import LoginComp from "./CognitoComp/LoginComp";
import SignUpComp from "./CognitoComp/SignUpComp";
import ConfirmationCodeComp from "./CognitoComp/ConfirmationCodeComp";
import ForgotPasswordComp from "./CognitoComp/ForgotPasswordComp";
import ChangePassword from "./page/ChangePassword";
import ProfileDetails from "./page/ProfileDetails";
import VitalSigns from "./page/VitalSigns";
import Page404 from "./page/Page404";

type routeType = {
  PATH: string,
  COMPONENT: any
}

const routes: routeType[] = [
  {
    COMPONENT: <ProfileDetails />,
    PATH: '/profile'
  },
  {
    COMPONENT: <VitalSigns />,
    PATH: '/vital-signs'
  },
  {
    COMPONENT: <Dashboard />,
    PATH: '/dashboard'
  },
  {
    COMPONENT: <ChangePassword />,
    PATH: '/change-password'
  },
  {
    COMPONENT: <DummyPage />,
    PATH: '/dummy'
  },
  {
    COMPONENT: <ConfirmationCodeComp />,
    PATH: '/confirmation-code'
  },
  {
    COMPONENT: <SignUpComp />,
    PATH: '/sing-up'
  },
  {
    COMPONENT: <LoginComp />,
    PATH: '/login'
  },
  {
    COMPONENT: <ForgotPasswordComp />,
    PATH: '/forgot-password'
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
    COMPONENT: <ListPatient />,
    PATH: '/list-patient'
  },
  {
    COMPONENT: <PatientRecord />,
    PATH: '/patient-record'
  },
  {
    COMPONENT: <LoginComp />,
    PATH: '/'
  },
  {
    PATH: '*',
    COMPONENT: <Page404 />
  }
]

export default routes