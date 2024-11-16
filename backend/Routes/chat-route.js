import express from "express";
import multer from "multer";

// middleware
import protect from "../Middlewares/protect.js";

const router = express.Router();
const upload = multer();

import {
  createRoom,
  getRooms,
  deleteRoom,
} from "../Controller/chat/room-controller.js";

router.use(protect());

// rooms
router.route("/room").post(upload.none(), createRoom).get(getRooms);
router.route("/room/:id").delete(deleteRoom);
export default router;
