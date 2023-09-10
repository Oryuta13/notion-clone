const router = require("express").Router();
const taskController = require("../controllers/task");
const tokenHandler = require("../handlers/tokenHandler");

// タスクを作成
router.post("/", tokenHandler.verifyToken, taskController.create);

module.exports = router;
