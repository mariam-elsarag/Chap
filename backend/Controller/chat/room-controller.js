import Room from "../../Model/room-model.js";
import Message from "../../Model/message-model.js";

// utils
import CatchAsync from "../../Utils/CatchAsync.js";
import FilterBody from "../../Utils/FilterBody.js";
import User from "../../Model/user-model.js";
import { deleteOne } from "../factory-controller.js";
import AppErrors from "../../Utils/AppErrors.js";

// create room
// always gonna but user1 for room creator
export const createRoom = CatchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const requiredArray = ["user_id"];
  const filterData = FilterBody(req.body, next, requiredArray);

  const existingRoom = await Room.findOne({
    participants: { $all: [userId, filterData.user_id] },
  });
  if (!existingRoom) {
    const room = await Room.create({
      participants: [userId, filterData.user_id],
    });

    res.status(201).json(room);
  } else {
    res
      .status(200)
      .json({ roomId: existingRoom._id, message: "Already have a room" });
  }
});
// unread message
export const unreadMessage = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const room = await Room.findByIdAndUpdate(
    { _id: id },
    { isReeded: true, unread_count: 0 }
  );
  res.status(200).json({ isReeded: true });
});

// get all rooms
export const getRooms = CatchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const keyword = req.query.keyword ? new RegExp(req.query.keyword, "i") : null;

  let queryString = Room.find({
    participants: { $in: [userId] },
  })
    .populate([
      { path: "participants", select: "full_name avatar" },
      { path: "message", select: "text" },
    ])
    .sort({ isPen: -1, updatedAt: -1 })
    .select("-createdAt");

  let rooms = await queryString;
  if (keyword) {
    rooms = rooms.filter((room) =>
      room.participants.some((participant) => {
        if (participant._id.toJSON() !== userId.toJSON()) {
          return keyword.test(participant.full_name);
        }
      })
    );
  }
  const sendRoom = rooms.map((room) => {
    const roomData = room.toJSON();
    roomData.participants = roomData.participants.filter(
      (participant) => participant.userId.toJSON() !== userId.toJSON()
    );

    return {
      user: roomData.participants.at(0),
      isPen: roomData.isPen,
      isReeded: roomData.isReeded,
      unread_count: roomData.unread_count,
      message: roomData.message,
      updatedAt: roomData.updatedAt,
      roomId: roomData.roomId,
    };
  });
  res.status(200).json({ rooms: sendRoom });
});

// delete room
export const deleteRoom = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const haveRoom = await Room.findOneAndDelete({
    participants: { $in: [userId] },
    _id: id,
  });
  if (!haveRoom) {
    return next(new AppErrors("Room not found", 404));
  } else {
    res.status(204).json({ success: "Successfully delete room" });
  }
});
