import { type } from "os";

type configType = {
  apiURL: string;
  patientRecord: string;
  poolData: Object;
  uploadFileUrl: string;
  imgURL: string;
}

export const config: configType = {
  apiURL:"https://5347sl44pj.execute-api.us-east-1.amazonaws.com/dev",
  uploadFileUrl: "https://4kzj8450nb.execute-api.us-east-1.amazonaws.com/dev/upload-image",
  imgURL: "",
  patientRecord: "/patientRecord",
  poolData: {
    UserPoolId: "us-east-1_QZq2QZq2Q",
    IdentityPoolId: "us-east-1:5347sl44pj:userpool/us-east-1_QZq2QZq2Q",
    ClientId: "5347sl44pj",
    region: "us-east-1",
    poolReionKey: "us-east-1:5347sl44pj:userpool/us-east-1_QZq2QZq2Q"
  }
};

export default config
