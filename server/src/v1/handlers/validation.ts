import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// バリデーションエラーを出力
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
