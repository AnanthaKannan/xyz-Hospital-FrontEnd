import { lazy } from 'react'
const DashboardComp = lazy(() => import('./component/DashboardComp'));
const ProfileDetails = lazy(() => import('./page/ProfileDetails'));
const LoginComp = lazy(() => import('./CognitoComp/LoginComp'));
const SignUpComp = lazy(() => import('./CognitoComp/SignUpComp'));
const ConfirmationCodeComp = lazy(() => import('./CognitoComp/ConfirmationCodeComp'));
const ForgotPasswordComp = lazy(() => import('./CognitoComp/ForgotPasswordComp'));
const ChangePasswordComp = lazy(() => import('./CognitoComp/ChangePasswordComp'));
const VitalSigns = lazy(() => import('./component/VitalSignsComp'));
const Page404 = lazy(() => import('./page/Page404'));
const DummyPage = lazy(() => import('./page/Dummy'));
const CreatePatient = lazy(() => import('./component/CreatePatientComp'));
const CreateDoctor = lazy(() => import('./component/CreateDoctorComp'));
const ListPatient = lazy(() => import('./component/ListPatientComp'));
const ListDoctor = lazy(() => import('./component/ListDoctorComp'));
const PatientRecord = lazy(() => import('./component/PatientRecordComp'));
const FeedBack = lazy(() => import('./component/FeedBackComponent'));

type routeType = {
  PATH: string,
  COMPONENT: any,
  TITLE: string,
  NAV: boolean
}

const routes: routeType[] = [
  {
    COMPONENT: <ProfileDetails />,
    PATH: '/profile',
    TITLE: 'Profile Details',
    NAV: true,
  },
  {
    COMPONENT: <VitalSigns />,
    PATH: '/vital-signs',
    TITLE: '',
    NAV: true,
  },
  {
    COMPONENT: <DashboardComp />,
    PATH: '/dashboard',
    TITLE: 'Dashboard',
    NAV: true
  },
  {
    COMPONENT: <ChangePasswordComp />,
    PATH: '/change-password',
    TITLE: 'Change Password',
    NAV: true
  },
  {
    COMPONENT: <DummyPage />,
    PATH: '/dummy',
    'TITLE': '',
    'NAV': false,
  },
  {
    COMPONENT: <ConfirmationCodeComp />,
    PATH: '/confirmation-code',
    'TITLE': 'Confirmation Code',
    'NAV': false
  },
  {
    COMPONENT: <SignUpComp />,
    PATH: '/sing-up',
    'TITLE': 'Sign Up',
    'NAV': false
  },
  {
    COMPONENT: <LoginComp />,
    PATH: '/login',
    'TITLE': 'Login',
    'NAV': false
  },
  {
    COMPONENT: <ForgotPasswordComp />,
    PATH: '/forgot-password',
    'TITLE': 'Forgot Password',
    'NAV': false,
  },
  {
    COMPONENT: <FeedBack />,
    PATH: '/feed-back',
    'TITLE': 'Feed Back',
    'NAV': true
  },
  {
    COMPONENT: <CreatePatient />,
    PATH: '/create-patient',
    TITLE: 'Create Patient',
    NAV: true
  },
  {
    COMPONENT: <CreateDoctor />,
    PATH: '/create-doctor',
    TITLE: 'Create Doctor',
    NAV: true
  },
  {
    COMPONENT: <ListDoctor />,
    PATH: '/list-doctor',
    TITLE: 'List Doctor',
    NAV: true
  },
  {
    COMPONENT: <ListPatient />,
    PATH: '/list-patient',
    TITLE: '',
    NAV: true
  },
  {
    COMPONENT: <PatientRecord />,
    PATH: '/patient-record',
    TITLE: 'List Patient',
    NAV: true
  },
  {
    COMPONENT: <LoginComp />,
    PATH: '/',
    TITLE: 'LOGIN',
    NAV: false
  },
  {
    PATH: '*',
    COMPONENT: <Page404 />,
    TITLE: '',
    NAV: false
  },
];

export default routes;
