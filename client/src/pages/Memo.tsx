import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { IconButton, TextField } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";
import EmojiPicker from "../components/common/EmojiPicker";
import { RootState } from "../redux/store";

const Memo = () => {
  // memoIdを取得してくる
  const { memoId } = useParams<{ memoId: string }>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memos = useSelector((state: RootState) => state.memo.value);

  // memoIdが変更されるたびにそのメモを取得する
  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setIcon(res.data.icon);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer: NodeJS.Timeout | null = null;
  // 0.5秒
  const timeout = 500;

  // 更新されて0.5秒経ったらupdateAPIを叩く、0.5秒以下で更新され続ければtimerは0に戻る
  const updateTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const updateDescription = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      await memoApi.delete(memoId);
      const newMemos = memos.filter((e: any) => e._id !== memoId);
      if (newMemos.length === 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }
      dispatch(setMemo(newMemos));
    } catch (err) {
      alert(err);
    }
  };

  const onIconChange = async (newIcon: string) => {
    let temp = [...memos];
    // 詳細ページで該当のメモのindexを取得
    const index = temp.findIndex((e) => e._id === memoId);
    // アイコンのみ引数で受け取ったアイコンに更新
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    // tempした現在のメモの状態をsetMemoで状態を更新する
    dispatch(setMemo(temp));
    // updateApiを叩いてDBのアイコンフィールドも更新
    try {
      await memoApi.update(memoId, { icon: newIcon });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton variant="outlined" color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            onChange={updateTitle}
            value={title}
            placeholder="無題"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
            }}
          />
          <TextField
            onChange={updateDescription}
            value={description}
            placeholder="追加"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "1rem" },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Memo;
