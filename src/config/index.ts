import { type } from "os";

type configType = {
  apiURL: string;
  patientRecord: string;
  poolData: Object;
  uploadFileUrl: string;
  imgURL: string;
}

export const config: configType = {
  apiURL: "https://5347sl44pj.execute-api.us-east-1.amazonaws.com/dev",
  // apiURL: "http://localhost:3000/dev",
  uploadFileUrl: "https://4kzj8450nb.execute-api.us-east-1.amazonaws.com/dev/upload-image",
  imgURL: "",
  patientRecord: "/patientRecord",
  poolData: {
    UserPoolId: "us-east-1_ohC12gMu8",
    ClientId: "5nt9me8vg52i7rescrmen17l69",
    region: "us-east-1"
  }
};

export default config
