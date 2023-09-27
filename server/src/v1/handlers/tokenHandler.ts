import JWT, { Secret } from "jsonwebtoken";
import User from "../models/user";
import { Request, Response, NextFunction } from "express";

// Requestに拡張でuser型を追加
declare global {
  namespace Express {
    interface Request {
      user: { id: string; username: string };
    }
  }
}

// クライアントから渡されたJWTが正常か検証する
const tokenDecode = (req: Request) => {
  // リクエストヘッダーからauthorizationフィールドを指定してベアラトークンを取得
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    // ベアラだけを取得
    const bearer = bearerHeader.split(" ")[1];
    try {
      // 環境変数から秘密鍵情報を取得
      const secretKey: Secret | undefined = process.env.TOKEN_SECRET_KEY;
      if (!secretKey) {
        // もし環境変数が未設定またはundefinedならエラーを返す
        return false;
      }

      // ベアラと秘密鍵情報を用いてJWTの検証と読み取りをする
      const decodedToken = JWT.verify(bearer, secretKey);
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
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 復号したトークンを取得
  const tokenDecoded = tokenDecode(req);
  // デコードしたトークンが存在すれば、そのトークンと一致するユーザーを探してくる
  if (tokenDecoded) {
    const user = await User.findById((tokenDecoded as any).id);
    // ユーザーが存在しない場合
    if (!user) {
      return res.status(401).json("権限がありません");
    }

    // リクエスト情報を取得したユーザーで上書き
    req.user = { id: user._id.toString(), username: user.username };
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};
