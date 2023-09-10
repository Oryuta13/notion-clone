const Task = require("../models/task");

exports.create = async (req, res) => {
  try {
    // タスクの個数をカウントする
    const taskCount = await Task.find().count();
    // タスク新規作成
    const task = await Task.create({
      user: req.user._id,
      position: taskCount > 0 ? taskCount : 0,
    });
    res.status(201).json(task);
  } catch {
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort("-position");
    res.status(200).json(tasks);
  } catch {
    res.status(500).json(err);
  }
};
