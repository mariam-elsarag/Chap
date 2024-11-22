import User from "../Model/user-model.js";

// utils
import ApiFeature from "../Utils/ApiFeature.js";
import AppErrors from "../Utils/AppErrors.js";
import CatchAsync from "../Utils/CatchAsync.js";
import FilterBody from "../Utils/FilterBody.js";
import uploadImage from "../Utils/UploadImage.js";

// get all users
export const getAllUsers = CatchAsync(async (req, res, next) => {
  const feature = new ApiFeature(User.find(), req.query).pagination(10);
  const users = await feature.getPaginations(User, req);
  res.status(200).json({ ...users });
});

// get user profile
export const gerUserProfile = CatchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById({ _id: userId });
  if (!user) {
    return next(new AppErrors("User not found", 404));
  }
  res.status(200).json({ user });
});

// update user profile
export const updateUserProfile = CatchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const allowedFields = ["full_name", "password", "new_password"];
  const filterData = FilterBody(req.body, next, [], allowedFields);

  const user = await User.findById({ _id: userId });
  if (!user) {
    return next(new AppErrors("User not found", 404));
  }
  if (filterData.password && filterData.new_password) {
    const checkPassword = await user.comparePassword(
      filterData.password,
      user.password
    );
    if (!checkPassword) {
      return next(new AppErrors("uncorrect password", 400));
    } else {
      user.password = filterData.new_password;
      user.passwordChangedAt = Date.now();
    }
  }
  if (req.file) {
    user.avatar = await uploadImage(req.file.buffer, "avatar", next);
  }
  if (filterData.full_name) user.fullName = filterData.full_name;
  await user.save();
  res.status(200).json({
    full_name: user.full_name,
    email: user.email,
    avatar: user.avatar,
    userId: user.userId,
    gender: user.gender,
  });
});
