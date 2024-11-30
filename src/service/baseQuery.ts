import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://u2f00s7xt0.execute-api.us-east-1.amazonaws.com/dev/",
  prepareHeaders: (headers) => {
    headers.set("authorization", `${localStorage.getItem("token")}`);
    return headers;
  },
});
