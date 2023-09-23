import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  // エンドポイントとなるURLのベース
  baseURL: BASE_URL,
});

// APIを叩く前の前処理
axiosClient.interceptors.request.use(async (config: any) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      // リクエストヘッダーにJWTをつけてサーバーに渡す
      authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (err: AxiosError) => {
    throw err.response;
  }
);

export default axiosClient;
