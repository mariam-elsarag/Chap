import { promisify } from "node:util";
import jwt from "jsonwebtoken";

// models
import User from "../Model/user-model.js";
import CatchAsync from "../Utils/CatchAsync.js";
import AppErrors from "../Utils/AppErrors.js";

const verifyJwtTokenValidation = async (token) => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
};

const verifyToken = CatchAsync(async (token, req, next) => {
  const decoded = await verifyJwtTokenValidation(token);

  if (!decoded)
    return next(new AppErrors("Unauthorized: Access is denied", 401));
  // verify user is exist
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppErrors("User no longer exists", 404));
  // check if user password change
  if (await user.checkPasswordHasChanged(decoded.iat)) {
    return next(new AppErrors("User recently changed password", 401));
  }
  req.user = user;
  next();
});

export default verifyToken;
