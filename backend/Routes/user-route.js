import express from "express";
import multer from "multer";
// controller
import {
  gerUserProfile,
  getAllUsers,
  updateUserProfile,
} from "../Controller/user-controller.js";

// middleware
import protect from "../Middlewares/protect.js";
import upload from "../Middlewares/multer.js";

const router = express.Router();

router.use(protect());

router.route("/").get(getAllUsers);

router
  .route("/profile")
  .get(gerUserProfile)
  .patch(upload.single("avatar"), updateUserProfile);

export default router;
