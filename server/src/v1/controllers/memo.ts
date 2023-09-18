// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const Memo = require("../models/memo");

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.create = async (req: any, res: any) => {
  try {
    // メモの個数をカウントする
    const memoCount = await Memo.find().count();
    // メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch {
    // @ts-expect-error TS(2304): Cannot find name 'err'.
    res.status(500).json(err);
  }
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getAll = async (req: any, res: any) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    res.status(200).json(memos);
  } catch {
    // @ts-expect-error TS(2304): Cannot find name 'err'.
    res.status(500).json(err);
  }
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getOne = async (req: any, res: any) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.update = async (req: any, res: any) => {
  const { memoId } = req.params;
  const { title, description } = req.body;

  try {
    if (title === "") req.body.title = "無題";
    if (description === "")
      req.body.description = "こちらに自由に記入してください";

    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      $set: req.body,
    });

    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.delete = async (req: any, res: any) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    await Memo.deleteOne({ _id: memoId });
    res.status(200).json("メモを削除しました");
  } catch (err) {
    res.status(500).json(err);
  }
};
