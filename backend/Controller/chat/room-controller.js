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
    $or: [
      { user_1: userId, user_2: filterData.user_id },
      { user_1: filterData.user_id, user_2: userId },
    ],
  });
  if (!existingRoom) {
    const room = await Room.create({
      user_1: userId,
      user_2: filterData.user_id,
    });

    res.status(201).json(room);
  } else {
    res
      .status(200)
      .json({ roomId: existingRoom._id, message: "Already have a room" });
  }
});

// get all rooms
export const getRooms = CatchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const keyword = req.query.keyword ? new RegExp(req.query.keyword, "i") : null;

  let queryString = Room.find({
    $or: [{ user_1: userId }, { user_2: userId }],
  })
    .populate([
      { path: "user_1", select: "full_name avatar" },
      { path: "user_2", select: "full_name avatar" },
    ])
    .sort({ isPen: -1, updatedAt: -1 })
    .select("-createdAt");

  let rooms = await queryString;
  if (keyword) {
    rooms = rooms.filter(
      (room) =>
        keyword.test(room.user_1.full_name) ||
        keyword.test(room.user_2.full_name)
    );
  }

  res.status(200).json({ rooms });
});

// delete room
export const deleteRoom = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const haveRoom = await Room.findOneAndDelete({
    $or: [{ user_1: userId }, { user_2: userId }],
    _id: id,
  });
  if (!haveRoom) {
    return next(new AppErrors("Room not found", 404));
  } else {
    res.status(204).json({ success: "Successfully delete room" });
  }
});
