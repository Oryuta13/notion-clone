import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ページ遷移するごとに発火
  useEffect(() => {
    // JWTを持っているのか確認する
    const checkAuth = async () => {
      // 認証チェック
      const response = await authUtils.isAuthenticated();
      console.log(response?.user);
      if (!response?.user) {
        // userが存在しなければログインにリダイレクト
        navigate("/login");
      } else {
        // ユーザーを保存する
        dispatch(setUser(response.user));
      }
    };
    checkAuth();
  }, [navigate, dispatch]);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default AppLayout;
