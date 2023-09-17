// メモスキーマを構築、モデルの作成
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'mongoose'.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "📝",
  },
  title: {
    type: String,
    default: "無題",
  },
  description: {
    type: String,
    default: "こちらに自由に記入してください。",
  },
  position: {
    type: Number,
  },
});

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = mongoose.model("Memo", memoSchema);
