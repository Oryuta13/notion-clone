// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = require("express").Router();
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'validation... Remove this comment to see the full error message
const { body, validationResult } = require("express-validator");

// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
require("dotenv").config();

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'User'.
const User = require("../models/user");
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const validation = require("../handlers/validation");
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const userController = require("../controllers/user");
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'tokenHandl... Remove this comment to see the full error message
const tokenHandler = require("../handlers/tokenHandler");

// ユーザー新規登録API
router.post(
  "/register",
  // バリデーションチェック
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上である必要があります"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは8文字以上である必要があります"),
  body("username").custom((value: any) => {
    return User.findOne({ username: value }).then((user: any) => {
      if (user) {
        return Promise.reject("このユーザー名は既に使われています");
      }
    });
  }),
  validation.validate,
  userController.register
);

// ログイン用API
router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は８文字以上である必要があります"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは８文字以上である必要があります"),
  validation.validate,
  userController.login
);

// JWT認証API
router.post("/verify-token", tokenHandler.verifyToken, (req: any, res: any) => {
  return res.status(200).json({ user: req.user });
});

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = router;
