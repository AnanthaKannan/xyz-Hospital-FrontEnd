import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config"

export const baseQuery = fetchBaseQuery({
  baseUrl: config.apiURL,
  prepareHeaders: (headers) => {
    headers.set("authorization", `${localStorage.getItem("token")}`);
    return headers;
  },
});
