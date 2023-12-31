import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [usernameErrText, setUsernameErrText] = useState<string>("");
  const [passwordErrText, setPasswordErrText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target as HTMLFormElement);
    const username = data.get("username")?.toString().trim() as string;
    const password = data.get("password")?.toString().trim() as string;
    console.log(username);
    console.log(password);

    // バリデーションチェック
    let error = false;
    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください");
    }

    // もしエラーが起きれば次に進ませない
    if (error) return;

    setLoading(true);

    // ログインAPIを叩く
    try {
      const res: any = await authApi.login({
        username,
        password,
      });
      console.log(res);
      // ログイン成功後にユーザー情報をreduxのステートに保存
      dispatch(setUser({ username: res.data.user.username }));

      console.log(res);
      setLoading(false);
      // ローカルストレージにトークンを保存
      localStorage.setItem("token", res.data.token);
      console.log("ログインに成功しました");
      navigate("/");
    } catch (err: any) {
      setLoading(false);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err: any) => {
        if (err.path === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.path === "password") {
          setPasswordErrText(err.msg);
        }
      });
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ""}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Login;
