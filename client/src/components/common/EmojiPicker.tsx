import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";

// propsの型情報を定義
interface EmojiPickerProps {
  icon: string;
  onChange: (emoji: string) => void;
}

const EmojiPicker = ({ icon, onChange }: EmojiPickerProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>();
  const [isShowPicker, setIsShowPicker] = useState<boolean>(false);

  // アイコンが変更されるたびに選択された絵文字を更新する
  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  // クリックされるたびtrueとfalseを切り替える
  const showPicker = () => setIsShowPicker(!isShowPicker);

  const selectEmoji = (e: { unified: string }) => {
    // 絵文字コードを取得
    const emojiCode = e.unified.split("-");
    console.log(emojiCode);

    let codesArray: any = [];
    emojiCode.forEach((el: string) => codesArray.push("0x" + el));
    // 文字コードの配列を文字列に変換
    const emoji = String.fromCodePoint(...codesArray);
    console.log(emoji);
    // 絵文字を選択したらpickerを閉じる
    setIsShowPicker(false);
    // 絵文字の文字コードを関数に渡す
    onChange(emoji);
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
