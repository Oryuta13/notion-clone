import Memo from "../models/memo";
import { Request, Response } from "express";

// メモ新規登録API
export const create = async (req: Request, res: Response) => {
  try {
    // メモの個数をカウントする
    const memoCount = await Memo.find({ user: req.user.id }).count();
    // メモ新規作成
    const memo = await Memo.create({
      user: req.user.id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

// メモ一覧取得API
export const getAll = async (req: Request, res: Response) => {
  try {
    const memos = await Memo.find({ user: req.user.id }).sort("-position");
    res.status(200).json(memos);
  } catch (err) {
    res.status(500).json(err);
  }
};

// メモ詳細取得API
export const getOne = async (req: Request, res: Response) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user.id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

// メモ更新API
export const update = async (req: Request, res: Response) => {
  const { memoId } = req.params;
  const { title, description } = req.body;

  try {
    if (title === "") req.body.title = "無題";
    if (description === "")
      req.body.description = "こちらに自由に記入してください";

    const memo = await Memo.findOne({ user: req.user.id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      $set: req.body,
    });

    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json(err);
  }
};

// メモ削除API
export const deleteMemo = async (req: Request, res: Response) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user.id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    await Memo.deleteOne({ _id: memoId });
    res.status(200).json("メモを削除しました");
  } catch (err) {
    res.status(500).json(err);
  }
};
