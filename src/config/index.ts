type configType = {
  apiURL: string;
  patientRecord: string;
  poolData: Object;
  imgURL: string;
  doctor: string;
  patient: string;
}

export const config: configType = {
  apiURL: 'https://u2f00s7xt0.execute-api.us-east-1.amazonaws.com/dev',
  imgURL: import.meta.env.VITE_APP_IMG_URL,
  patientRecord: 'patientRecord',
  patient: 'patient',
  doctor: 'doctor',
  poolData: {
    UserPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
    ClientId: import.meta.env.VITE_APP_CLIENT_ID,
    region: import.meta.env.VITE_APP_REGION,
  },
};

export default config;
