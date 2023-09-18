// ユーザースキーマを構築、モデルの作成
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'mongoose'.
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = mongoose.model("User", userSchema);
