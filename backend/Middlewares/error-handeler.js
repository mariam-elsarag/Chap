import AppErrors from "../Utils/AppErrors.js";

// handle development error
const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    error: err,
  });
};
// handle production error
// validation error
const handleValidatorError = (err) => {
  let errors = [];

  if (err.errors.password) {
    errors.push({ password: err.errors.password.message });
  }

  if (err.errors.email) {
    errors.push({ email: err.errors.email.message });
  }

  return new AppErrors(errors, 400);
};
// JWT error handling
const handleJWTError = () => {
  return new AppErrors("Invalid token", 401);
};
const handleExpireJWTError = () => {
  return new AppErrors("Your token has expired!", 401);
};
// Database errors
const handleDublicateDbData = (err) => {
  if (err.keyPattern.email) {
    return new AppErrors({ email: "Email already exists" }, 400);
  }
  if (err.keyPattern.phone_number) {
    return new AppErrors({ phone_number: "Phone number already exists" }, 400);
  }
};
const handleCastError = (err) => {
  let errors = [];
  if (err.kind === "ObjectId") {
    errors.push({ validation: "Invalid Id" });
  } else {
    errors.push({ validation: err.message });
  }
  return new AppErrors(errors, 400);
};

const sendErrorForProduction = (err, res) => {
  if (err.isOperational) {
    console.log("mari");
    res.status(err.statusCode).json({ errors: err.message });
  } else {
    res.status(err.statusCode).json({ error: "Something went wrong" });
  }
};

const GlobalErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "production") {
    let error = err;

    if (error.name === "ValidationError") {
      error = handleValidatorError(error);
    }
    if (error.code === 11000) {
      error = handleDublicateDbData(error);
    }
    if (err.name === "CastError") {
      error = handleCastError(err);
    }
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "invalid signature"
    ) {
      error = handleJWTError();
    }
    if (error.name === "TokenExpiredError") error = handleExpireJWTError();

    sendErrorForProduction(error, res);
  } else {
    sendErrorForDev(err, res);
  }
};
export default GlobalErrors;
