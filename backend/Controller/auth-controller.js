import jwt from "jsonwebtoken";
// model
import User from "../Model/user-model.js";
// utils
import CatchAsync from "../Utils/CatchAsync.js";
import FilterBody from "../Utils/FilterBody.js";
import AppErrors from "../Utils/AppErrors.js";
import { createOne } from "./factory-controller.js";
import Email from "../Utils/SendEmail.js";

// generate token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

export const login = CatchAsync(async (req, res, next) => {
  const requiredArray = ["email", "password"];
  const filterBody = FilterBody(req.body, next, requiredArray);
  const user = await User.findOne({ email: filterBody.email });
  if (
    !user ||
    !(await user.comparePassword(filterBody.password, user.password))
  ) {
    return next(new AppErrors("Wrong credentials", 401));
  }
  const token = generateToken(user);
  res.status(200).json({ token, user });
});
// create new user
export const register = createOne(
  User,
  ["full_name", "email", "password", "gender"],
  "user"
);

//reset password
export const forgetPassword = CatchAsync(async (req, res, next) => {
  const requiredArray = ["email"];
  const filterBody = FilterBody(req.body, next, requiredArray);

  const user = await User.findOne({ email: filterBody.email });
  if (!user) {
    return next(new AppErrors("User not fuound!", 404));
  }
  const otpCode = user.createOtp(10);
  await user.save({ validateBeforeSave: false });
  // send email
  try {
    const resetLink = `${process.env.FRONT_SERVER}/otp?email=${filterBody.email}`;
    await new Email(user, resetLink, otpCode).sendResetEmail();
  } catch (err) {
    user.otpExpire = undefined;
    user.otp = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppErrors(
        "There was an error while sending the email. Try again later.",
        500
      )
    );
  }
  res.status(200).json({ message: "Successfully send OTP" });
});

// verify otp
export const verifyOtp = CatchAsync(async (req, res, next) => {
  const requiredArray = ["otp", "email"];
  const filterBody = FilterBody(req.body, next, requiredArray);

  const user = await User.findOne({ email: filterBody.email });
  if (!user) {
    return next(new AppErrors("User not fuound!", 404));
  }
  // check otp
  if (!user.otp) {
    return next(new AppErrors("Invalid OTP", 400));
  }

  if (user.otpExpire.getTime() < Date.now()) {
    return next(new AppErrors("OTP has expired", 400));
  }
  if (user.otp !== filterBody.otp) {
    return next(new AppErrors("Invalid OTP", 400));
  }
  user.otp = undefined;
  user.otpExpire = undefined;
  user.isVerified = true;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({ message: "Valid OTP" });
});

export const resetPassword = CatchAsync(async (req, res, next) => {
  const requiredArray = ["password", "email"];
  const filterBody = FilterBody(req.body, next, requiredArray);
  const user = await User.findOne({ email: filterBody.email });
  if (!user) {
    return next(new AppErrors("User not found!", 404));
  }
  if (!user.isVerified) {
    return next(new AppErrors("Verify your OTP ", 401));
  }
  user.password = filterBody.password;
  user.passwordChangedAt = Date.now();
  await user.save();
  res.status(200).json({ message: "Successfully change password" });
});
