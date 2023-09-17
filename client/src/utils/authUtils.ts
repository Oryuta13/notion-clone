import authApi from "../api/authApi";

const authUtils = {
  // JWTチェック
  isAuthenticated: async () => {
    // Userが持っているJWTを取得
    const token = localStorage.getItem("token");
    // UserにJWTが付加されていなければリターン
    if (!token) return false;

    // JWTが付加されていた場合User情報を返す
    try {
      const res = await authApi.verifyToken();
      // @ts-expect-error TS(2339): Property 'user' does not exist on type 'AxiosRespo... Remove this comment to see the full error message
      return res.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
