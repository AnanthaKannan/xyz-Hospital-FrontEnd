import { type } from "node:os";

type msg = {
  [key: string]: string;
}

const msg = {
  "SC01": "success to get data",
  "SUCCESS02": "",

  "ERR01": "name is a required field",
  "ERR02": "specialist is a required field",
  "ERR03": "Please select at least one day",
  "ERR04": "Please select doctor available time",
}

export default msg;