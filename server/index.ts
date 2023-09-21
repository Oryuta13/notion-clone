import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = 8000;
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./src/v1/routes/";
dotenv.config();

// corsの設定
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// jsonオブジェクトを扱う
app.use(express.json());

// APIルーティング
app.use("/api/v1", apiRoutes);

// DB接続
try {
  // DBの設定ファイルから接続情報を取得
  const MONGODB_URL: any = process.env.MONGODB_URL;

  // DBに接続する
  mongoose.connect(MONGODB_URL);
  console.log("DBと接続中...");
} catch (error) {
  console.log(error);
}

// ローカルサーバーを起動
app.listen(PORT, () => {
  console.log("ローカルサーバー起動中...");
});
