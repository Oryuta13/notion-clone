import { Box, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import notionLogo from "../../assets/images/notion-logo.png";

const AuthLayout = () => {
  const navigate = useNavigate();

  // ページ遷移するごとに発火する
  useEffect(() => {
    // JWTを持っているのか確認する
    const checkAuth = async () => {
      // 認証チェック
      const response = await authUtils.isAuthenticated();
      if (response) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  // エラー発生のため一旦保留
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // const AuthLayout = () => { const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); const navigate = useNavigate(); // ページ遷移するごとに発火する useEffect(() => { // JWTを持っているのか確認する const checkAuth = async () => { // 認証チェック const response = await authUtils.isAuthenticated(); setIsAuthenticated(!!response?.user); }; checkAuth(); }, []);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={notionLogo}
            alt=""
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          Notionクローン
        </Box>
        <Outlet />
      </Container>
    </div>
  );
};

export default AuthLayout;
