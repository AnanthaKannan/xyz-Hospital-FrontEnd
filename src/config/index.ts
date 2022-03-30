import { type } from "os";

type configType = {
  apiURL: string;
  patientRecord: string;
}

export const config: configType = {
  apiURL:"https://5347sl44pj.execute-api.us-east-1.amazonaws.com/dev",
  patientRecord: "/patientRecord",
};

export default config
