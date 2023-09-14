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
      return res.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
