import cors from "cors";
// for security
import helmet from "helmet";
import express from "express";
import xss from "xss-clean";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

// utils
import AppErrors from "../Utils/AppErrors.js";
// middleware
import GlobalErrors from "../Middlewares/error-handeler.js";

// routes
import authRoutes from "../Routes/auth-route.js";
import chatRoutes from "../Routes/chat-route.js";
import userRoutes from "../Routes/user-route.js";
// db
import connectToDb from "../Db/connectToDb.js";
// socket
import { server, app } from "../Socket/socket.js";

// for cors
app.use(cors());
// body barser
app.use(express.json());

// for security
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppErrors(`Can't find ${req.originalUrl} on this server`, 404));
});

// for global errors
app.use(GlobalErrors);

// Application connect
const port = process.env.PORT || 8000;
server.listen(port, () => {
  connectToDb();
  console.log("App work 🔥");
});
