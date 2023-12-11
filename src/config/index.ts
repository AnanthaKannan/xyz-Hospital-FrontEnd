type configType = {
  apiURL: string;
  patientRecord: string;
  poolData: Object;
  imgURL: string;
  doctor: string;
  patient: string;
}

export const config: configType = {
  apiURL: process.env.REACT_APP_API_URL,
  imgURL: process.env.REACT_APP_IMG_URL,
  patientRecord: 'patientRecord',
  patient: 'patient',
  doctor: 'doctor',
  poolData: {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID,
    region: process.env.REACT_APP_REGION,
  },
};

export default config;
