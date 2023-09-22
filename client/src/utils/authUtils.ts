import authApi from "../api/authApi";
import { AxiosResponse } from "axios";

const authUtils = {
  // JWTチェック
  isAuthenticated: async (): Promise<boolean | undefined> => {
    // Userが持っているJWTを取得
    const token = localStorage.getItem("token");
    // UserにJWTが付加されていなければリターン
    if (!token) return false;

    // JWTが付加されていた場合User情報を返す
    try {
      const res: AxiosResponse = await authApi.verifyToken();
      return res.data.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
