import axiosClient from "./axiosClient";

const authApi = {
  register: (params: any) => axiosClient.post("auth/register", params),
  login: (params: any) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/verify-token"),
};

export default authApi;
