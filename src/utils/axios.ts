import axios from "axios";

export const axiosRequest = (
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: any
) => {
  let token = "";
  const localUserInfo = localStorage.getItem("user");
  if (localUserInfo) {
    token = JSON.parse(localUserInfo).token;
  }
  const config = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Add token to headers if it exists
    },
    ...(data && { data }), // Only add data property if it exists
  };

  return axios(config).then((response) => ({
    data: response.data,
    message: response.data.message || "Request successful",
  }));
};
