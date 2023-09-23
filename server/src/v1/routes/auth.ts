import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
import User from "../models/user";
import * as validation from "../handlers/validation";
import * as userController from "../controllers/user";
import * as tokenHandler from "../handlers/tokenHandler";

const router = Router();
dotenv.config();

// ユーザー新規登録API
router.post(
  "/register",
  // バリデーションチェック
  [
    body("username")
      .isLength({ min: 8 })
      .withMessage("ユーザー名は8文字以上である必要があります"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("パスワードは8文字以上である必要があります"),
    body("confirmPassword")
      .isLength({ min: 8 })
      .withMessage("確認用パスワードは8文字以上である必要があります"),
    body("username").custom(async (value: string) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("このユーザー名は既に使われています");
      }
    }),
  ],
  validation.validate,
  userController.register
);

// ログイン用API
router.post(
  "/login",
  [
    body("username")
      .isLength({ min: 8 })
      .withMessage("ユーザー名は８文字以上である必要があります"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("パスワードは８文字以上である必要があります"),
  ],
  validation.validate,
  userController.login
);

// JWT認証API
router.post(
  "/verify-token",
  tokenHandler.verifyToken,
  (req: Request, res: Response) => {
    return res.status(200).json({ user: req.user });
  }
);

export default router;
