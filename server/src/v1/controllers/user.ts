// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'JWT'.
const JWT = require("jsonwebtoken");
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const CryptoJS = require("crypto-js");
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'User'.
const User = require("../models/user");

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.register = async (req: any, res: any) => {
  // パスワードを受け取る
  const password = req.body.password;

  try {
    // パスワードの暗号化
    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    // ユーザーの新規作成
    const user = await User.create(req.body);
    // JWTの発行
    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ユーザーログイン用API
// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.login = async (req: any, res: any) => {
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

    // パスワードが合っているか照合する
    // DBのパスワードを復号化する
    const descryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
      process.env.SECRET_KEY
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
    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });

    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};
