import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
    required: [true, "Room is required"],
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
  },
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
