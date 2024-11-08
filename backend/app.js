import express from "express";

// for security
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

// utils
import AppErrors from "./Utils/AppErrors.js";
// middleware
import GlobalErrors from "./Middlewares/error-handeler.js";

const app = express();

// body barser
app.use(express.json());

// for security
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

app.all("*", (req, res, next) => {
  next(AppErrors(`Can't find ${req.originalUrl} on this server`, 404));
});

// for global errors
app.use(GlobalErrors);

export default app;
