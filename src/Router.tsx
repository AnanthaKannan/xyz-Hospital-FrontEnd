import { lazy } from 'react'
import CreateDoctor from './page/CreateDoctor';
import CreatePatient from './page/CreatePatient';
import ListPatient from './page/ListPatient';
import ListDoctor from './page/ListDoctor';
import PatientRecord from './page/PatientRecord';
import FeedBack from './page/FeedBack';

import DummyPage from './page/Dummy';
import Dashboard from './page/Dashboard';

import LoginComp from './CognitoComp/LoginComp';
import SignUpComp from './CognitoComp/SignUpComp';
import ConfirmationCodeComp from './CognitoComp/ConfirmationCodeComp';
import ForgotPasswordComp from './CognitoComp/ForgotPasswordComp';
import ChangePassword from './page/ChangePassword';
import ProfileDetails from './page/ProfileDetails';
import VitalSigns from './page/VitalSigns';
import Page404 from './page/Page404';

// const CreateDoctor = lazy(() => import('./page/CreateDoctor'));
// const CreatePatient = lazy(() => import('./page/CreatePatient'));
// const ListPatient = lazy(() => import('./page/ListPatient'));
// const ListDoctor = lazy(() => import('./page/ListDoctor'));
// const PatientRecord = lazy(() => import('./page/PatientRecord'));
// const FeedBack = lazy(() => import('./page/FeedBack'));

// const DummyPage = lazy(() => import('./page/Dummy'));
// const Dashboard = lazy(() => import('./page/Dashboard'));

// const LoginComp = lazy(() => import('./CognitoComp/LoginComp'));
// const SignUpComp = lazy(() => import('./CognitoComp/SignUpComp'));
// const ConfirmationCodeComp = lazy(() => import('./CognitoComp/ConfirmationCodeComp'));
// const ForgotPasswordComp = lazy(() => import('./CognitoComp/ForgotPasswordComp'));
// const ChangePassword = lazy(() => import('./page/ChangePassword'));
// const ProfileDetails = lazy(() => import('./page/ProfileDetails'));
// const VitalSigns = lazy(() => import('./page/VitalSigns'));
// const Page404 = lazy(() => import('./page/Page404'));

type routeType = {
  PATH: string,
  COMPONENT: any
}

const routes: routeType[] = [
  {
    COMPONENT: <ProfileDetails />,
    PATH: '/profile',
  },
  {
    COMPONENT: <VitalSigns />,
    PATH: '/vital-signs',
  },
  {
    COMPONENT: <Dashboard />,
    PATH: '/dashboard',
  },
  {
    COMPONENT: <ChangePassword />,
    PATH: '/change-password',
  },
  {
    COMPONENT: <DummyPage />,
    PATH: '/dummy',
  },
  {
    COMPONENT: <ConfirmationCodeComp />,
    PATH: '/confirmation-code',
  },
  {
    COMPONENT: <SignUpComp />,
    PATH: '/sing-up',
  },
  {
    COMPONENT: <LoginComp />,
    PATH: '/login',
  },
  {
    COMPONENT: <ForgotPasswordComp />,
    PATH: '/forgot-password',
  },
  {
    COMPONENT: <FeedBack />,
    PATH: '/feed-back',
  },
  {
    COMPONENT: <CreatePatient />,
    PATH: '/create-patient',
  },
  {
    COMPONENT: <CreateDoctor />,
    PATH: '/create-doctor',
  },
  {
    COMPONENT: <ListDoctor />,
    PATH: '/list-doctor',
  },
  {
    COMPONENT: <ListPatient />,
    PATH: '/list-patient',
  },
  {
    COMPONENT: <PatientRecord />,
    PATH: '/patient-record',
  },
  {
    COMPONENT: <LoginComp />,
    PATH: '/',
  },
  {
    PATH: '*',
    COMPONENT: <Page404 />,
  },
];

export default routes;
