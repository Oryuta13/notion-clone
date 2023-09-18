// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'validation... Remove this comment to see the full error message
const { validationResult } = require("express-validator");

// バリデーションエラーを出力
// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
