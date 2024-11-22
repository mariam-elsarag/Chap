import mongoose from "mongoose";
import Message from "./message-model.js";

const roomSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    isPin: {
      type: Boolean,
      default: false,
    },
    isReeded: {
      type: Boolean,
      default: false,
    },
    unread_count: {
      type: Number,
      default: 0,
    },
    message: { type: mongoose.Schema.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

roomSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.roomId = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    return ret;
  },
});
roomSchema.pre("save", function (next) {
  this.populate({
    path: "participants",
    select: "full_name avatar",
  });

  next();
});
roomSchema.post("findOneAndDelete", async function (doc) {
  await Message.deleteMany({ room: doc?._id });
});

const Room = mongoose.model("Room", roomSchema, "Room");
export default Room;
