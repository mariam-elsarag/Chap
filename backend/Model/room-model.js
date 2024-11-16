import mongoose from "mongoose";

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
    messages: [{ type: mongoose.Schema.ObjectId, ref: "Message", default: [] }],
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

const Room = mongoose.model("Room", roomSchema, "Room");
export default Room;
