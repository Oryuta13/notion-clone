import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();

  // アイコンが変更されるたびに選択された絵文字を更新する
  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  return (
    <Box>
      <Typography variant="h3" fontWeight="700" sx={{ cursor: "pointer" }}>
        {selectedEmoji}
      </Typography>
      <Box sx={{ display: "none" }}>
        <Picker />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
