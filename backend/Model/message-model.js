import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.ObjectId, ref: "Room" },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
messageSchema.pre("save", function (next) {
  this.populate({
    path: "sender",
    select: "full_name avatar",
  });
  next();
});
messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sender",
    select: "full_name avatar",
  });
  this.populate({
    path: "receiver",
    select: "full_name avatar ",
  });
  next();
});
messageSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.messageId = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    return ret;
  },
});
const Message = mongoose.model("Message", messageSchema, "Message");
export default Message;
