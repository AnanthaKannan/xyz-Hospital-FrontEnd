type configType = {
  apiURL: string;
  patientRecord: string;
  poolData: Object;
  imgURL: string;
  doctor: string;
  patient: string;
}

export const config: configType = {
  apiURL: "https://uk9216o26e.execute-api.us-east-1.amazonaws.com/dev",
  imgURL: "https://learning-2025.s3.amazonaws.com",
  patientRecord: "patientRecord",
  patient: "patient",
  doctor: "doctor",
  poolData: {
    UserPoolId: "us-east-1_zW6IRMaXK",
    ClientId: "7b9nc4bje1pmfkgqtrqu70od78",
    region: "us-east-1"
  }
};

export default config

