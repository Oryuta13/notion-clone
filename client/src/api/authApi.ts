import { NewUser, User } from "../@types/User";
import axiosClient from "./axiosClient";

const authApi = {
  // 新規登録API
  register: (params: NewUser) => axiosClient.post("auth/register", params),
  // ログインAPI
  login: (params: User) => axiosClient.post("auth/login", params),
  // JWT認証API
  // authApi.verifyTokenで受け取る引数はトークンそのものなのでparamsではなくtokenを引数として渡す
  verifyToken: (token: string) =>
    axiosClient.post("auth/verify-token", { token }),
};

export default authApi;
