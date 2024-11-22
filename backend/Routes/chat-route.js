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
  unreadMessage,
} from "../Controller/chat/room-controller.js";
import {
  sendMessage,
  getAllMessages,
} from "../Controller/chat/message-controller.js";

router.use(protect());

// rooms
router.route("/room").post(upload.none(), createRoom).get(getRooms);
router.route("/room/:id").delete(deleteRoom);
router.route("/room/:id/read_message").patch(unreadMessage);

// for chat
router.route("/message").post(upload.none(), sendMessage);
router.route("/message/:id").get(getAllMessages);
export default router;
