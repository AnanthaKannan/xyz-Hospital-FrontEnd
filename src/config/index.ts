type configType = {
  apiURL: string;
  patientRecord: string;
  poolData: Object;
  imgURL: string;
  doctor: string;
  patient: string;
}

export const config: configType = {
  apiURL: "https://5347sl44pj.execute-api.us-east-1.amazonaws.com/dev",
  imgURL: "https://learning-2025.s3.amazonaws.com",
  patientRecord: "patientRecord",
  patient: "patient",
  doctor: "doctor",
  poolData: {
    UserPoolId: "us-east-1_ohC12gMu8",
    ClientId: "5nt9me8vg52i7rescrmen17l69",
    region: "us-east-1"
  }
};

export default config

