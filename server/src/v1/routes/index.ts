import express from "express";
import authRoutes from "./auth";
import memoRoutes from "./memo";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/memo", memoRoutes);

export default router;
