// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const express = require("express");
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'mongoose'.
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
require("dotenv").config();
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
app.use("/api/v1", require("./src/v1/routes"));

// DB接続
try {
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中...");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中...");
});
