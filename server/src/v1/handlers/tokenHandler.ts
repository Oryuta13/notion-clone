// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'JWT'.
const JWT = require("jsonwebtoken");
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'User'.
const User = require("../models/user");

// クライアントから渡されたJWTが正常か検証する
const tokenDecode = (req: any) => {
  // リクエストヘッダーからauthorizationフィールドを指定してベアラトークンを取得
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    // ベアラだけを取得
    const bearer = bearerHeader.split(" ")[1];
    try {
      // ベアラと秘密鍵情報を用いてJWTの検証と読み取りをする
      // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
      // ベアラと秘密鍵が正しくない場合はfalseを返す、権限がない判定にする
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

// JWT認証を検証するためのミドルウェア
// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.verifyToken = async (req: any, res: any, next: any) => {
  const tokenDecoded = tokenDecode(req);
  // デコードしたトークンが存在すれば、そのトークンと一致するユーザーを探してくる
  if (tokenDecoded) {
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json("権限がありません");
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};
