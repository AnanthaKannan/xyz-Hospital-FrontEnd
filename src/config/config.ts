import { type } from "os";

type configType = {
  apiURL: string;
}

export const config: configType = {
  apiURL:"http://localhost:4000",
};

export default config
