// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = require("express").Router();
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const memoController = require("../controllers/memo");
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'tokenHandl... Remove this comment to see the full error message
const tokenHandler = require("../handlers/tokenHandler");

// メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create);

// ログインしているユーザーのメモをすべて取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);

// ログインしているユーザーのメモを1つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

// ログインしているユーザーのメモを1つ更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

// ログインしているユーザーのメモを1つ削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = router;
