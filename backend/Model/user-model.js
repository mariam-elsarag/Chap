import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import AppErrors from "../Utils/AppErrors.js";

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    maxLength: [50, "max length for full name is 50 character"],
    required: [true, "Full name is required"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    validate: [
      validator.isStrongPassword,
      "Password is too common, please use a strong password",
      ,
    ],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  avatar: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["male", "female"],
  },
  passwordChangedAt: Date,
  otp: String,
  otpExpire: Date,
});
// transform data
userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.userId = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

// encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

// set default for user avatar
userSchema.pre("save", function (next) {
  if (!this.isModified("gender")) return next();
  if (this.gender === "male") {
    this.avatar =
      "https://res.cloudinary.com/dwlbskyfd/image/upload/v1731995681/mediafiles/Avatar/jzojgzosjr2ih1z75egk.svg";
  } else {
    this.avatar =
      "https://res.cloudinary.com/dwlbskyfd/image/upload/v1731995670/mediafiles/Avatar/y7d3mcmnsftchrjih3jc.svg";
  }
  next();
});
// compare password for login
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  console.log(candidatePassword, "can");
  console.log(userPassword, "cuser");
  return await bcrypt.compare(candidatePassword, userPassword);
};
// check password for jwt
userSchema.methods.checkPasswordHasChanged = async function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const passwordChangedAtSec = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );
    return jwtTimeStamp < passwordChangedAtSec;
  }
  return false;
};

// create otp
userSchema.methods.createOtp = function (expire = 10) {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = otpCode;
  this.otpExpire = Date.now() + expire * 60 * 1000;
  return otpCode;
};
const User = mongoose.model("User", userSchema, "User");
export default User;
