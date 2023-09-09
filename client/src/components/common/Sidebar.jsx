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
import React from "react";
import assets from "../../assets/index";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  // ログアウトボタンが押されたら、ローカルストレージからJWTを削除しログインページにリダイレクトする
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 200,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              Todo
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton
          sx={{ pl: "20px" }}
          component={Link}
          to="/task/2444325kjlajsdf"
        >
          <Typography>🥕買い物リスト(仮)</Typography>
        </ListItemButton>
        <ListItemButton
          sx={{ pl: "20px" }}
          component={Link}
          to="/task/2444325kjlajsdf"
        >
          <Typography>🥕買い物リスト(仮)</Typography>
        </ListItemButton>
        <ListItemButton
          sx={{ pl: "20px" }}
          component={Link}
          to="/task/2444325kjlajsdf"
        >
          <Typography>🥕買い物リスト(仮)</Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
