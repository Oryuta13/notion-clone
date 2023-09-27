import authApi from "../api/authApi";

const authUtils = {
  // JWTチェック
  isAuthenticated: async (): Promise<any | null> => {
    // Userが持っているJWTを取得
    const token = localStorage.getItem("token");
    // UserにJWTが付加されていなければリターン
    if (!token) return null;

    // JWTが付加されていた場合user情報を返す
    try {
      const response = await authApi.verifyToken(token);
      return response.data;
    } catch (err) {
      console.error(err);
      // エラーが発生した場合はnullを返す
      return null;
    }
  },
};

export default authUtils;
