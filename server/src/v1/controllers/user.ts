import JWT from "jsonwebtoken";
import CryptoJS from "crypto-js";
import User from "../models/user";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  // パスワードを受け取る
  const password: string = req.body.password;

  try {
    // SECRET_KEYが存在しない場合のデフォルト値を指定する
    const secretKey: string = process.env.SECRET_KEY || "default-secret-key";

    // パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, secretKey);
    // ユーザーの新規作成
    const user = await User.create(req.body);
    // JWTの発行
    const token: string = JWT.sign({ id: user._id }, secretKey, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ユーザーログイン用API
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // DBからユーザーが存在するか探す
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            path: "username",
            msg: "ユーザー名が無効です",
          },
        ],
      });
    }

    // SECRET_KEYが存在しない場合のデフォルト値を指定する
    const secretKey: string = process.env.SECRET_KEY || "default-secret-key";

    // パスワードが合っているか照合する
    // DBのパスワードを復号化する
    const descryptedPassword: string = CryptoJS.AES.decrypt(
      user.password,
      secretKey
    ).toString(CryptoJS.enc.Utf8);

    // 復号化したパスワードが一致するかチェック
    if (descryptedPassword !== password) {
      return res.status(401).json({
        errors: [
          {
            path: "password",
            msg: "パスワードが無効です",
          },
        ],
      });
    }

    // JWTを発行
    const token: string = JWT.sign({ id: user._id }, secretKey, {
      expiresIn: "24h",
    });

    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};
