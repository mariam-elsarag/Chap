import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    user_1: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    user_2: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    isPin: {
      type: Boolean,
      default: false,
    },
    isReeded: {
      type: Boolean,
      default: false,
    },
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
roomSchema.index({ user_1: 1, user_2: 1 }, { unique: true });

roomSchema.pre("save", function (next) {
  this.populate({
    path: "user_1",
    select: "full_name avatar",
  });
  this.populate({
    path: "user_2",
    select: "full_name avatar",
  });
  next();
});

const Room = mongoose.model("Room", roomSchema, "Room");
export default Room;
