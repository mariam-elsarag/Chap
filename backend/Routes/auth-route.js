import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();

// controller
import {
  login,
  register,
  resetPassword,
  verifyOtp,
  forgetPassword,
} from "../Controller/auth-controller.js";

router.route("/login").post(upload.none(), login);
router.route("/register").post(upload.none(), register);
router.route("/forget-password").post(upload.none(), forgetPassword);
router.route("/verify").post(upload.none(), verifyOtp);
router.route("/reset-password").patch(upload.none(), resetPassword);

export default router;
