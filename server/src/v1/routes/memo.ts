import { Router } from "express";
import * as memoController from "../controllers/memo";
import * as tokenHandler from "../handlers/tokenHandler";

const router = Router();

// メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create);

// ログインしているユーザーのメモをすべて取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);

// ログインしているユーザーのメモを1つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

// ログインしているユーザーのメモを1つ更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

// ログインしているユーザーのメモを1つ削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.deleteMemo);

export default router;
