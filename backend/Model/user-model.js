import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
// compare password for login
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
// check password for jwt
userSchema.methods.checkPasswordHasChanged = async function (jwtTimeStemp) {
  if (this.passwordChangedAt) {
    const passwordChangeInMillis = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimeStemp < passwordChangeInMillis;
  }
  return false;
};
const User = mongoose.model("User", userSchema, "User");
export default User;
