import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, { useEffect, useState } from "react";
import assets from "../../assets/index";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoId } = useParams();
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const user = useSelector((state) => state.user.value);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const memos = useSelector((state) => state.memo.value);

  // ログアウトボタンが押されたら、ローカルストレージからJWTを削除しログインページにリダイレクトする
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemo(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    const activeIndex = memos.findIndex((e: any) => e._id === memoId);
    setActiveIndex(activeIndex);
  }, [navigate]);

  const addMemo = async () => {
    try {
      const res = await memoApi.create();
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));
      // 作成したメモにリダイレクト
      // @ts-expect-error TS(2339): Property '_id' does not exist on type 'AxiosRespon... Remove this comment to see the full error message
      navigate(`memo/${res._id}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ListItemButton>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <IconButton onClick={logout}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Box sx={{ paddingTop: "10px" }}></Box>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ListItemButton>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Typography variant="body2" fontWeight="700">
              Memo
            </Typography>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <IconButton onClick={() => addMemo()}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((item: any, index: any) => (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ListItemButton
            sx={{ pl: "20px" }}
            component={Link}
            to={`/memo/${item._id}`}
            key={item._id}
            selected={index === activeIndex}
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Typography>
              {item.icon} {item.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
