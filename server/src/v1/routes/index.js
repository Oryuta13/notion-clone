const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/task", require("./task"));

module.exports = router;
