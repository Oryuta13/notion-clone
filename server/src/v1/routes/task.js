const router = require("express").Router();
const taskController = require("../controllers/task");
const tokenHandler = require("../handlers/tokenHandler");

// タスクを作成
router.post("/", tokenHandler.verifyToken, taskController.create);

// ログインしているユーザーのタスクをすべて取得
router.get("/", tokenHandler.verifyToken, taskController.getAll);

module.exports = router;
