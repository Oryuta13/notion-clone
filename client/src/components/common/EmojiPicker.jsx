import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  // アイコンが変更されるたびに選択された絵文字を更新する
  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  // クリックされるたびtrueとfalseを切り替える
  const showPicker = () => setIsShowPicker(!isShowPicker);

  const selectEmoji = (e) => {
    const emojiCode = e.unified.split("-");
    console.log(emojiCode);
    let codesArray = [];
    emojiCode.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    console.log(emoji);
    // 絵文字を選択したらpickerを閉じる
    setIsShowPicker(false);
    props.onChange(emoji);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      {/* isShowPickerがtrueならブロック要素、falseならnone */}
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: "100",
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
