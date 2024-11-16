// utils
import AppErrors from "../Utils/AppErrors.js";
import CatchAsync from "../Utils/CatchAsync.js";
import verifyToken from "./VerifyToken.js";

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const protect = (isRequired = true) =>
  CatchAsync(async (req, res, next) => {
    const token = extractToken(req);
    if (isRequired) {
      if (!token)
        return next(new AppErrors("Unauthorized: Access is denied", 401));
    }

    // check token
    if (token) {
      try {
        await verifyToken(token, req, next);
      } catch (err) {
        return next(new AppErrors("Error while checking user", 500));
      }
    } else {
      next();
    }
  });
export default protect;
