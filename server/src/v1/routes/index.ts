// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = require("express").Router();

// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
router.use("/auth", require("./auth"));
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
router.use("/memo", require("./memo"));

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = router;
