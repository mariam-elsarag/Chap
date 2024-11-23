import Message from "../../Model/message-model.js";
import Room from "./../../Model/room-model.js";

// utils
import CatchAsync from "../../Utils/CatchAsync.js";
import AppErrors from "../../Utils/AppErrors.js";
import FilterBody from "../../Utils/FilterBody.js";
import ApiFeature from "../../Utils/ApiFeature.js";
import { io, isUserActiveInRoom } from "../../Socket/socket.js";

// send message
export const sendMessage = CatchAsync(async (req, res, next) => {
  const sender = req.user._id;
  const requiredFields = ["room"];
  const allowedFields = ["text"];
  const filterData = FilterBody(req.body, next, requiredFields, allowedFields);

  const room = await Room.findById({ _id: filterData.room }).select(
    "participants text unread_count isReaded "
  );
  if (!room) {
    return next(new AppErrors("Room not found", 404));
  }

  const receiver = room.participants
    .filter((item) => item._id.toJSON() !== sender.toJSON())
    .at(0);

  // Create the message
  const message = await Message.create({
    room: filterData.room,
    sender: sender,
    receiver: receiver,
    text: filterData.text,
  });
  room.message = message._id;

  const receiverIsActive = isUserActiveInRoom(receiver, room._id.toJSON());

  if (receiverIsActive) {
    room.unread_count = 0;
    room.isReaded = true;
  } else {
    room.unread_count = (room.unread_count || 0) + 1;
    room.isReaded = false;
  }
  await room.save();

  io.to(filterData.room).emit("message", message);

  io.emit("roomUpdate", {
    roomId: room._id,
    message: filterData.text,
    unread_count: room.unread_count,
    isReaded: room.isReaded,
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
