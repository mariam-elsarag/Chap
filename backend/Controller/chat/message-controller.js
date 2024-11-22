import Message from "../../Model/message-model.js";
import Room from "./../../Model/room-model.js";

// utils
import CatchAsync from "../../Utils/CatchAsync.js";
import AppErrors from "../../Utils/AppErrors.js";
import FilterBody from "../../Utils/FilterBody.js";
import ApiFeature from "../../Utils/ApiFeature.js";
import { getReciverSocketId, io } from "../../Socket/socket.js";

// send message
export const sendMessage = CatchAsync(async (req, res, next) => {
  const sender = req.user._id;
  const requiredFields = ["room"];
  const allowedFields = ["text"];
  const filterData = FilterBody(req.body, next, requiredFields, allowedFields);
  const room = await Room.findById({ _id: filterData.room }).select(
    "participants text"
  );
  if (!room) {
    return next(new AppErrors("Room not found", 404));
  }
  const receiver = room.participants
    .filter((item) => item._id.toJSON() !== sender.toJSON())
    .at(0);

  const message = await Message.create({
    room: filterData.room,
    sender: sender,
    receiver: receiver,
    text: filterData.text,
  });
  room.message = message._id;

  let unread_count = room.unread_count || 0;
  let newRoom = {
    roomId: room._id,
    message: filterData.text,
  };

  if (!room.isReeded) {
    unread_count += 1;
    newRoom.unread_count = unread_count;
  }

  room.unread_count = unread_count;
  await room.save();

  const receiverSocketId = getReciverSocketId(receiver);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("message", message);
    io.to(receiverSocketId).emit("unreadMessageCount", {
      roomId: room._id,
      unread_count: room.unread_count,
    });
  }

  io.emit("roomUpdate", {
    roomId: room._id,
    message: filterData.text,
    unread_count: room.unread_count,
  });
  res.status(200).json(message);
});

// get all messages
export const getAllMessages = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const feature = new ApiFeature(
    Message.find({ room: id }),
    req.query
  ).pagination(20);
  const messages = await feature.getPaginations(Message, req);
  res.status(200).json(messages);
});
