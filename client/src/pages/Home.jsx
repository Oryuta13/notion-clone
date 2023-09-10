import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import taskApi from "../api/taskApi";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createTask = async () => {
    try {
      setLoading(true);
      const res = await taskApi.create();
      console.log(res);
      navigate(`/task/${res._id}`);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        onClick={() => createTask()}
        loading={loading}
      >
        最初のタスクを作成
      </LoadingButton>
    </Box>
  );
};

export default Home;
