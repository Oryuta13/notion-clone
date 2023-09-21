// メモスキーマを構築、モデルの作成
import mongoose from "mongoose";

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

export default mongoose.model("Memo", memoSchema);
